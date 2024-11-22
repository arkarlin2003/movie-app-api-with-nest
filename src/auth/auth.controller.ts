import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterDto } from './dtos/reigster.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  signUp(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  singIn(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
