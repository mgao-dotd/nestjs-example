import { Test, TestingModule } from '@nestjs/testing';
import { TicketModule } from '../ticket/ticket.module';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event } from './entities/event.entity'
import { TicketController } from '../ticket/ticket.controller';
import { Ticket } from '../ticket/entities/ticket.entity';
import { HttpException } from '@nestjs/common';
describe('EventController', () => {
  let controller: EventController;
  let ticketController: TicketController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [EventService],
      imports: [TicketModule],
    }).compile();

    controller = module.get<EventController>(EventController);
    ticketController = module.get<TicketController>(TicketController);
  });

  it('Basic CRUD operations', () => {
    const testEvent = new Event({
      "eventTitle": "Jest Test Event",
      "eventDate": new Date("2022-02-06T08:51:14+00:00"),
      "eventCity": "Berlin"
    })
    // create one, try to retrieve it
    let result = controller.create(testEvent)
    expect(controller.findOne(result.id)).toStrictEqual(result)

    // try non existent id
    try {
      expect(controller.findOne("invalid id")).toThrow()
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException)
    }
    // try list
    expect(controller.findAll()).toStrictEqual([result])

    // remove it again, try again to retrieve it
    controller.remove(result.id)
    expect(controller.findAll()).toStrictEqual([])
    try {
      expect(controller.findOne(result.id)).toThrow()
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException)
    }

  });

  it('Retrieve Tickets', () => {
    const testEvent = new Event({
      "eventTitle": "Jest Test Event",
      "eventDate": new Date("2022-02-06T08:51:14+00:00"),
      "eventCity": "Berlin"
    })

    // create one, try to retrieve it
    let event = controller.create(testEvent)
    const testTicket = new Ticket({
      "barcode": "abcd5678",
      "firstName": "Max",
      "lastName": "Mustermann"
    })
    let ticket = ticketController.create(event.id, testTicket)

    expect(controller.findOne(event.id, "true")).toStrictEqual({ ...event, tickets: [ticket] })
    expect(controller.findAll("true")).toStrictEqual([{ ...event, tickets: [ticket] }])


  });

});
