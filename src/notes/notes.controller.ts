import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { CreateNoteDto } from './create-note.dto.js';

@Controller('notes')
export class NotesController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async list() {
    const { rows } = await this.db.pool.query(
      'SELECT id, text, created_at FROM notes ORDER BY id DESC LIMIT 50',
    );
    return rows;
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const { rows } = await this.db.pool.query(
      'SELECT id, text, created_at FROM notes WHERE id = $1',
      [id],
    );
    if (rows.length === 0) throw new NotFoundException('Note not found');
    return rows[0];
  }

  @Post()
  async create(@Body() note: CreateNoteDto) {
    const { rows } = await this.db.pool.query(
      'INSERT INTO notes (text) VALUES ($1) RETURNING id, text, created_at',
      [note.text],
    );
    return rows[0];
  }
}
