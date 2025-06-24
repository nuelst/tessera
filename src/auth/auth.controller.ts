
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common';
import { Public } from './auth.guard';
import { AuthService } from './auth.service';


export type UserCredential = {
  email: string,
  password: string
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: UserCredential) {
    console.log("[body]", signInDto)
    return this.authService.signIn(signInDto);
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}