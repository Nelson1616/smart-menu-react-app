import User from './user';

export default class SessionUser {
    id: number;
    statusId: number;
    sessionId: number;
    userId: number;
    amountToPay: number;
    createdAt: string;
    updatedAt: string;
    json : any;
    user : User | null = null;

    constructor(id: number, statusId: number, sessionId: number, userId: number, amountTopay: number, createdAt: string, updatedAt: string, json : any) {
        this.id = id;
        this.statusId = statusId;
        this.sessionId = sessionId;
        this.userId = userId;
        this.amountToPay = amountTopay;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.json = json;

        if (json.user) {
            this.user = User.parseJson(json.user);
        }
    }

    public static parseJson(json: any) : SessionUser {
        if (json.id == null) {
            throw new Error('id is required');
        }
        const id : number = json.id;

        if (json.status_id == null) {
            throw new Error('status_id is required');
        }
        const statusId : number = json.status_id;

        if (json.session_id == null) {
            throw new Error('session_id is required');
        }
        const sessionId : number = json.session_id;

        if (json.user_id == null) {
            throw new Error('user_id is required');
        }
        const userId : number = json.user_id;

        if (json.amount_to_pay == null) {
            throw new Error('amount_to_pay is required');
        }
        const amountToPay : number = json.amount_to_pay;

        if (json.created_at == null) {
            throw new Error('created_at is required');
        }
        const createdAt : string = json.created_at;

        if (json.updated_at == null) {
            throw new Error('updated_at is required');
        }
        const updatedAt : string = json.updated_at;

        return new SessionUser(id, statusId, sessionId, userId, amountToPay, createdAt, updatedAt, json);
    }
}