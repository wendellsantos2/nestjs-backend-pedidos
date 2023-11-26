import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  descricao: string;
}
  // Include other fields necessary for creating a
