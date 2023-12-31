import { PartialType } from '@nestjs/mapped-types';
import {  IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id_usuario: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  cpfCnpj: string;

  @IsString()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
