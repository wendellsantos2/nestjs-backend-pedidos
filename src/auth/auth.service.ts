import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/domain/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(cpf: string, password: string) {
    const user = await this.userService.findOneWithUserName(cpf);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      sub: {
        cpf: user.cpf,
        name: user.name,
        role: user.role
      },
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: User) {
    const payload = {
      cpf: user.cpf,
      sub: {
        name: user.name,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
