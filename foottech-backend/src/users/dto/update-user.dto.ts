import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, Length, IsIn } from 'class-validator';

const ROLES = ['admin', 'entrenador', 'jugador'] as const;

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Juan Pérez', description: 'Nombre del usuario' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @ApiPropertyOptional({ example: 'juan@example.com', description: 'Email del usuario' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'changeme', description: 'Contraseña' })
  @IsOptional()
  @IsString()
  @Length(6, 255)
  password?: string;

  @ApiPropertyOptional({ enum: ROLES, example: 'jugador', description: 'Rol del usuario' })
  @IsOptional()
  @IsIn(ROLES as any)
  role?: string;
} 
