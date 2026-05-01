import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { getTenantId } from '../../common/tenant-context';

@Injectable()
export class QuotationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuotationDto: CreateQuotationDto) {
    const tenantId = getTenantId();
    const { userId, ...rest } = createQuotationDto;
    return this.prisma.quotation.create({
      data: {
        ...rest,
        tenant: { connect: { id: tenantId } },
        ...(userId ? { user: { connect: { id: userId } } } : {}),
      },
    });
  }

  async findAll() {
    const tenantId = getTenantId();
    return this.prisma.quotation.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const tenantId = getTenantId();
    const quotation = await this.prisma.quotation.findFirst({
      where: { id, tenantId },
      include: {
        user: {
          select: { firstName: true, lastName: true, email: true },
        },
      },
    });

    if (!quotation) {
      throw new NotFoundException('Quotation not found');
    }
    return quotation;
  }

  async update(id: string, updateQuotationDto: UpdateQuotationDto) {
    await this.findOne(id);
    const tenantId = getTenantId();

    return this.prisma.quotation.updateMany({
      where: { id, tenantId },
      data: updateQuotationDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    const tenantId = getTenantId();

    return this.prisma.quotation.deleteMany({
      where: { id, tenantId },
    });
  }
}
