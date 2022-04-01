import { Connection, Repository } from 'typeorm';
import { Order as Master } from './entities/order.entity';
import { OrdersDetail as Detail } from './entities/ordersdetail.entity';

export const orderProviders = [
  {
    provide: Master.REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Master),
    inject: ['DATABASE_CONNECTION'],
  },{
    provide: Detail.REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Detail),
    inject: ['DATABASE_CONNECTION'],
  }
];
