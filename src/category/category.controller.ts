import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseIntPipe, Logger } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  private readonly loggger = new Logger()
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(NoFilesInterceptor())
  @ApiBody({type:CreateCategoryDto})
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto);
    
    const category =  await this.categoryService.create(createCategoryDto);
    return {
      message:'Category added successfully',
      data:category
    }
  }

  @Get()
  async findAll() {
    const [categories , count]=await this.categoryService.findAll();
    return {
      data:categories,
      total:count
    }
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
    this.loggger.log("getting the category of product")
    return await this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({type:UpdateCategoryDto})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(NoFilesInterceptor())
  async update(@Param('id') id: string, 
  @Body() updateCategoryDto: UpdateCategoryDto) {
   const updated = await this.categoryService.update(+id, updateCategoryDto);
   return {
    message:"updated data"
   }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.categoryService.remove(+id);
    console.log(deleted);
    
    return {
      message:'deleted successfully'
    }
  }
}
