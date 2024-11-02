import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { usersTable } from '../db/schema';

const db = drizzle(process.env.DATABASE_URL!);

@Injectable()
export class UsersService {
  async create(user: CreateUserDto) {
    return await db.insert(usersTable).values(user);
  }

  async findOne(id: number) {
    return await db
      .select({ id: eq(usersTable.id, id) })
      .from(usersTable)
  }
}
