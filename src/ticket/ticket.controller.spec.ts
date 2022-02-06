import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from '../event/event.controller';
import { Ticket } from './entities/ticket.entity';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Event } from '../event/entities/event.entity'
import { EventModule } from '../event/event.module';
import { HttpException } from '@nestjs/common';
describe('TicketController', () => {
  let ticketController: TicketController;
  let eventController: EventController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [TicketService],
      imports: [EventModule],
    }).compile();

    eventController = module.get<EventController>(EventController);
    ticketController = module.get<TicketController>(TicketController);
  });

  it('Basic CRUD operations', () => {
    const testEvent = new Event({
      "eventTitle": "Jest Test Event",
      "eventDate": new Date("2022-02-06T08:51:14+00:00"),
      "eventCity": "Berlin"
    })
    const testTicket = new Ticket({
      "barcode": "abcdefgh",
      "firstName": "Max",
      "lastName": "Mustermann"
    })
    // create one, try to retrieve it
    let event = eventController.create(testEvent)
    let ticket = ticketController.create(event.id, testTicket)
    expect(ticketController.findOne(event.id, ticket.id)).toStrictEqual(ticket)
    try {
      ticketController.findOne("invalid_id", ticket.id)
    }
    catch (e) {
      expect(e).toBeInstanceOf(HttpException)
    }
    try {
      ticketController.findOne(event.id, "invalid id")
    }
    catch (e) {
      expect(e).toBeInstanceOf(HttpException)
    }
    expect(ticketController.findAll(event.id)).toStrictEqual([ticket])

    // remove it again, try again to retrieve it
    ticketController.remove(event.id, ticket.id)
    expect(ticketController.findAll(event.id)).toStrictEqual([])
    try {
      ticketController.findOne(event.id, ticket.id)
    }
    catch (e) {
      expect(e).toBeInstanceOf(HttpException)
    }

  });
});
