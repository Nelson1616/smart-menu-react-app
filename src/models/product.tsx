import Restaurant from './restaurant';

export default class Product {
    id: number;
    name: string;
    description: string;
    price : number;
    image: string;
    statusId: number;
    restaurantId: number;
    createdAt: string;
    updatedAt: string;
    json : any;
    restaurant : Restaurant | null = null;

    constructor(id: number, name: string, description : string, price : number, image : string, statusId: number, restaurantId: number, createdAt: string, updatedAt: string, json : any) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.statusId = statusId;
        this.restaurantId = restaurantId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.json = json;
    }

    public static parseJson(json: any) : Product {
        if (!json.id) {
            throw new Error('id is required');
        }
        const id : number = json.id;

        if (!json.name) {
            throw new Error('name is required');
        }
        const name: string = json.name;

        if (!json.description) {
            throw new Error('description is required');
        }
        const description: string = json.description;

        if (!json.price) {
            throw new Error('price is required');
        }
        const price : number = json.price;

        if (!json.image) {
            throw new Error('image is required');
        }
        const image: string = json.image;

        if (!json.status_id) {
            throw new Error('status_id is required');
        }
        const statusId : number = json.status_id;

        if (!json.restaurant_id) {
            throw new Error('restaurant_id is required');
        }
        const restaurantId : number = json.restaurant_id;

        if (!json.created_at) {
            throw new Error('created_at is required');
        }
        const createdAt : string = json.created_at;

        if (!json.updated_at) {
            throw new Error('updated_at is required');
        }
        const updatedAt : string = json.updated_at;

        return new Product(id, name, description, price, image, statusId, restaurantId, createdAt, updatedAt, json);
    }
}