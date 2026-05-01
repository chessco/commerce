import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { getTenantId } from '../../common/tenant-context';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const tenantId = getTenantId();

    // 1. Fetch all products to verify they belong to this tenant and to get real prices
    const productIds = createOrderDto.items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
        tenantId,
      },
    });

    // Verify all requested products were found (i.e., they belong to the tenant)
    if (products.length !== productIds.length) {
      throw new BadRequestException(
        'One or more products are invalid or do not belong to this tenant',
      );
    }

    // Map products to easily get their prices
    const productMap = new Map(products.map((p) => [p.id, p]));

    // 2. Calculate total and prepare OrderItems data securely on the backend
    let total = 0;
    const orderItemsData = createOrderDto.items.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new BadRequestException(`Product ${item.productId} not found`);
      }
      const price = Number(product.price);
      total += price * item.quantity;

      return {
        product: { connect: { id: item.productId } },
        quantity: item.quantity,
        price: price, // Store the historical price at the time of order
      };
    });

    // 3. Create the Order and its Items inside a transaction using nested writes
    // Prisma's nested writes are automatically transactional
    return this.prisma.order.create({
      data: {
        total,
        tenant: { connect: { id: tenantId } },
        user: { connect: { id: createOrderDto.userId } },
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });
  }

  async findAll() {
    const tenantId = getTenantId();
    return this.prisma.order.findMany({
      where: { tenantId },
      include: {
        items: true,
        user: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const tenantId = getTenantId();
    const order = await this.prisma.order.findFirst({
      where: { id, tenantId },
      include: {
        items: {
          include: { product: true },
        },
        user: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    // Basic update verification
    await this.findOne(id);
    const tenantId = getTenantId();

    return this.prisma.order.update({
      where: { id },
      data: {
        userId: updateOrderDto.userId,
        status: updateOrderDto.status,
      },
    });
  }

  async remove(id: string) {
    // Complex removal relying on transactional deletes across relations matching tenant context
    await this.findOne(id);
    const tenantId = getTenantId();

    return this.prisma.$transaction([
      this.prisma.orderItem.deleteMany({ where: { order: { id, tenantId } } }),
      this.prisma.order.deleteMany({ where: { id, tenantId } }),
    ]);
  }
}
