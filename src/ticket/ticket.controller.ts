import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './entities/ticket.entity';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post()
  create(@Param('eventId') eventId, @Body() ticket: Ticket) {
    
    return this.ticketService.create({eventId,...ticket});
  }

  @Get()
  findAll(@Param('eventId') eventId) {
    return this.ticketService.query(t => t.eventId = eventId);
  }

  @Get(':id')
  findOne(@Param('eventId') eventId : string, @Param('id') id: string) {
    let result = this.ticketService.get(id);
    if(!result || !(result.eventId == eventId)) {throw new HttpException('Not found', HttpStatus.NOT_FOUND)}
    return result
  }

  @Patch(':id')
  update(@Param('eventId') eventId : string, @Param('id') id: string, @Body() update_ticket: Ticket) {
    let ticket = this.ticketService.get(id);
    if(!ticket || !(ticket.eventId == eventId)) {throw new HttpException('Not found', HttpStatus.NOT_FOUND)}
    this.ticketService.update({id,...update_ticket});
    return this.ticketService.get(id);
  }

  @Delete(':id')
  remove(@Param('eventId') eventId : string, @Param('id') id: string) {    
    let ticket = this.ticketService.get(id);
    if(!ticket || !(ticket.eventId == eventId)) {throw new HttpException('Not found', HttpStatus.NOT_FOUND)}
    return this.ticketService.delete(id);
  }
}
