import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { FinesController } from './fines.controller';
import { FinesService } from './fines.service';  
import { FinesRepository } from './fines.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [FinesController],
  providers: [FinesService, FinesRepository] 
})
export class FinesModule {}