
import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";
import { IsAlphanumeric, IsNotEmpty, IsString } from "class-validator";
export class Ticket implements InMemoryDBEntity {
  id: string;
  eventId: string;
  @IsAlphanumeric()
  @IsNotEmpty()
  barcode: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;

  constructor(payload: Partial<Ticket> = {}) {
    for (const key of ["id", "eventId", "barcode", "firstName", "lastName"]) {
      if (payload[key])
        this[key] = payload[key]
    }
  }
}
