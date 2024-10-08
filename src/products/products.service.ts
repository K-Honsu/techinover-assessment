import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CACHE_MANAGER, CacheKey, CacheTTL, Cache } from "@nestjs/cache-manager"
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument, ProductStatus } from './schemas/product.schema';
import { Model, FilterQuery } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { ToggleProductStatusDto } from './dto/toggle-product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly userService: UsersService
  ) { }
  async create(dto: CreateProductDto, userId: string): Promise<ProductDocument> {
    const user = await this.userService.getUserOrThrow(userId)

    const product = await this.productModel.create({
      userId: userId,
      ...dto
    })
    return product
  }

  async toggleProducts(dto: ToggleProductStatusDto) {
    const { productId, isApproved } = dto
    const product = await this.productModel.findById(productId)
    if (!product) throw new NotFoundException("Product not found")

    product.isApproved = isApproved

    await product.save()

    return { message: `Product has been ${product.isApproved}` };
  }

  @CacheKey("view-products")
  @CacheTTL(600)
  async viewProduct() {
    const filter: FilterQuery<ProductDocument> = {
      isApproved: ProductStatus.APPROVED
    };

    const cachedProducts = await this.cacheManager.get("view-products")
    if (cachedProducts) {
      return cachedProducts;
    }

    const approvedProducts = await this.productModel.find(filter).lean().exec();

    await this.cacheManager.set("view-products", approvedProducts, 600);

    return approvedProducts;
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
