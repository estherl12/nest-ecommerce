import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { use } from 'passport';
import { Role } from 'src/auth/enum/role.enum';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post('/register/user')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(NoFilesInterceptor())
  @ApiBody({type:CreateUserDto})
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    
    createUserDto.roles = Role.User;
    const user = await this.usersService.createUser(createUserDto);
    return {
      msg:"user created successfully",
      user:user 
    }
  }

  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return {
      msg:"user fetched successfully",
      data:user
    }
  }
  
  @Get()
  async findAll() {
    const user = await this.usersService.findAll();
    return {
      msg:"user fetched successfully",
      data:user
    }
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);
    return {
      msg:"user fetched successfully",
      data:user
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.usersService.remove(+id);
    return {
      msg:"data deleted successfully"
    }
  }
}
