import { IsUrl, IsString, IsNotEmpty } from "class-validator";

export class ImageProductDTO {
    @IsUrl(undefined, { message: 'URL para imagem inválida' })
    url: string;

    @IsString()
    @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
    description: string;
}