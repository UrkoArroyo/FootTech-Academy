import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createHash } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private hashPassword(password: string) {
    return createHash('sha512').update(password, 'utf8').digest('hex');
  }

  findAll(user: Partial<User>): Promise<User[]> {
    const { role } = user;
    if (role === 'admin') {
      return this.usersRepository.find();
    } else {
      return { error: 'Access denied' } as any;
    }
  }

  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create({
      ...user,
      password: this.hashPassword(user.password as string),
    });
    return this.usersRepository.save(newUser);
  }

  async findForJwt(id: number) {
    const user = await this.findOneById(id);
    if (!user) return null;
    const { password, ...rest } = user as any;
    return rest;
  }
}
