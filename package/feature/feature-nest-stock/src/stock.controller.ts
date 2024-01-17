import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
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
  updateStock(@Body() body: Request.PatchUpdateStock): Promise<Response.Stock> {
    return this.stockService.findOneByIdAndUpdate(body);
  }

  @Post('/reset')
  resetStock(@Query('stockId') stockId: string): Promise<Response.Stock> {
    return this.stockService.resetStock(stockId);
  }

  @Post('/result')
  saveStockResult(@Query('stockId') stockId: string): Promise<Response.Result[]> {
    return this.stockService.saveStockResult(stockId);
  }

  @Post('/init')
  initStock(@Query('stockId') stockId: string): Promise<Response.Stock> {
    return this.stockService.initStock(stockId);
  }

  @Post('/buy')
  buyStock(@Body() body: Request.PostBuyStock): Promise<Stock> {
    return this.stockService.buyStock(body.stockId, body);
  }

  @Post('/sell')
  sellStock(@Body() body: Request.PostSellStock): Promise<Stock> {
    return this.stockService.sellStock(body.stockId, body);
  }

  @Post('/finish')
  async stockFinish(@Query('stockId') stockId: string): Promise<Stock> {
    await this.stockService.findOneByIdAndUpdate({ _id: stockId, isTransaction: false });
    return this.stockService.allUserSellStock(stockId);
  }
}
