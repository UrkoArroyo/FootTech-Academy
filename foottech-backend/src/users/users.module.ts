import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EntrenadorJugadores } from './entrenador_jugadores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, EntrenadorJugadores])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
