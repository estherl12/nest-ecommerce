import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  // providers: [{provide:UsersService,useClass:UsersService}], --> we dont neeed to use @Inject decorator if used with this
  providers:[UsersService],
  exports:[UsersService]
})
export class UsersModule {}
