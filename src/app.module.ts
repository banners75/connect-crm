import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, ContactModule, TasksModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
