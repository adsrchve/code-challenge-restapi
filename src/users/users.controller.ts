import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Get user profile by ID' })
    @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Not Found: User does not exist' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findByID(id)
        if (!user) throw new NotFoundException('User not found')

        const { password_hash, ...result } = user
        return result
    }
}
