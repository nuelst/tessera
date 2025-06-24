import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';


import * as bcrypt from 'bcrypt';


const SALT_OR_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
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
      }
    });
  }

  async update(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput; }): Promise<User> {
    const { where, data } = params;

    console.log("[where]:", where)
    console.log("[data]:", data)

    const user = await this.prisma.user.findUnique({ where });
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return this.prisma.user.update({ where, data });
  }


  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({ where });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return this.prisma.user.delete({ where });
  }
}
