import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { getTenantId } from '../../common/tenant-context';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const tenantId = getTenantId();
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        tenant: { connect: { id: tenantId } },
      },
    });
  }

  async findAll() {
    const tenantId = getTenantId();
    return this.prisma.category.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const tenantId = getTenantId();
    const category = await this.prisma.category.findFirst({
      where: { id, tenantId },
    });

    if (!category) {
      throw new NotFoundException(`Category not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    // first verify it belongs to tenant
    await this.findOne(id);
    const tenantId = getTenantId();

    return this.prisma.category.updateMany({
      where: { id, tenantId },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    // verify ownership
    await this.findOne(id);
    const tenantId = getTenantId();

    return this.prisma.category.deleteMany({
      where: { id, tenantId },
    });
  }
}
