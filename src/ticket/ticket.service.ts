import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService extends InMemoryDBService<Ticket> {

}
