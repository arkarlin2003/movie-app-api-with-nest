import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { CreateUserProvider } from './providers/create-user.provider';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CreateUserProvider],
  exports: [UsersService],
  imports: [forwardRef(() => AuthModule),TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
