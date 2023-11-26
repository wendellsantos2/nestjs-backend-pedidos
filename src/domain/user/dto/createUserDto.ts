import { PartialType } from '@nestjs/mapped-types';
import {  IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @IsString()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
