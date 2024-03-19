interface IMessageCard {
    content: string,
    user: object | {
        username: string,
        lastLogin: string,
        lastLoginNumber: number
    },
    href: string
}

export default IMessageCard;
