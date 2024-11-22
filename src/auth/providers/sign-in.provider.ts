import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { UsersService } from 'src/users/services/users.service';
import { HashingProvider } from './hashing.provider';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignInProvider {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signIn(loginDto: LoginDto) {
    let existUser;
    try {
      existUser = await this.usersService.findUserByEmail(loginDto.email);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!existUser) throw new BadRequestException("Email doesn't exist!");

    let isEqual = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        loginDto.password,
        existUser.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare the password',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: existUser.id,
        email: existUser.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return accessToken;
  }
}
