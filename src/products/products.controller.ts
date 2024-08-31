import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard, PopulatedRequest } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { ToggleProductStatusDto } from './dto/toggle-product';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UseGuards(AuthGuard)
  @Roles("user")
  create(@Body() createProductDto: CreateProductDto, @Req() req: PopulatedRequest) {
    return this.productsService.create(createProductDto, req.user.id)
  }

  @Patch("toggle-status")
  @UseGuards(AuthGuard)
  @Roles("admin")
  toggleProduct(@Body() dto: ToggleProductStatusDto) {
    return this.productsService.toggleProducts(dto);
  }

  @Get()
  viewProduct() {
    return this.productsService.viewProduct()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
