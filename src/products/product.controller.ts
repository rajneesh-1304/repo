import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Query, Patch, Param, UploadedFiles, } from '@nestjs/common';
import { FilesInterceptor } from "@nestjs/platform-express";
import { ProductService } from './product.service';
import { ProductDefinition } from './DTO/product';
import { Products, Querry } from './product.interface';
import { productImageStorage } from "../multer/multer";
import { Delete } from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  getProducts(@Query() query: Querry) {
    return this.productService.getProducts(query);
  }

  @Post('addproduct')
  @UseInterceptors(
    FilesInterceptor("images", 5, {
      storage: productImageStorage,
    }),
  )
  addProduct(
    @Body() productData: ProductDefinition,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productService.addProduct(productData, files);
  }

  @Patch('update/:id')
  @UseInterceptors(FilesInterceptor("images", 5, { storage: productImageStorage }))
  updateProduct(
    @Param('id') id: number,
    @Body() productData: Products,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.productService.updateProduct(id, productData, files);
  }

  @Patch('ban/:id')
  banProduct(@Param('id') id: string) {
    return this.productService.banProduct(+id);
  }

  @Patch('unban/:id')
  unbanProduct(@Param('id') id: string) {
    return this.productService.unbanProduct(+id);
  }

  @Get(':id')
  getProductDetail(@Param('id') id: string) {
    return this.productService.getProductDetail(+id);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(+id);
  }
}
