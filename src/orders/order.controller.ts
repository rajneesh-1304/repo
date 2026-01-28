import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('checkout')
  checkout(@Body('userId') userId: number) {
    return this.orderService.checkout(userId);
  }

  @Get()
  getUserOrders(@Query('userId') userId: number) {
    return this.orderService.getUserOrders(userId);
  }

  @Get('order')
  getOrders(){
    return this.orderService.getOrders();
  }


  @Get(':orderId')
  getOrderById(@Param('orderId') orderId: number) {
    return this.orderService.getOrderById(orderId);
  }

  @Patch(':orderId/status')
  updateOrderStatus(
    @Param('orderId') orderId: number,
    @Body('status') status,
  ) {
    return this.orderService.updateOrderStatus(orderId, status);
  }

  @Patch(':orderId/cancel')
  cancelOrder(@Param('orderId') orderId: number) {
    return this.orderService.cancelOrder(orderId);
  }

  @Get('order/:id')
  getOrderBySellerId(@Param('id') id :string){
    return this.orderService.getOrderBySellerId(+id);
  }
}
