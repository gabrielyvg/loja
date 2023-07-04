import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { UpdateUserDTO } from "src/usuario/dto/UpdateUser.dto";
import { UpdateProductDTO } from "./dto/UpdateProduct.dto";

@Controller('/products')
export class ProductController {
    constructor(private productRepository: ProductRepository) { }

    @Post()
    async createProduct(@Body() product) {
        return this.productRepository.save(product);
    }

    @Get()
    async listProduct() {
       return this.productRepository.list();
    }

    @Put('/:id')
    async updateProduct(@Param('id') id: string, @Body() newValues: UpdateProductDTO) {
        const newProduct = await this.productRepository.update(id, newValues);

        return {
            product: newProduct,
            message: "Produto atualizado com sucesso"
        }
    }

    @Delete('/:id')
    async removeProduct(@Param('id') id: string) {
        const productRemoved = await this.productRepository.remove(id);

        return {
            product: productRemoved,
            message: 'Produto removido com sucesso'
        }
    }
}