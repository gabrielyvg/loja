import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface{

    constructor(private userRespository: UserRepository){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> { 
        const usuarioComEmailExiste = await this.userRespository.existWithEmail(value);
        return !usuarioComEmailExiste;
    }
}

export const EmailIsUnique = (validationOptions: ValidationOptions) => {
    return (object: Object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: EmailIsUniqueValidator
        });
    }
}