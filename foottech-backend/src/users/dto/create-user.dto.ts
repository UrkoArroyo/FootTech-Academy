import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, Length } from 'class-validator';
import { Role } from '../user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del usuario' })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({ example: 'juan@example.com', description: 'Email del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'changeme', description: 'Contraseña' })
  @IsString()
  @Length(6, 255)
  password: string;

  @ApiProperty({ enum: Role, example: Role.JUGADOR, description: 'Rol del usuario' })
  @IsEnum(Role)
  role: Role;
}
