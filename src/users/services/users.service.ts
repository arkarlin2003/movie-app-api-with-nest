import { Injectable } from '@nestjs/common';
import { CreateUserProvider } from '../providers/create-user.provider';
import { RegisterDto } from 'src/auth/dtos/reigster.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly createUserProvider: CreateUserProvider,
  ) {}

  public async createUser(registerDto: RegisterDto) {
    return await this.createUserProvider.create(registerDto);
  }

  public async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
