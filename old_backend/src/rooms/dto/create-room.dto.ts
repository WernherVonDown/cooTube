export class CreateRoomDto {
    readonly roomId: string
    readonly roomName?: string
    readonly description?: string
    password?: string
    readonly isPublic: boolean
}