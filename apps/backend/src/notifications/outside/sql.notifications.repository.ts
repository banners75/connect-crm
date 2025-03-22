import { PrismaService } from 'src/prisma.service';

export class SqlNotificationsRepository {
  constructor(private prisma: PrismaService) {}
}
