import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { getTenantId } from '../../common/tenant-context';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const tenantId = getTenantId();

    // Verify Category belongs to this tenant
    const category = await this.prisma.category.findFirst({
      where: { id: createProductDto.categoryId, tenantId },
    });

    if (!category) {
      throw new BadRequestException('Invalid category for this tenant');
    }

    const { categoryId, ...rest } = createProductDto;

    return this.prisma.product.create({
      data: {
        ...rest,
        category: { connect: { id: categoryId } },
        tenant: { connect: { id: tenantId } },
      },
    });
  }

  async findAll() {
    const tenantId = getTenantId();
    return this.prisma.product.findMany({
      where: { tenantId },
      include: { category: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const tenantId = getTenantId();
    const product = await this.prisma.product.findFirst({
      where: { id, tenantId },
      include: { category: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    const tenantId = getTenantId();

    if (updateProductDto.categoryId) {
      const category = await this.prisma.category.findFirst({
        where: { id: updateProductDto.categoryId, tenantId },
      });
      if (!category)
        throw new BadRequestException('Invalid category for this tenant');
    }

    return this.prisma.product.updateMany({
      where: { id, tenantId },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    const tenantId = getTenantId();

    return this.prisma.product.deleteMany({
      where: { id, tenantId },
    });
  }
}
