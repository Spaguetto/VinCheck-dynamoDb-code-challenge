import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { OwnersModule } from './Owner/owners.module';
import { FinesModule } from './Fine/fines.module';
import { PlatesModule } from './Plate/plate.module';

@Module({ imports: [OwnersModule, DatabaseModule, FinesModule, PlatesModule] })
export class AppModule {}
