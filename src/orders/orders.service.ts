import { Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order as Master } from './entities/order.entity';
import { OrdersDetail as Detail } from './entities/ordersdetail.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(Master.REPOSITORY)
    protected masterRpstry: Repository<Master>,
    @Inject(Detail.REPOSITORY)
    protected detailRpstry: Repository<Detail>,
  ) {}
  
    async create(masterDto: Master) {
      if(!(await this.hasMasterEntity(masterDto.flowkey))){
        throw new NotAcceptableException(
          `${Master.name}.entity.flowkey #${masterDto.flowkey} already exists, no need to add`)
      } else return await this.masterRpstry.save(masterDto);
    }
  
    async findAll() {
      return await this.masterRpstry.find();
    }
  
    async findOne(id: string) {
      if(!(await this.hasMasterEntity(id))){
        throw this.notFoundException(id)
      } else {  // 後面options給relations後可查詢到orders_details資料
        return await this.masterRpstry.findOne(id,{ relations: ['details'] });
      }
    }

  async update(id: string, updateDto: Master) {
    if(!(await this.hasMasterEntity(id))){
      throw this.notFoundException(id)
    } else {
      this.deleteDetail(id) // 先刪掉details
      return await this.masterRpstry.save(updateDto)
    }
  }

  async remove(id: string) {
    if(!(await this.hasMasterEntity(id))){
      throw this.notFoundException(id)
    } else {
      this.deleteDetail(id) // 先刪掉details
      return await this.masterRpstry.delete(id);
    }
  }


  protected async deleteDetail(id: string) {
    await this.detailRpstry.createQueryBuilder().delete()
    .where("flowkey = :id",{id: id}).execute()
  }

  protected async hasMasterEntity(id: string) {
    const master = await this.masterRpstry.findOne(id)
    if(master) {return true}
    else {return false}
  }

  protected notFoundException(id: string): NotFoundException{
    return new NotFoundException(`Not found ${Master.name}.entity.flowkey #${id}`)
  }
}
