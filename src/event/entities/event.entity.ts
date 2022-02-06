
import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Ticket } from "src/ticket/entities/ticket.entity";
export class Event implements InMemoryDBEntity{
    id: string;
    tickets: Ticket[];
    @IsString()
    @IsNotEmpty()
    eventTitle: string;
    @IsDateString()
    @IsNotEmpty()
    eventDate: Date;
    @IsString()
    @IsNotEmpty()
    eventCity: string;


  constructor(payload: Partial<Event> = {}){
    for(const key of ["id","tickets","eventTitle", "eventDate", "eventCity"]){
        if(payload[key])
        this[key] = payload[key]
    }
  }
}
