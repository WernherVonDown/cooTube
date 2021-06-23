import { WebSocketGateway, SubscribeMessage, WebSocketServer, MessageBody, ConnectedSocket, OnGatewayDisconnect } from '@nestjs/websockets'
import { AuthService } from './auth/auth.service';

@WebSocketGateway(1337)
export class AppGateway {
    constructor(private authService: AuthService) { }
    @WebSocketServer()
    server;

    @SubscribeMessage('enterRoom')
    async handleEnterRoom(@ConnectedSocket() client, @MessageBody() data): Promise<void> {
        const { roomId } = data;
        console.log('EEEEEEEEEEEEEE', data)
        const res = await this.authService.validateUserInRoom({ socketId: client.id, ...data })
        if (res.success) {
            client.join(roomId);
            this.server.to(roomId).emit('users', res.users);
        }
        client.emit('enterRoom', res);

    }

    @SubscribeMessage('disconnect')
    async handleDisconnect(@ConnectedSocket() client): Promise<void> {
        console.log('DISCONNECT', client.id)
        const res = await this.authService.handleDisconnect(client.id);
        if (res) {
            const { users, roomId } = res;
            this.server.to(roomId).emit('users', users);
        }
    }
}