import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateThreadDto } from './dto/create-thread';
import { ThreadsService } from './threads.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Threads')
@Controller('api/threads')
export class ThreadsController {
    constructor(private readonly threadsService: ThreadsService) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new thread' })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() req, @Body() dto: CreateThreadDto) {
        return this.threadsService.create(req.user.id, dto)
    }

    @ApiOperation({ summary: 'See all threads' })
    @Get()
    findAll() {
        return this.threadsService.findAll()
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'See all threads created by me' })
    @UseGuards(JwtAuthGuard)
    @Get('my-threads')
    findMyThreads(@Req() req) {
        return this.threadsService.findMyThreads(req.user.id)
    }

    @ApiOperation({ summary: 'See thread by ID' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.threadsService.findOne(id)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update my thread' })
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Req() req, @Param('id') id: string, @Body() dto: CreateThreadDto) {
        return this.threadsService.update(req.user.id, id, dto)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete my thread' })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Req() req, @Param('id') id: string) {
        return this.threadsService.remove(req.user.id, id)
    }
}
