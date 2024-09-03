import { Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger('CategoryService')
  constructor(
  @InjectRepository(CategoryEntity) 
  private readonly categoryRepo:Repository<CategoryEntity>){}

  async create(createCategoryDto: CreateCategoryDto):Promise<CategoryEntity>{
    
    const newCategory = new CategoryEntity();
    newCategory.name = createCategoryDto.name;
    return await this.categoryRepo.save(newCategory)
  }

  async findAll() {
    const categories = await this.categoryRepo.findAndCount();
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where:{id:id},
      relations:['product']
    })
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto){ 
    const updated = await this.categoryRepo.update(id,updateCategoryDto);
    return updated;
   }

  async remove(id: number) {
    // const deleted = await this.categoryRepo.delete(id)
    // return delete;
   return  await this.categoryRepo
  .createQueryBuilder('users')
  .softDelete()
  .where("id = :id", { id: id})
  .execute();
  }
}
