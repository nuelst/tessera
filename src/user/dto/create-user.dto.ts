import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

// export type UserCreateInput = {
//   id?: string
//   name: string
//   email: string
//   password: string
//   createdAt?: Date | string
//   updatedAt?: Date | string
//   capsules?: CapsuleCreateNestedManyWithoutUserInput
// }
