class CaracteristicaProduto {
    name: string;
    description: string;
}

class ImageProduct {
    url: string;
    description: string;
}

export class ProductEntity {
    id: string;
    userId: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
    characteristics: CaracteristicaProduto[];
    images: ImageProduct[];
}