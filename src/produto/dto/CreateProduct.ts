import { ArrayMinSize, IsArray, IsDecimal, IsEmail, IsNotEmpty, IsNumber, IsPositive, IsUUID, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { CaracteristicaProdutoDTO } from "./CaracteristicaProduto.dto";
import { ImageProductDTO } from "./ImageProduct";
import { Type } from "class-transformer";

export class CreateProductDTO {
    @IsUUID(undefined, { message: 'ID de usuário inválido' })
    userId: string;

    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    name: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1, { message: 'O valor precisa ser maior que zero' })
    price: string;

    @IsNumber()
    @Min(0, { message: 'Quantidade mínima inválida' })
    quantity: number;

    @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
    @MaxLength(1000, {
        message: 'Descrição não pode ter mais que 1000 caracteres',
    })
    description: string;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(3)
    @Type(() => CaracteristicaProdutoDTO)
    characteristics: CaracteristicaProdutoDTO[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImageProductDTO)
    images: ImageProductDTO[];

    @IsNotEmpty({ message: 'A categoria não pode ser vazia' })
    category: string;
}