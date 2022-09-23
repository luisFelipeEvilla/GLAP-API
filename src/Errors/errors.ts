export class ResourceAlreadyExistsError extends Error {
    constructor (message: string) { 
        super(message);
    }
};

export class ResourceNotFoundError extends Error {
    constructor (message: string) {
        super(message);
    }
}