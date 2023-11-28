import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
  
  async findOne(email: string): Promise<User> {
    // Logic to find a single categoria by its id
    // For example, find the category in your database
    const usuario = new User(); // Replace with actual logic
    if (!usuario) {
      throw new NotFoundException(`Categoria with ID "${email}" not found`);
    }
    return usuario;
  }

  async findOneWithUserName(cpf: string) {
    return await this.userRepo.findOne({ where: { cpf: cpf } });
  }

  async createUserAsaas(createUserDTO: CreateUserDTO): Promise<any> {
    try {
        const payload = {
            name: createUserDTO.name,
            cpfCnpj: createUserDTO.cpfCnpj,
            email: createUserDTO.email,
            // Outras propriedades, se necessárias
        };

        const response = await this.httpClient.post('customers', payload);
        return response.data;
    } catch (error) {
        // Tratamento específico de erros da API do Asaas
        if (error.response) {
            throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
        } else {
            throw new BadRequestException('Failed to create the customer.');
        }
    }
  }

  async findAll(): Promise<any> {
    try {
      // Requisição GET para buscar todos os clientes na API do Asaas
      const response = await this.httpClient.get('customers');
      return response.data; // Supondo que a API retorna os dados diretamente
    } catch (error) {
      // Tratamento de erro apropriado
      if (error.response) {
        throw new BadRequestException(`API Error: ${error.response.status} - ${error.response.data}`);
      } else {
        throw new BadRequestException('Failed to retrieve customers.');
      }
    }
  }

async create(createUserDto: CreateUserDto) {
  // Primeiro, cria o usuário no sistema local
  const user = await this.userRepo.create(createUserDto);
  await this.userRepo.save(user);
  const { password, ...result } = user;

  // Agora, tenta criar o usuário no Asaas
  try {
      const asaasUserDto = {
        name: createUserDto.name,
        cpfCnpj: createUserDto.cpfCnpj,
        email: createUserDto.email,
        
        // Inclua outras propriedades aqui se forem necessárias para a API do Asaas
      };

      const asaasResponse = await this.createUserAsaas(asaasUserDto);
       
  } catch (error) {
      console.error("Erro ao criar usuário no Asaas: ", error);
 
      throw error;  
  }

  return result; // Retorna os detalhes do usuário criado (sem a senha)
}


  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }
}
