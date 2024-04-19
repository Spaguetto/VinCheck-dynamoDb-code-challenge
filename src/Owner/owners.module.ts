import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { OwnersRepository  } from './owners.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [OwnersController],
  providers: [OwnersService, OwnersRepository]
})
export class OwnersModule {}
