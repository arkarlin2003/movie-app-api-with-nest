import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { RegisterDto } from '../dtos/reigster.dto';
import { LoginDto } from '../dtos/login.dto';
import { SignInProvider } from '../providers/sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly signInProvider: SignInProvider,
  ) {}

  public async register(registerDto: RegisterDto) {
    return await this.usersService.createUser(registerDto);
  }

  public async login(loginDto: LoginDto) {
    return await this.signInProvider.signIn(loginDto);
  }
}
