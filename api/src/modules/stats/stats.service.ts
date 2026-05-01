import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { getTenantId } from '../../common/tenant-context';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    const tenantId = getTenantId();

    // Run all counts in parallel for performance
    const [productsCount, ordersCount, quotationsCount, usersCount] =
      await Promise.all([
        this.prisma.product.count({ where: { tenantId } }),
        this.prisma.order.count({ where: { tenantId } }),
        this.prisma.quotation.count({ where: { tenantId } }),
        this.prisma.user.count({ where: { tenantId } }),
      ]);

    // Calculate revenue securely by summing all order totals for this tenant
    const ordersResult = await this.prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: { tenantId },
    });

    const totalRevenue = ordersResult._sum.total || 0;

    return {
      products: productsCount,
      orders: ordersCount,
      quotations: quotationsCount,
      users: usersCount,
      revenue: Number(totalRevenue),
    };
  }
}
