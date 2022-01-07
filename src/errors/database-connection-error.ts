import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    private reoson: string = 'Error connecting to database!';

    constructor () {
        super('Error connecting to database!');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            { code: this.statusCode, msg: this.reoson }
        ]
    }
}