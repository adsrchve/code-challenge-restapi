import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateThreadDto } from './dto/create-thread';
import { ThreadsService } from './threads.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Threads')
@Controller('api/threads')
export class ThreadsController {
    constructor(private readonly threadsService: ThreadsService) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new thread' })
    @ApiResponse({ status: 201, description: 'Thread created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request: Invalid input' })
    @ApiResponse({ status: 401, description: 'Unauthorized: Missing or invalid token' })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() req, @Body() dto: CreateThreadDto) {
        return this.threadsService.create(req.user.id, dto)
    }

    @ApiOperation({ summary: 'See all threads' })
    @ApiResponse({ status: 200, description: 'List of all threads retrieved successfully' })
    @Get()
    findAll() {
        return this.threadsService.findAll()
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'See all threads created by me' })
    @ApiResponse({ status: 200, description: 'List of my threads retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized: Missing or invalid token' })
    @UseGuards(JwtAuthGuard)
    @Get('my-threads')
    findMyThreads(@Req() req) {
        return this.threadsService.findMyThreads(req.user.id)
    }

    @ApiOperation({ summary: 'See thread by ID' })
    @ApiResponse({ status: 200, description: 'Thread retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Not Found: Thread does not exist' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.threadsService.findOne(id)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update my thread' })
    @ApiResponse({ status: 200, description: 'Thread updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized: Missing or invalid token' })
    @ApiResponse({ status: 403, description: 'Forbidden: Not the thread owner' })
    @ApiResponse({ status: 404, description: 'Not Found: Thread does not exist' })
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Req() req, @Param('id') id: string, @Body() dto: CreateThreadDto) {
        return this.threadsService.update(req.user.id, id, dto)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete my thread' })
    @ApiResponse({ status: 200, description: 'Thread deleted successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized: Missing or invalid token' })
    @ApiResponse({ status: 403, description: 'Forbidden: Not the thread owner' })
    @ApiResponse({ status: 404, description: 'Not Found: Thread does not exist' })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Req() req, @Param('id') id: string) {
        return this.threadsService.remove(req.user.id, id)
    }
}
