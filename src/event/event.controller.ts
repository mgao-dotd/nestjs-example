import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseBoolPipe, Put, HttpException, HttpStatus } from '@nestjs/common';
import { Ticket } from '../ticket/entities/ticket.entity';
import { TicketService } from '../ticket/ticket.service';
import { Event } from './entities/event.entity';
import { EventService } from './event.service';


@Controller('event')
export class EventController {
  constructor(private eventService: EventService, private ticketService: TicketService) { }

  @Post()
  create(@Body() event: Event) {
    return this.eventService.create(event);
  }

  @Get()
  findAll(@Query('include_tickets') include_tickets: string = "false") {
    let events = this.eventService.getAll()
    if(include_tickets.toLowerCase() === 'true'){
      return events.map((e: Event) => {
        return {...e, tickets: this.ticketService.query((x: Ticket) => x.eventId == e.id)};
        
      })
    }
    return events
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('include_tickets') include_tickets: string = "false") {
    let event =  this.eventService.get(id);
    if(!event){throw new HttpException('Not found', HttpStatus.NOT_FOUND)}
    if(include_tickets.toLowerCase() === 'true'){
      let tickets = this.ticketService.query(x => x.eventId == id)
      return {...event, tickets}
    }
    return event
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() event: Event) {
    this.eventService.update({ id, ...event });
    return this.eventService.get(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.delete(id);
  }
}
