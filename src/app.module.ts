import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { Routes } from 'nest-router/routes.interface';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
const routes: Routes = [
  {
    path: '/',
    module: EventModule,
    children: [
      {
        path: '/event/:eventId',
        module: TicketModule,
      }
    ],
  },
];
@Module({
  
  imports: [RouterModule.forRoutes(routes), EventModule, TicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
