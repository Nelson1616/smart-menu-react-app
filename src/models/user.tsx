export default class User {
    id: number;
    name: string | null;
    email: string | null;
    password: string | null;
    statusId: number;
    imageId: number;
    createdAt: string;
    updatedAt: string;
    json : any;

    constructor(id: number, name : string | null, email : string | null, password : string | null,
        statusId: number, imageid : number, createdAt: string, updatedAt: string, json : any) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.statusId = statusId;
        this.imageId = imageid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.json = json;
    }

    public static parseJson(json: any) : User {
        if (json.id == null) {
            throw new Error('id is required');
        }
        const id : number = json.id;

        const name : string = json.name;
        const email : string = json.email;
        const password : string = json.password;

        if (json.status_id == null) {
            throw new Error('status_id is required');
        }
        const statusId : number = json.status_id;

        if (json.image_id == null) {
            throw new Error('image_id is required');
        }
        const imageId : number = json.image_id;

        if (json.created_at == null) {
            throw new Error('created_at is required');
        }
        const createdAt : string = json.created_at;

        if (json.updated_at == null) {
            throw new Error('updated_at is required');
        }
        const updatedAt : string = json.updated_at;

        return new User(id, name, email, password, statusId, imageId, createdAt, updatedAt, json);
    }
}