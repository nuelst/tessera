import { ConflictException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';

import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';


import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';


const SALT_OR_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }


  @UseGuards(AuthGuard)
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }



  async findByEmail(email: string): Promise<User> {

    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {

    const user = await this.prisma.user.findUnique({
      where: {
        id: where.id
      }
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists!');
    }

    const passwordHashed = await bcrypt.hash(data.password, SALT_OR_ROUNDS);


    return this.prisma.user.create({
      data: {
        ...data,
        password: passwordHashed
      },

    });
  }

  @UseGuards(AuthGuard)
  async update(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput; }): Promise<User> {
    const { where, data } = params;


    const user = await this.prisma.user.findUnique({ where });
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return this.prisma.user.update({ where, data });
  }


  // async findAllCapsulesByUser(userId: string) {
  //   console.log("findAllCapsulesByUser", userId)
  //   return await this.prisma.capsule.findMany(

  //     {
  //       where: {
  //         id: userId
  //       }
  //     }
  //   )
  // }




  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({ where });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return this.prisma.user.delete({ where });
  }
}
