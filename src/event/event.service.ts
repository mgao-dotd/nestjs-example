import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService extends InMemoryDBService<Event> {


}
