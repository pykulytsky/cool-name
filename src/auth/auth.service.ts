import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from "bcryptjs"

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }
  async signUp(credentials: CreateUserDto) {
    const password = await hash(credentials.password, 10);
    credentials.password = password;
    const user = await this.usersService.create(credentials);
    return { username: user.username, fullName: user.fullName };
  }

  async signIn(credentials: SignInDto) {
    const user = await this.usersService.findByUsername(credentials.username);
    if (!user) throw new UnauthorizedException("Can not find user by username");
    const passwordMatch = await compare(credentials.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException("Password doesn't match")

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
