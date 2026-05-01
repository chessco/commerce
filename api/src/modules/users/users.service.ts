import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { getTenantId } from '../../common/tenant-context';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const tenantId = getTenantId();
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        tenant: { connect: { id: tenantId } }, // Auto-inject tenantId from context
      },
    });
  }

  async findAll(): Promise<User[]> {
    const tenantId = getTenantId();
    return this.prisma.user.findMany({
      where: { tenantId },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const tenantId = getTenantId();
    return this.prisma.user.findFirst({
      where: { email, tenantId },
    });
  }

  async findOne(id: string): Promise<User> {
    const tenantId = getTenantId();
    const user = await this.prisma.user.findFirst({
      where: { id, tenantId },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
