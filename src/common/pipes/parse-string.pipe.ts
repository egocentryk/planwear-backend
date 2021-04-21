import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseStringPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    const val: any = String(value);

    if (Object.prototype.toString.call(val) !== '[object String]') {
      throw new BadRequestException(
        `Validation failed. "${val} is not a string.`,
      );
    }

    return val;
  }
}
