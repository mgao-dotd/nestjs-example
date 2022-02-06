import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { TicketModule } from '../ticket/ticket.module';
@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [InMemoryDBModule, TicketModule]
})
export class EventModule {}
