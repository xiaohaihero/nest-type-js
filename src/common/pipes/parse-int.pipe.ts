import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  transform(value: any, metadata: ArgumentMetadata) {
    let val = parseInt(value);
    if(isNaN(val)){
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
