import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsOptional()
  avatar?: string;
}
