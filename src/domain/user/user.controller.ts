import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
export class CreateUserDTO {
  readonly name: string;
  readonly cpfCnpj: string;
  readonly email: string;

}

@ApiTags('User') // Tag Swagger para UserController
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ApiBody({
    description: 'Dados para a criação de um novo usuário',
    type: CreateUserDto,
    examples: {
      normalUser: {
        summary: 'Exemplo de usuário normal',
        value: {
          name: 'John Doe',
          email: 'email@teste.com',
          cpf: '283.252.254-79',
         
        } 
      },
    }
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos. Por favor, verifique os dados fornecidos.' })
  @Post('create-client')
  async createCliente(@Body() createUserDTO: CreateUserDTO) {

    try {
        const result = await this.userService.createUserAsaas(createUserDTO);
        return result;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
}

@Get()
async findAll(@Res() response) {
  try {
    const users = await this.userService.findAll();
    return response.status(HttpStatus.OK).json(users);
  } catch (e) {
    return response.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
  }
}


  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Encontrar um usuário por ID' }) // Descrição da rota
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
 
  @Get(':email')
  @ApiOperation({ summary: 'Obter detalhes de um Cliente' })
  @ApiResponse({ status: 200, description: 'Detalhes do Cliente' })
  async getClienteById(@Param('email') email: string)  {
    return await this.userService.findOne(email);
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
          email: 'email@teste.com',
          cpf: '283.252.254-79',
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
