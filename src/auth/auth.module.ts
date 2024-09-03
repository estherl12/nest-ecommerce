import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import * as dotenv from 'dotenv';
import { UsersModule } from 'src/users/users.module';
dotenv.config();

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
       useFactory:()=>({
      secret: 'secretKeys',
      signOptions: { expiresIn: '60m' },
    })
  }),
  PassportModule,
  UsersModule,
],
  providers: [AuthService,UsersService,JwtService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
