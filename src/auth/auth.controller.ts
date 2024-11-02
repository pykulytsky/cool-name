import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './auth.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Request() req: any) {
    const user = await this.usersService.findOne(req.user.sub)
    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
    }
  }
}
