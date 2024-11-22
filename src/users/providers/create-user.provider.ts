import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dtos/reigster.dto';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../services/users.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async create(registerDto: RegisterDto) {
    let existUser;
    try {
      existUser = await this.usersService.findUserByEmail(registerDto.email);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (existUser)
      throw new BadRequestException(
        'The user already exists, please check your email.',
      );

    let newUser = await this.usersRepository.create({
      ...registerDto,
      password: await this.hashingProvider.hashPassword(registerDto.password),
    });

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      );
    }

    return newUser;
  }
}
