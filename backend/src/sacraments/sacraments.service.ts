import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { SacramentType } from '@prisma/client';

export class CreateSacramentDto {
  memberId: string;
  type: SacramentType;
  date: string;
  note?: string;
}

@Injectable()
export class SacramentsService {
  constructor(private prisma: PrismaService) {}

  async findByMember(memberId: string) {
    return this.prisma.sacrament.findMany({
      where: { memberId },
      orderBy: { date: 'desc' },
    });
  }

  async create(dto: CreateSacramentDto) {
    const member = await this.prisma.member.findUnique({
      where: { id: dto.memberId },
    });
    if (!member) throw new NotFoundException('신자를 찾을 수 없습니다.');

    return this.prisma.sacrament.create({
      data: {
        memberId: dto.memberId,
        type: dto.type,
        date: new Date(dto.date),
        note: dto.note,
      },
    });
  }

  async remove(id: string) {
    const sacrament = await this.prisma.sacrament.findUnique({ where: { id } });
    if (!sacrament) throw new NotFoundException('성사 기록을 찾을 수 없습니다.');
    return this.prisma.sacrament.delete({ where: { id } });
  }
}
