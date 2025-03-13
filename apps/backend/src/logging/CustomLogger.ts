import { Logger } from '@nestjs/common';
import { ILogger } from './logger';

export class CustomLogger implements ILogger {
  constructor(private logger: Logger) {}

  log(message: string): void {
    this.logger.log(message);
  }
  warn(message: string): void {
    this.logger.warn(message);
  }
  error(message: string): void {
    this.logger.error(message);
  }
  debug(message: string): void {
    this.logger.debug(message);
  }
  verbose(message: string): void {
    this.logger.log(message);
  }
}
