import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';


@Entity({ name: 'usuarios' })
export class User {
  @ApiProperty({ description: 'User id' })
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id: number;

  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan Pérez' })
  @Column({ name: 'nombre', length: 100 })
  name: string;

  @ApiProperty({ description: 'Email del usuario', example: 'juan@example.com' })
  @Column({ name: 'email', unique: true })
  email: string;

  @ApiProperty({ description: 'Contraseña', writeOnly: true })
  @Column({ name: 'password', length: 255 })
  password: string;

  @ApiProperty({ description: 'Rol del usuario', example: 'jugador' })
  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role | null;

  @ApiProperty({ description: 'Fecha de creación', readOnly: true })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
