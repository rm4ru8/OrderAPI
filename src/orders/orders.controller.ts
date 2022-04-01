import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService as Service } from './orders.service';
import { Order as Master } from './entities/order.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

const formName: string = '訂單';

@Controller('order')
@ApiTags(`${formName}接口`)
export class OrdersController {
  constructor(protected service: Service) {}

  @Post()
  @ApiOperation({summary: `新增${formName}資料`})
  create(@Body() createDto: Master) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({summary: `獲取所有${formName}資料`})
  findAll() {
    return this.service.findAll();
  }

  @Get(':flowkey')
  @ApiOperation({summary: `依flowkey獲取一筆${formName}資料`})
  findOne(@Param('flowkey') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':flowkey')
  @ApiOperation({summary: `依flowkey修改${formName}資料`})
  update(@Param('flowkey') id: string, @Body() updateDto: Master) {
    return this.service.update(id, updateDto);
  }

  @Delete(':flowkey')
  @ApiOperation({summary: `依flowkey刪除${formName}資料`})
  remove(@Param('flowkey') id: string) {
    return this.service.remove(id);
  }
}
