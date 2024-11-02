import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiTags('auth')
  @ApiOperation({ summary: 'Sign up' })
  @Post("/signup")
  async signup(@Body() signUpDto: CreateUserDto) {
    return await this.authService.signUp(signUpDto)
  }

  @ApiTags('auth')
  @ApiOperation({ summary: 'Sign in' })
  @Post("/signin")
  async signin(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto)
  }
}
