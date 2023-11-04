import Restaurant from './restaurant';

export default class Table {
    id: number;
    statusId: number;
    restaurantId: number;
    enterCode: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    json : any;
    restaurant : Restaurant | null = null;

    constructor(id: number, statusId: number, restaurantId: number, enterCode: string, number: number, createdAt: string, updatedAt: string, json : any) {
        this.id = id;
        this.statusId = statusId;
        this.restaurantId = restaurantId;
        this.enterCode = enterCode;
        this.number = number;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.json = json;

        if (json.restaurant) {
            this.restaurant = Restaurant.parseJson(json.restaurant);
        }
    }

    public static parseJson(json: any) : Table {
        if (!json.id) {
            throw new Error('id is required');
        }
        const id : number = json.id;

        if (!json.status_id) {
            throw new Error('status_id is required');
        }
        const statusId : number = json.status_id;

        if (!json.restaurant_id) {
            throw new Error('restaurant_id is required');
        }
        const restaurantId : number = json.restaurant_id;

        if (!json.enter_code) {
            throw new Error('enter_code is required');
        }
        const enterCode : string = json.enter_code;

        if (!json.number) {
            throw new Error('number is required');
        }
        const number : number = json.number;

        if (!json.created_at) {
            throw new Error('created_at is required');
        }
        const createdAt : string = json.created_at;

        if (!json.updated_at) {
            throw new Error('updated_at is required');
        }
        const updatedAt : string = json.updated_at;

        return new Table(id, statusId, restaurantId, enterCode, number, createdAt, updatedAt, json);
    }
}