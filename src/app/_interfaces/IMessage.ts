export default interface IMessage {
    _id: string,
    username: string,
    createAt: Date | string | undefined,
    isSelf: boolean,
    content: string
}