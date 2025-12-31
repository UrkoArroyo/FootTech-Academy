import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  BadRequestException,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { EntrenadorJugadores } from './entrenador_jugadores.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, description: 'Current user', type: User })
  me(@CurrentUser() user: Partial<User>) {
    return user;
  }

   @Get('entrenadores')
  @ApiOperation({ summary: 'List entrenadores' })
  @ApiResponse({ status: 200, description: 'List of entrenadores', type: [User] })
  findEntrenadores(): Promise<User[]> {
    return this.usersService.findByRole('entrenador');
  }

  @Get()
  @ApiOperation({ summary: 'List users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOneById(Number(id));
  }

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, description: 'Created user', type: User })
  @ApiBody({ type: CreateUserDto })
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.create(body);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'Updated user', type: User })
  update(@Param('id') id: string, @Body() body: UpdateUserDto): Promise<User> {
    return this.usersService.update(Number(id), body);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  async remove(@Param('id') id: string, @CurrentUser() currentUser: Partial<User>) {
    const targetId = Number(id);
    if (currentUser?.id === targetId) {
      throw new BadRequestException('You cannot delete yourself');
    }
    await this.usersService.remove(targetId);
  }

 

  @Get(':idJugador/relation')
  @ApiOperation({ summary: 'Get relation by user id' })
  @ApiResponse({ status: 200, description: 'Relation found', type: User })
  async getEntrenador(@Param('idJugador') idJugador: string) {
    return this.usersService.getRelationByJugadorid(Number(idJugador));
  }

  @Patch(':idJugador/entrenador/:idEntrenador')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Add entrenador to jugador' })
  @ApiResponse({ status: 200, description: 'Updated user', type: User })
  addEntrenador(@Param('idJugador') idJugador: string, @Param('idEntrenador') idEntrenador: string): Promise<EntrenadorJugadores> {
    return this.usersService.addEntrenador(Number(idJugador), Number(idEntrenador));
  }

  @Delete('entrenador/:idRelation')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Remove entrenador from jugador' })
  @ApiResponse({ status: 200, description: 'Updated user', type: User })
  removeEntrenador(@Param('idRelation') idRelation: string): Promise<EntrenadorJugadores> {
    return this.usersService.removeEntrenadorJugadorRelation(Number(idRelation));
  }

  
}
