import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order as Master } from './entities/order.entity';
import { OrdersDetail as Detail } from './entities/ordersdetail.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(Master.REPOSITORY)
    private readonly orderRepository: Repository<Master>,
    @Inject(Detail.REPOSITORY)
    private readonly detailRepository: Repository<Detail>,
  ) {}

  async create(createOrderDto: Master) {
    // 先查詢有無該flowkey，若有→返回已有該單號錯誤訊息
    if((await this.orderRepository.findOne(createOrderDto.flowkey))){
      return "已有該單號" // 換成http的
    }
    return await this.orderRepository.save(createOrderDto);
  }

  async findAll() {
    return await this.orderRepository.find();
  }

  async findOne(id: string) { // 後面options給relations後可查詢到orders_details資料
    return await this.orderRepository.findOne(id,{ relations: ['details'] });
  }

  async update(id: string, updateOrderDto: Master) {
    this.deleteDetail(id) // 先刪掉details
    return await this.orderRepository.save(updateOrderDto)
  }

  async remove(id: string) {
    this.deleteDetail(id) // 先刪掉details
    return await this.orderRepository.delete(id);
  }

  async deleteDetail(id: string) {
    await this.detailRepository.createQueryBuilder().delete()
    .where("flowkey = :id",{id: id}).execute()
  }
}
