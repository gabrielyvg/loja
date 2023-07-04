import { Injectable } from "@nestjs/common";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductRepository {
    private products = [];

    async save(product) {
        this.products.push(product);
        return product;
    }

    async list() {
        return this.products;
    }

    async update(id, newValues: Partial<ProductEntity>) {
        const product = this.searchId(id);

        Object.entries(newValues).forEach(([key, value]) => {
            if (key === 'id') {
                return;
            }

            product[key] = value;
        });

        return product;
    }

    async remove(id: string) {
        const product = this.searchId(id);

        this.products = this.products.filter(
            productSaved => productSaved.id !== id
        )
    }

    private searchId(id: string) {
        const possibleProduct = this.products.find(
            productSaved => productSaved.id === id
        );

        if (!possibleProduct) {
            throw new Error("Produto não existe");
        }

        return possibleProduct;
    }
}