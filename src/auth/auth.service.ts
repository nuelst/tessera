
import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { UsersService } from 'src/user/user.service';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(private usersService: UsersService) { }

//   async signIn(where: Prisma.UserWhereUniqueInput, pass: string): Promise<any> {
//     const user = await this.usersService.findOne(where);

//     if (user?.password !== pass) {
//       throw new UnauthorizedException();
//     }

//     const { password, ...result } = user;


//     const payload = { sub: user.userId };
//     return {
//       access_token: await this.jwtService.signAsync(payload),
//     };
//   }
// }


// // @Dependencies(UsersService, JwtService)
// @Injectable()
// export class AuthService_2 {
//   constructor(privateusersService, jwtService) {
//     this.usersService = usersService;
//     this.jwtService = jwtService;
//   }

//   async signIn(username, pass) {
//     const user = await this.usersService.findOne(username);
//     if (user?.password !== pass) {
//       throw new UnauthorizedException();
//     }
//     const payload = { username: user.username, sub: user.userId };
//     return {
//       access_token: await this.jwtService.signAsync(payload),
//     };
//   }
// }



const SALT_OR_ROUNDS = 10;

type AuthResponse = {
  access_token: string
  user: any
}
@Injectable()
export class AuthService {

  // constructor(private readonly usersService: UserService) { }
  @Inject()
  private readonly usersService: UsersService
  @Inject()
  private readonly jwtService: JwtService

  async signIn(params: Prisma.UserCreateInput): Promise<AuthResponse> {
    const existingUser = await this.usersService.findOne({ email: params.email });

    if (!existingUser) throw new NotFoundException("User not found!");

    const passwordMatch = await bcrypt.compare(params.password, existingUser.password)
    if (!passwordMatch) throw new UnauthorizedException("Invalid Credentials")

    const { password, ...user } = existingUser

    const payload = { sub: user.id };
    return {
      user: user,
      access_token: await this.jwtService.signAsync(payload),

    };
    // return result
  }
}