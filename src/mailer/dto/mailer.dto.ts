import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class MailerDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { each: true, message: 'Invalid email address' })
  @ApiProperty({
    description: 'The email address of the recipient',
    example: 'john.doe@example.com',
  })
  to: string;

  @IsString()
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsString()
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  attachmentUrl?: string;
}