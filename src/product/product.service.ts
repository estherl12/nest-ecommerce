import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { productEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { FilterProductDto } from './dtos/filter-product.dto';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(productEntity)
    private readonly productRepo: Repository<productEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo:Repository<CategoryEntity>
  ) {}

  async getAllProducts():Promise<productEntity[]> {
    return await this.productRepo.find();
  }

  async getFilteredProduct(filterDto:FilterProductDto):Promise<productEntity[]>{
    const {search,category} = filterDto;    
    let products =await this.productRepo.find({relations:['category']});
    console.log(products.filter(product =>
      product.productname.includes(search)||
      product.description.includes(search)
      ));
    
    let product:productEntity[];
    if(search){
      product = products.filter((product) =>
        product.productname.includes(search)||
        product.description.includes(search)
        )
      }
      if(category){
       product = products.filter(
          product => product.category.name == category
        )
      }

      return product;
  }

  async create(createDto:CreateProductDto):Promise<productEntity>{
    const findCategory = await this.categoryRepo.findOne({
      where:{id:createDto.category_id}
    })
    if(!findCategory){
      throw new NotFoundException('catgory not found')
    }
    const product = new productEntity();
    product.productname = createDto.productname;
    product.brandname = createDto.brandname;
    product.description = createDto.description;
    product.price = createDto.price;
    product.category = findCategory;

    return await this.productRepo.save(product);

  }

  async getProduct(id:string):Promise<productEntity>{
    return this.productRepo.findOne({
      where:{id:+id},
      relations:{category:true}
    })
  }

  async update(id:string,updateDto:UpdateProductDto){
    const product = await this.productRepo.findOne({
      where:{id:+id}
    })
    if(!product){
      throw new BadRequestException("No such product");
    }

    const findCategory = await this.categoryRepo.findOne({
      where:{id:updateDto.category_id}
    })
    if(updateDto.brandname){
      product.brandname = updateDto.brandname;
  }
  if(updateDto.productname){
    product.productname = updateDto.productname;
  }
  if(updateDto.description){
    product.description = updateDto.description;
  }
  if(updateDto.category_id){
    product.category = findCategory;
  }
  if(updateDto.price){
    product.price = updateDto.price;
  }
  return await this.productRepo.save(product);
  }
  
  async remove(id:string){
    const product =await this.productRepo.findOne({
      where:{id:+id}
    })
    if(!product){
      throw new NotFoundException("no product is found")
    }
    return this.productRepo.delete(+id);
  }

}
