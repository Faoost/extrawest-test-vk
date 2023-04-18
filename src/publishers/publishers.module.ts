import { Module, forwardRef } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PublishersController],
  providers: [PublishersService],
})
export class PublishersModule {}
