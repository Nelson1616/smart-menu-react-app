import Product from './product';

export default class Restaurant {
    id: number;
    name: string;
    description: string;
    image: string;
    statusId: number;
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    createdAt: string;
    updatedAt: string;
    json: any;
    products : Product[] = [];

    constructor(id: number, name: string, description: string, image: string, statusId: number, primaryColor: string,
        secondaryColor: string, tertiaryColor: string, createdAt: string, updatedAt: string, json: any) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.statusId = statusId;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.tertiaryColor = tertiaryColor;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.json = json;

        if (json.products && Array.isArray(json.products)) {
            json.products.forEach((product: any) => {
                this.products.push(Product.parseJson(product));
            });
        }
    }

    public static parseJson(json: any): Restaurant {
        if (json.id == null) {
            throw new Error('id is required');
        }
        const id: number = json.id;

        if (json.name == null) {
            throw new Error('name is required');
        }
        const name: string = json.name;

        if (json.description == null) {
            throw new Error('description is required');
        }
        const description: string = json.description;

        if (json.image == null) {
            throw new Error('image is required');
        }
        const image: string = json.image;

        if (json.status_id == null) {
            throw new Error('status_id is required');
        }
        const statusId: number = json.status_id;

        if (json.primary_color == null) {
            throw new Error('primary_color is required');
        }
        const primaryColor: string = json.primary_color;

        if (json.secondary_color == null) {
            throw new Error('secondary_color is required');
        }
        const secondaryColor: string = json.secondary_color;

        if (json.tertiaty_color == null) {
            throw new Error('tertiaty_color is required');
        }
        const tertiatyColor: string = json.tertiaty_color;

        if (json.created_at == null) {
            throw new Error('created_at is required');
        }
        const createdAt: string = json.created_at;

        if (json.updated_at == null) {
            throw new Error('updated_at is required');
        }
        const updatedAt: string = json.updated_at;

        return new Restaurant(id, name, description, image, statusId, primaryColor, secondaryColor, tertiatyColor, createdAt, updatedAt, json);
    }
}