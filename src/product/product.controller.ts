import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilterProductDto } from './dtos/filter-product.dto';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(
        private productSevice:ProductService
    ){}
    
    @Get('/filtered')
    async getFiltered(@Query() filterDto:FilterProductDto){
        console.log(filterDto);
        
        console.log(Object.keys(filterDto));
        if(Object.keys(filterDto).length){
            
            const filterProduct = await this.productSevice.getFilteredProduct(filterDto)
            console.log(filterProduct);
            
            return filterProduct;
        }
        else{
            const allproduct = await this.productSevice.getAllProducts();
            return allproduct;
        }
    }

    @Get('/:id')
    async getById(@Param('id') id:string){
        const product = await this.productSevice.getProduct(id);
        return product;
    }

    @Get()
    async getAll(){
        const products = await this.productSevice.getAllProducts();
        return{
            data:products,
            total:products.length
        }
    }

    @ApiBody({type:CreateProductDto})
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(NoFilesInterceptor())
    @Post()
    async create(
        @Body() createProductDto:CreateProductDto,
    ){
        console.log(createProductDto);
        
        const product = await this.productSevice.create(createProductDto);
        return product;
    }

    @ApiBody({type:UpdateProductDto})
    @ApiConsumes('multipart/form-data')
    @Patch('/:id')
    async update(
        @Param('id') id:string,
        @Body() updateDto:UpdateProductDto){
        const product = await this.productSevice.update(id,updateDto);
        return {
            message:'Updated Successfully',
            data:product
        }
    }
    
    @Delete('/:id')
    async remove(@Param('id') id:string){
        const product = await this.productSevice.remove(id);

        return {
            message:'product deleted successfully'
        }
    }
}
