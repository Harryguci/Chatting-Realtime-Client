export default interface IMessage {
    _id: string,
    username: string,
    time: Date | undefined,
    isSelf: boolean,
    content: string
}