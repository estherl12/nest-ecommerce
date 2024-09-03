import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/local.guard';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorator/currentuser.decorator';
import { User } from 'src/users/entities/user.entity';

@ApiTags('User Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUserDto })
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return await this.usersService.createUser(createUserDto);
  }

  @Post('/login')
  // @UseGuards(AuthGuard('local'))
  // @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(NoFilesInterceptor())
  // async login(@CurrentUser() user: User) {
  async login(@Body() user: User) {
    console.log(user);

    const token = await this.authService.login(user);
    return {
      access_token: token,
    };
  }
}
