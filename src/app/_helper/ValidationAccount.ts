export default class AccountValid {
    Ok: boolean;                // the status of the returned response
    inCorrectProps: string[];   // the array of the incorrect props in the format

    constructor(Ok: boolean, inCorrectProps: string[]) {
        this.Ok = Ok;
        this.inCorrectProps = inCorrectProps;
    }

    // the default Success response
    static SuccessResponse: AccountValid = {
        Ok: true,
        inCorrectProps: []
    }

    // the default Bad response
    static BadResponse = (nameProp: string | string[]): AccountValid => {
        var inCorrects: string[] = [];

        if (typeof nameProp === typeof (""))
            inCorrects.push(nameProp.toString())
        else
            inCorrects = [...Array.from(nameProp)]

        return {
            Ok: false,
            inCorrectProps: inCorrects
        }
    }

    // the Sub-valid function to valid the email
    static validateEmail = (email: string): boolean => {
        return Boolean(String(email).toLowerCase().match(
            /^\S+@\S+\.\S+$/
        ));
    };

    static ValidationAccount = ({ username, password, email, repassword }
        : { username: string, password: string, email?: string | undefined, repassword?: string | undefined }): AccountValid => {
        if (!/^[a-zA-Z]+[a-zA-Z_0-9]{2,}$/.test(username)) return AccountValid.BadResponse('username');
        if (!/^[a-zA-Z_0-9]{3,}$/.test(password)) return AccountValid.BadResponse('password');
        if (repassword && password !== repassword) return AccountValid.BadResponse('repassword');
        if (email && this.validateEmail(email)) return AccountValid.BadResponse('email');

        return AccountValid.SuccessResponse;
    }

}
