import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from './../prisma/prisma.service';
import { UpdateCapsuleDto } from './dto/update-capsule.dto';

@Injectable()
export class CapsulesService {

  @Inject()
  private readonly prisma: PrismaService


  async create(data: Prisma.CapsuleCreateInput, id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new UnauthorizedException("Unauthorized")
    }
    const newCapsule = await this.prisma.capsule.create(
      {
        data: {
          ...data,
          sendAt: new Date(data.sendAt),
          user: {
            connect: { id }
          }
        }

      }
    )
    return newCapsule
  }


  async findAll() {
    return await this.prisma.capsule.findMany()
  }


  async findAllCapsulesByUser(userId: string) {

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new UnauthorizedException("Unauthorized")
    }

    return this.prisma.capsule.findMany({
      where: {
        userId: userId,
      },
    });
  }



  findOne(id: string) {
    return this.prisma.capsule.findUnique({
      where: { id: id.toString() },
    });
  }

  update(id: string, updateCapsuleDto: UpdateCapsuleDto) {
    return this.prisma.capsule.update({
      where: { id: id.toString() },
      data: updateCapsuleDto,
    });
  }

  remove(id: string) {
    return this.prisma.capsule.delete({
      where: { id: id.toString() },
    });
  }

  async findPendingToSend(now: Date) {
    return this.prisma.capsule.findMany({
      where: {
        status: 'pending',
        sendAt: {
          lte: now,
        },
      },
    });
  }

  async markAsSent(id: string) {
    return this.prisma.capsule.update({
      where: { id },
      data: { status: 'sent' },
    });
  }


}
