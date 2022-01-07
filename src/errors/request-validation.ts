import { ValidationError } from "express-validator";
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
    statusCode = 400;
    private errors: ValidationError[];
    constructor(errors: ValidationError[]) {
        super('Invalid req!');

        this.errors = errors;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    getErrors() {
        return this.errors;
    }

    setErrors(errors: ValidationError[]) {
        this.errors = errors;
    }

    serializeErrors() {
        return this.errors.map((err) => {
            return {
                msg: err.msg,
                code: this.statusCode
            }
        });
    }
}