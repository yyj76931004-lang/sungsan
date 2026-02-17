import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { MemberStatus } from '@prisma/client';

export class CreateMemberDto {
  name: string;
  baptismName: string;
  birthDate: string;
  baptismDate: string;
  phone: string;
  address: string;
  status?: MemberStatus;
}

export class UpdateMemberDto {
  name?: string;
  baptismName?: string;
  birthDate?: string;
  baptismDate?: string;
  phone?: string;
  address?: string;
  status?: MemberStatus;
}

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string) {
    return this.prisma.member.findMany({
      where: search
        ? { name: { contains: search, mode: 'insensitive' } }
        : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const member = await this.prisma.member.findUnique({
      where: { id },
      include: { sacraments: { orderBy: { date: 'desc' } } },
    });
    if (!member) throw new NotFoundException('신자를 찾을 수 없습니다.');
    return member;
  }

  async create(dto: CreateMemberDto) {
    return this.prisma.member.create({
      data: {
        name: dto.name,
        baptismName: dto.baptismName,
        birthDate: new Date(dto.birthDate),
        baptismDate: new Date(dto.baptismDate),
        phone: dto.phone,
        address: dto.address,
        status: dto.status || 'ACTIVE',
      },
    });
  }

  async update(id: string, dto: UpdateMemberDto) {
    await this.findOne(id);
    return this.prisma.member.update({
      where: { id },
      data: {
        ...dto,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
        baptismDate: dto.baptismDate ? new Date(dto.baptismDate) : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.member.delete({ where: { id } });
  }
}
