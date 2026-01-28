import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Products } from './product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly dataSource: DataSource) {}

  async addProduct(prodData, files: Express.Multer.File[]) {
    if (!prodData.title || prodData.title.trim() === '') {
      throw new BadRequestException('Product title is required');
    }

    if (!prodData.price || prodData.price <= 0) {
      throw new BadRequestException('Product price must be greater than 0');
    }

    if (!prodData.category || !prodData.subcategory) {
      throw new BadRequestException('Category and subcategory are required');
    }
    const prodRepo = this.dataSource.getRepository(Products);
    const existingProduct = await prodRepo.findOne({
      where: {
        sellerId: prodData.sellerId,
        title: prodData.title,
      },
    });
    if (existingProduct) {
      throw new ConflictException('Product with this title already exists');
    }
    const imageUrls =
      files?.map((file) => `http://localhost:3001/uploads/${file.filename}`) ||
      [];

    const prod = prodRepo.create({
      sellerId: prodData.sellerId,
      title: prodData.title,
      description: prodData.description,
      price: prodData.price,
      rating: prodData.rating || 0,
      category: prodData.category,
      subcategory: prodData.subcategory,
      quantity: prodData.quantity || 0,
      images: imageUrls,
      isActive: true,
    });

    await prodRepo.save(prod);
    return { message: 'Product added successfully' };
  }

  async getAll() {
    const prodRepo = this.dataSource.getRepository(Products);
    return await prodRepo.find({ where: { isActive: true } });
  }

  async getProducts(query: any) {
    console.log('query', query);
    const limit = Number(query?.limit) || 10;
    const page = Number(query?.page) || 1;
    const skip = (page - 1) * limit;

    const prodRepo = this.dataSource.getRepository(Products);

    const qb = prodRepo.createQueryBuilder('product');
    qb.where('product.isActive = :isActive', { isActive: true });
    if (
      query?.title &&
      query.title !== 'undefined' &&
      query.title.trim() !== ''
    ) {
      qb.andWhere('product.title ILIKE :title', {
        title: `%${query.title}%`,
      });
    }

    if (query?.category && query.category !== 'undefined') {
      qb.andWhere('product.category = :category', {
        category: query.category,
      });
    }

    if (query?.subcategory && query.subcategory !== 'undefined') {
      qb.andWhere('product.subcategory = :subcategory', {
        subcategory: query.subcategory,
      });
    }

    if (query?.sellerId) {
      qb.andWhere('product.sellerId = :sellerId', {
        sellerId: Number(query.sellerId),
      });
    }

    qb.skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return { data, total };
  }

  async updateProduct(productId, productData, files?: Express.Multer.File[]) {
    const id = Number(productId);
    if (!id) {
      throw new BadRequestException('Product id is not present');
    }

    if (!productData && (!files || files.length === 0)) {
      throw new BadRequestException('User does not provide data for update');
    }

    const prodRepo = this.dataSource.getRepository(Products);
    const existProduct = await prodRepo.findOne({ where: { id } });

    if (!existProduct) throw new ConflictException('Product does not exist.');
    const imageUrls =
      files?.map((file) => `http://localhost:3001/uploads/${file.filename}`) ||
      [];

    productData.images = [...(existProduct.images || []), ...imageUrls];
    await prodRepo.update(productId, productData);

    return { message: 'Product updated successfully!' };
  }

  async getProductDetail(id: number) {
    if (!id) {
      throw new BadRequestException('Product id is not present');
    }

    const prodRepo = this.dataSource.getRepository(Products);
    const product = await prodRepo.findOne({ where: { id } });

    if (!product) throw new NotFoundException('Product does not exist');

    return { product };
  }

  async deleteProduct(id: number) {
    if (!id) {
      throw new BadRequestException('Product id is not present');
    }
    const prodRepo = this.dataSource.getRepository(Products);
    const product = await prodRepo.findOne({ where: { id } });

    if (!product) throw new NotFoundException('Product does not exist');
    await prodRepo.delete(id);
    return { message: 'Product deleted successfully' };
  }

  async banProduct(id: number) {
    const prodRepo = this.dataSource.getRepository(Products);
    const product = await prodRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    product.isActive = false;
    await prodRepo.save(product);
    return product;
  }

  async unbanProduct(id: number) {
    const prodRepo = this.dataSource.getRepository(Products);
    const product = await prodRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    product.isActive = true;
    await prodRepo.save(product);
    return product;
  }
}
