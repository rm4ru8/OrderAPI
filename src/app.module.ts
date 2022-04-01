import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './orders/database/database.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [DatabaseModule,OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
