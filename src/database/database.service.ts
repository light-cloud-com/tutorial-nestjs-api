import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import pg from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);

  // One small pool per instance. Light Cloud may run several instances,
  // so keep this low on a shared Dev database (10 connections in total).
  readonly pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    max: Number(process.env.DB_POOL_MAX ?? 3),
  });

  async onModuleInit() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`);
    this.logger.log('connected to PostgreSQL, notes table ready');
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
