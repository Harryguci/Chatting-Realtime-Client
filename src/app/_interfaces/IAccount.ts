interface IAccount {
    username: string,
    roles: string,
    email: string | undefined
}

export const EmptyAccount: IAccount = {
    username: '',
    roles: '',
    email: '',
}

export default IAccount
