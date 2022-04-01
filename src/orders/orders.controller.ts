import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService as Service } from './orders.service';
import { Order as Master } from './entities/order.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('訂單')
export class OrdersController {
  constructor(private readonly ordersService: Service) {}

  @Post('order')
  @ApiOperation({summary: '新增訂單資料'})
  create(@Body() createOrderDto: Master) {
    return this.ordersService.create(createOrderDto);
  }

  @Get('orders')
  @ApiOperation({summary: '查詢所有訂單資料'})
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('order/:id')
  @ApiOperation({summary: '獲取一筆訂單資料'})
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch('order/:id')
  @ApiOperation({summary: '修改訂單資料'})
  update(@Param('id') id: string, @Body() updateOrderDto: Master) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete('order/:id')
  @ApiOperation({summary: '刪除訂單資料'})
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
