import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { createHash } from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  private hashPassword(password: string) {
    return createHash('sha512').update(password, 'utf8').digest('hex');
  }

  async findAll(): Promise<any[]> {
    const raws = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.role', 'role')
      .select('user.id', 'id')
      .addSelect('user.name', 'name')
      .addSelect('user.email', 'email')
      .addSelect('user.createdAt', 'createdAt')
      .addSelect('role.name', 'role')
      .getRawMany();

    return raws as any[];
  }
  
  async findOneById(id: number): Promise<any | null> {
    const raw = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.role', 'role')
      .select('user.id', 'id')
      .addSelect('user.name', 'name')
      .addSelect('user.email', 'email')
      .addSelect('user.createdAt', 'createdAt')
      .addSelect('role.name', 'role')
      .where('user.id = :id', { id })
      .getRawOne();

    if (!raw) return null;
    return raw as any;
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  private async getRoleByName(name: string) {
    const role = await this.roleRepository.findOne({ where: { name } });
    if (!role) throw new BadRequestException('Role not found');
    return role;
  }

  async create(user: CreateUserDto): Promise<any> {
    const roleEntity = await this.getRoleByName('jugador');
    const newUser = this.usersRepository.create({
      ...user,
      role: roleEntity,
      password: this.hashPassword(user.password as string),
    });
    const saved = await this.usersRepository.save(newUser);
    const { password, role, ...rest } = saved as any;
    return { ...rest, role: role?.name } as any;
  }

  async findForJwt(id: number) {
    const raw = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.role', 'role')
      .select('user.id', 'id')
      .addSelect('user.name', 'name')
      .addSelect('user.email', 'email')
      .addSelect('user.createdAt', 'createdAt')
      .addSelect('role.name', 'role')
      .where('user.id = :id', { id })
      .getRawOne();

    if (!raw) return null;
    return raw as any;
  }

  async update(id: number, changes: UpdateUserDto): Promise<any> {
    const userEntity = await this.usersRepository.findOne({ where: { id } });
    if (!userEntity) throw new NotFoundException('User not found');

    if (changes.password) {
      userEntity.password = this.hashPassword(changes.password as string);
    }
    if (typeof changes.name !== 'undefined') userEntity.name = changes.name as any;
    if (typeof changes.email !== 'undefined') userEntity.email = changes.email as any;
    if (typeof changes.role !== 'undefined') {
      const roleEntity = await this.getRoleByName(changes.role as any);
      userEntity.role = roleEntity as any;
    }

    const saved = await this.usersRepository.save(userEntity);
    const { password, role, ...rest } = saved as any;
    return { ...rest, role: role?.name } as any;
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepository.remove(user);
  }
}
