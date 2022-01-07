import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Route not found');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ msg: 'Not Found!', code: this.statusCode }]
    }
}