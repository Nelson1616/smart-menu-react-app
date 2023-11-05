import { io } from 'socket.io-client';
import Api from './http-api';

export const socket = io(Api.url, {
    autoConnect: false,
    reconnection: false,
});