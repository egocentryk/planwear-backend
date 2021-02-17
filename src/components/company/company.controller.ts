import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

@Controller('company')
export class CompanyController {
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;

    return `This action returns all companies. Limit: ${limit}, offset: ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} of a company`;
  }

  @Post()
  create(@Body() body) {
    return body;
    // this action creates a company
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} company`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} company`;
  }
}
