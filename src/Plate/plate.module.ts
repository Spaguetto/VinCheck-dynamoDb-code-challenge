import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { PlatesController } from './plate.controller';
import { PlatesService } from './plate.service';
import { PlateRepository } from './plate.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [PlatesController],  
  providers: [PlatesService, PlateRepository]
})

export class PlatesModule {}
