import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('service-categories')
@Controller('service-categories')
export class ServiceCategoryController {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.serviceCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceCategoryService.findOne(id);
  }

  @Post()
  create(@Body() createServiceCategoryDto: CreateServiceCategoryDto) {
    return this.serviceCategoryService.create(createServiceCategoryDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceCategoryDto: UpdateServiceCategoryDto,
  ) {
    return this.serviceCategoryService.update(id, updateServiceCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceCategoryService.remove(id);
  }
}
