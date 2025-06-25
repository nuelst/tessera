import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/user/user.service';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserCredential } from './auth.controller';

type AuthResponse = {
  access_token: string;
  user: any;
};
@Injectable()
export class AuthService {
  // constructor(private readonly usersService: UserService) { }
  @Inject()
  private readonly usersService: UsersService;
  @Inject()
  private readonly jwtService: JwtService;

  async signIn(params: UserCredential): Promise<AuthResponse> {
    const existingUser = await this.usersService.findByEmail(params.email);

    if (!existingUser) throw new NotFoundException('User not found!');

    const passwordMatch = await bcrypt.compare(
      params.password,
      existingUser.password,
    );
    if (!passwordMatch) throw new UnauthorizedException('Invalid Credentials');

    const { password, ...user } = existingUser;

    const payload = { sub: user.id };
    return {
      user: user,
      access_token: await this.jwtService.signAsync(payload),
    };
    // return result
  }
}
