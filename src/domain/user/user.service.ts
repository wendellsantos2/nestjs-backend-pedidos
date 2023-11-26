import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import axios, { AxiosInstance } from 'axios';
import { CreateUserDTO } from './user.controller';
@Injectable()
export class UserService {
  private httpClient: AxiosInstance;
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    this.httpClient = axios.create({
      baseURL: 'https://api.asaas.com/v3/', // Base URL da API
      headers: {
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept': '*/*',
          'access_token': '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAzMjU0NDM6OiRhYWNoX2ZhZDVmN2JjLTI1ODYtNDg2NS1hYzIxLWExNjNhNmUyYTA0Yg==', // Coloque seu token de acesso aqui
      },
  });
  }
  async findOne(id: number) {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async findOneWithUserName(cpf: string) {
    return await this.userRepo.findOne({ where: { cpf: cpf } });
  }

  async createUserAsaas(createUserDTO: CreateUserDTO): Promise<any> {
    try {
        // Construindo o payload com base no DTO
        const payload = {
            name: createUserDTO.name,
            cpfCnpj: createUserDTO.cpfCnpj,
            email: createUserDTO.email,
            // Adicione outros campos do DTO conforme necessário
        };

        const response = await this.httpClient.post('customers', payload); // Faz a requisição POST para 'api/v3/customers'
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        if (error.response) {
            // Captura erros específicos da resposta da API
            throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
        } else {
            // Erro genérico
            throw new BadRequestException('Failed to create the customer.');
        }
    }
}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
    const { password, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }
}
