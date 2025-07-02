import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class AuthDto {
  @ApiProperty({ description: 'Email', example: 'test@test.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password', example: '123456' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
