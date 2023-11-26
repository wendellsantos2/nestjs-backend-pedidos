import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('User') // Tag Swagger para UserController
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Encontrar um usuário por ID' }) // Descrição da rota
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
  @Post()
  @ApiOperation({
    summary: 'Criar um novo usuário',
    description: 'Cria um novo usuário no sistema. É necessário fornecer detalhes do usuário como nome, email, senha e role.'
  })
  @ApiBody({
    description: 'Dados para a criação de um novo usuário',
    type: CreateUserDto,
    examples: {
      normalUser: {
        summary: 'Exemplo de usuário normal',
        value: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          role: 'cliente'
        }
      },
    }
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos. Por favor, verifique os dados fornecidos.' })
 
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Outros métodos do controlador podem ser adicionados aqui
}
