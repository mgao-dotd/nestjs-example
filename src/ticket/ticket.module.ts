import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
@Module({
  controllers: [TicketController],
  providers: [TicketService],
  imports: [InMemoryDBModule],
  exports: [TicketService]
})
export class TicketModule {}
