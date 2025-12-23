import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private hashSha512(value: string): string {
    return createHash('sha512').update(value, 'utf8').digest('hex');
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const a =  this.hashSha512(password);
    
    try {
      return await this.usersRepository.findOneOrFail({
        where: { email, password: this.hashSha512(password) },
      });
    } catch (err) {
      return null;
    }
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      expires_in: Number(process.env.JWT_EXPIRES_IN ?? 3600),
    };
  }
}
