import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateThreadDto } from './dto/create-thread';
import { stringify } from 'querystring';

@Injectable()
export class ThreadsService {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, dto: CreateThreadDto) {
        return this.prisma.thread.create({
            data: {
                title: dto.title,
                body: dto.body,
                authorId: userId,
            }
        })
    }

    async findAll() {
        return this.prisma.thread.findMany({
            include: { author: { select: { id: true, username: true } } }
        })
    }

    async findMyThreads(userId: string) {
        return this.prisma.thread.findMany({
            where: { authorId: userId },
        })
    }

    async findOne(id: string) {
        const thread = await this.prisma.thread.findUnique({
            where: { id },
            include: { author: { select: { id: true, username: true } } }
        })
        if (!thread) throw new NotFoundException('Thread not found')
        return thread
    }

    async update(userId: string, id: string, dto: CreateThreadDto) {
        const thread = await this.findOne(id)
        if (thread.authorId !== userId) throw new ForbiddenException('Access denied')
        return this.prisma.thread.update({
            where: { id },
            data: dto,
        })
    }

    async remove(userId: string, id: string) {
        const thread = await this.findOne(id)
        if (thread.authorId !== userId) throw new ForbiddenException('Access denied')
        return this.prisma.thread.delete({
            where: { id } 
        })
    }
}
