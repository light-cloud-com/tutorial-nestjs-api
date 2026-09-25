import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database/database.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly db: DatabaseService) {}

  // Checks the database too, so a broken DATABASE_URL shows up here.
  @Get()
  async check() {
    await this.db.pool.query('SELECT 1');
    return { status: 'ok', database: 'ok' };
  }
}
