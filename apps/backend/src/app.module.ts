import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/outside/tasks.module';
import { AuthModule } from './auth/outside/auth.module';
import { ContactsModule } from './contacts/outside/contacts.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    UserModule,
    TasksModule,
    AuthModule,
    ConfigModule.forRoot(),
    ContactsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
