import { IsString, IsNotEmpty } from "class-validator";

export class CaracteristicaProdutoDTO {
    @IsString()
    @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
    description: string;
}