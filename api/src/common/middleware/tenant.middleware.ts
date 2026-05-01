import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { tenantContextStorage } from '../tenant-context';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let tenantId = req.headers['x-tenant-id'] as string;

    if (!tenantId) {
      // Fallback to 'default' tenant for public store
      const defaultTenant = await this.prisma.tenant.findUnique({
        where: { slug: 'default' },
      });
      if (defaultTenant) {
        tenantId = defaultTenant.id;
      }
    }

    // Run the rest of the request within the context of this tenant
    tenantContextStorage.run({ tenantId }, () => {
      next();
    });
  }
}
