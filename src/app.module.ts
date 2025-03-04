import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/outside/tasks.module';
import { AuthModule } from './auth/outside/auth.module';
import { ContactsModule } from './contacts/outside/contacts.module';

@Module({
  imports: [UserModule, TasksModule, AuthModule, ConfigModule.forRoot(), ContactsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
