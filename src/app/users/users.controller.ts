import {
  All,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt-auth.guard';
import { Public } from 'src/common/metadata/public.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createBody: any): Promise<any> {
    return this.service.addUser(createBody);
  }

  @Public()
  @Get('active/:id')
  async active(@Param('id') id: string) {
    return this.service.activeAccount(id);
  }

  @Get()
  async getAll(@Req() req: any): Promise<any> {
    console.log(req.user);

    return this.service.findAll();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string): Promise<any> {
    return this.service.findOneUser(id);
  }

  @Put(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() updateBody: any,
  ): Promise<any> {
    return this.service.updateInfoUser(id, updateBody);
  }

  @Delete(':id')
  async removeUserById(@Param('id') id: string): Promise<any> {
    return this.service.deleteUser(id);
  }
}
