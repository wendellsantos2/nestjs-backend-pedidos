import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'; // Importe os módulos do Swagger
import { CreateUserDto } from 'src/domain/user/dto/createUserDto';
import { UserService } from 'src/domain/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';

@ApiTags('auth') // Adicione a tag para a controladora AuthController
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Fazer login' }) // Descrição da rota
  @ApiBody({ type: CreateUserDto }) // Corpo da solicitação
  @ApiResponse({ status: 200, description: 'Usuário logado com sucesso' })
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar um novo usuário' }) // Descrição da rota
  @ApiBody({ type: CreateUserDto }) // Corpo da solicitação
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Atualizar token de acesso' }) // Descrição da rota
  @ApiResponse({ status: 200, description: 'Token de acesso atualizado com sucesso' })
  async refrshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
