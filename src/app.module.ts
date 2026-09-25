import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module.js';
import { HealthController } from './health.controller.js';
import { NotesController } from './notes/notes.controller.js';

@Module({
  imports: [DatabaseModule],
  controllers: [NotesController, HealthController],
})
export class AppModule {}
