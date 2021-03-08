import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UploadArticlePhotoDTO {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  article: number;

  @IsNotEmpty()
  @IsString()
  filename: string;
}