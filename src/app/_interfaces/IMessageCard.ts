interface IMessageCard {
    content: string,
    user: object | { username: string, lastLogin: string },
    href: string
}

export default IMessageCard;
