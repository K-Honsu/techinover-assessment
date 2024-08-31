import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard, PopulatedRequest } from 'src/common/auth.guard';
import { Roles } from 'src/common/role.decorator';
import { ToggleProductStatusDto } from './dto/toggle-product';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { Product } from './schemas/product.schema';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  // @Post()
  // @UseGuards(AuthGuard)
  // @Roles("user")
  // @ApiOperation({ summary: 'Create a new product' })
  // @ApiResponse({ status: 201, description: 'Product created successfully', type: Product })
  // @ApiBody({ type: CreateProductDto })
  // create(@Body() createProductDto: CreateProductDto, @Req() req: PopulatedRequest) {
  //   return this.productsService.create(createProductDto, req.user.id)
  // }

  @Post()
  @UseGuards(AuthGuard)
  @Roles("user")
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201, description: 'Product created successfully', type: Product, example: {
      "title": "Children School Bags4",
      "description": "Favourite children school bags",
      "price": 100,
      "quantity": 20,
      "isApproved": "disapproved",
      "_id": "66d300f3cec1f3b3561b086f",
      "createdAt": "2024-08-31T11:39:31.746Z",
      "updatedAt": "2024-08-31T11:39:31.746Z",
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({
    type: CreateProductDto, examples: {
      example1: {
        summary: 'Valid Input',
        value: {
          title: "Sample Product",
          description: "A description of the sample product.",
          quantity: 5,
          price: 15.99,
        },
      },
      example2: {
        summary: 'Invalid Input - Missing Fields',
        value: {
          title: "",
          description: "",
          quantity: 0,
          price: 0,
        },
      },
    },
  })
  create(@Body() createProductDto: CreateProductDto, @Req() req: PopulatedRequest) {
    return this.productsService.create(createProductDto, req.user.id);
  }


  @Patch("toggle-status")
  @UseGuards(AuthGuard)
  @Roles("admin")
  @ApiOperation({ summary: "Approves or Disapproves a Product by Admin" })
  @ApiResponse({ status: 200, description: "Successfully toggled the product's approval status. The response includes a message indicating whether the product has been approved or disapproved." })
  @ApiResponse({ status: 404, description: "Product not found." })
  @ApiResponse({ status: 400, description: "Invalid product ID or approval status passed in the request body." })
  @ApiBody({
    type: ToggleProductStatusDto, examples: {
      example1: {
        summary: "Approve a product",
        value: {
          productId: "66d2702ed220a6cd20fc4055",
          isApproved: "approved"
        }
      },
      example2: {
        summary: "Disapprove a product",
        value: {
          productId: "66d2702ed220a6cd20fc4055",
          isApproved: "disapproved"
        }
      }
    }
  })
  toggleProduct(@Body() dto: ToggleProductStatusDto) {
    return this.productsService.toggleProducts(dto);
  }

  // @Get()
  // viewProduct() {
  //   return this.productsService.viewProduct()
  // }

  @Get()
  @ApiOperation({ summary: "View all approved products" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved all approved products.",
    schema: {
      example: [
        {
          _id: "64e8a7f1b4e0851b2c0fbb94",
          title: "Children School Bags",
          description: "Durable and stylish school bags for children.",
          price: 29.99,
          quantity: 100,
          isApproved: "approved",
          userId: "64d3a8f1b4e0851b2c0fbb73",
          createdAt: "2024-08-30T12:45:30.000Z",
          updatedAt: "2024-08-30T12:45:30.000Z",
        },
        {
          _id: "64e8a7f1b4e0851b2c0fbb95",
          title: "Leather Wallets",
          description: "High-quality leather wallets.",
          price: 49.99,
          quantity: 50,
          isApproved: "approved",
          userId: "64d3a8f1b4e0851b2c0fbb74",
          createdAt: "2024-08-29T08:15:10.000Z",
          updatedAt: "2024-08-29T08:15:10.000Z",
        },
      ],
    },
  })
  @ApiResponse({
    status: 404,
    description: "No approved products found.",
    schema: {
      example: { statusCode: 404, message: "No approved products found", error: "Not Found" },
    },
  })
  viewProduct() {
    return this.productsService.viewProduct();
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
