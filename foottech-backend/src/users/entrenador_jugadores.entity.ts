import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity({ name: 'entrenador_jugadores' })
export class EntrenadorJugadores {
  @ApiProperty({ description: 'Relation id' })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: 'Entrenador id' })
  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'id_entrenador', referencedColumnName: 'id' })
  entrenador: User;

   @ApiProperty({ description: 'Jugador id' })
  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'id_jugador', referencedColumnName: 'id' })
  jugador: User;
}