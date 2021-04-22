import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';

import { ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorators/public.decorator';
import { ParseIntPipe } from '@common/pipes/parse-int.pipe';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFilter } from '@utils/file-upload.utils';
import { UploadArticlePhotoDTO } from './dto/upload-article-photo.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.articleService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.articleService.findOne(id);
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Post('/upload/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFilter,
      storage: diskStorage({
        destination: './src/files',
        filename: editFileName,
      }),
    }),
  )
  async uploadFile(
    @Body() uploadArticlePhotoDto: UploadArticlePhotoDTO,
    @Param('id') id: string,
    @UploadedFile() file: string | any,
  ) {
    const photo = uploadArticlePhotoDto;

    photo.article = id;
    photo.filename = file.filename;

    return this.articleService.uploadArticlePhoto(photo);
  }

  @Patch()
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
