import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { message } = e.message;
        throw new UnprocessableEntityException(this.handleError(message));
      }
    }
  }

  private handleError(errors: { constraints: any }[]) {
    return errors.map((error: { constraints: any }) => error.constraints);
  }
}