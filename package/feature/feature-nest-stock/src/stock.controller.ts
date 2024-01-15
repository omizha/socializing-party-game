import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Request, Response } from 'shared~type-stock';
import { Stock } from './stock.schema';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  async getStock(@Query('stockId') stockId: string): Promise<Stock> {
    const stock = await this.stockService.findOneById(stockId);
    return stock;
  }

  @Patch()
  updateStock(@Query('stockId') stockId: string, @Body() body: Request.UpdateStock): Promise<Response.Stock> {
    return this.stockService.findOneByIdAndUpdate(stockId, body);
  }

  @Post('/reset/:stockId')
  resetStock(@Param('stockId') stockId: string): Promise<Response.Stock> {
    return this.stockService.resetStock(stockId);
  }

  @Post('/result/:stockId')
  saveStockResult(@Param('stockId') stockId: string): Promise<Response.Result[]> {
    return this.stockService.saveStockResult(stockId);
  }

  @Post('/init/:stockId')
  initStock(@Param('stockId') stockId: string): Promise<Response.Stock> {
    return this.stockService.initStock(stockId);
  }

  @Post('/buy/:stockId')
  buyStock(@Param('stockId') stockId: string, @Body() body: Request.BuyStock): Promise<Stock> {
    return this.stockService.buyStock(stockId, body);
  }

  @Post('/sell/:stockId')
  sellStock(@Param('stockId') stockId: string, @Body() body: Request.SellStock): Promise<Stock> {
    return this.stockService.sellStock(stockId, body);
  }

  @Post('/finish/:stockId')
  async stockFinish(@Param('stockId') stockId: string): Promise<Stock> {
    await this.stockService.findOneByIdAndUpdate(stockId, { isTransaction: false });
    return this.stockService.allUserSellStock(stockId);
  }
}
