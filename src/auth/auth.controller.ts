import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './public.decorator';


// @ApiTags("authentication")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login', description: 'Login to the system' })
  @ApiResponse({ status: 200, description: 'Login successful', type: AuthDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({
    type: AuthDto, description: 'Login credentials', examples: {
      'example 1': {
        value: {
          email: 'test@test.com',
          password: '123456'
        }
      }
    }
  })

  signIn(@Body() signInDto: AuthDto) {
    console.log('[body]', signInDto);
    return this.authService.signIn(signInDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('logout')
  logout(@Request() req) {
    return { message: 'Logout successful', user: req.user.email };
  }
}
