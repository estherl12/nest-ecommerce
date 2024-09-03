import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/enum/role.enum';
import { use } from 'passport';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo:Repository<User>
  ){}
  async createUser(createUserDto: CreateUserDto) {
    const salt =await bcrypt.genSalt();

    // const hashPassword =  await bcrypt.hash(createUserDto.password,salt);
    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.password = await bcrypt.hash(createUserDto.password,salt);
    newUser.roles = Role.User

    return await this.usersRepo.save(newUser);
  }

  
  async findOne(username: string) {
    const user = await this.usersRepo.findOne({where:{username:username}})
    if(!user){
      throw new NotFoundException("No username present");
    }
    return user ;
    // return {
    //   msg:"user fetched successfully",
    //   data:user
    // };
  }
  
  async findAll() {
    const user = await this.usersRepo.findAndCount();
    return user ;
    // return {
    //   msg:"user fetched successfully",
    //   count:count,
    //   data:users
    // };
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepo.findOne({where:{id:id}});
    if(!user){
      throw new NotFoundException("not found such product")
    }
    if(updateUserDto.username){
      user.username = updateUserDto.username ;
    }
    if(updateUserDto.email){
      user.email = updateUserDto.email ;
    }
    if(updateUserDto.password){
      user.password = updateUserDto.password ;
    }
    return await this.usersRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.usersRepo.findOne({where:{id:id}});
    if(!user){
      throw new NotFoundException("not found such product")
    }
    return await this.usersRepo.delete(+id);
  }
}
