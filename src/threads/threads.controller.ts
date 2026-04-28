import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateThreadDto } from './dto/create-thread';
import { ThreadsService } from './threads.service';

@Controller('api/threads')
export class ThreadsController {
    constructor(private readonly threadsService: ThreadsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Req() req, @Body() dto: CreateThreadDto) {
        return this.threadsService.create(req.user.id, dto)
    }

    @Get()
    findAll() {
        return this.threadsService.findAll()
    }

    @Get('my-threads')
    @UseGuards(JwtAuthGuard)
    findMyThreads(@Req() req) {
        return this.threadsService.findMyThreads(req.user.id)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.threadsService.findOne(id)
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(@Req() req, @Param('id') id: string, @Body() dto: CreateThreadDto) {
        return this.threadsService.update(req.user.id, id, dto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Req() req, @Param('id') id: string) {
        return this.threadsService.remove(req.user.id, id)
    }
}
