export interface IDepartment {
    department: string;
    group: string;
    team: string;
}
export interface ICompany {
    name: string;
}
export interface IUser {
    avatar?: string;
    username: string;
    first_name: string;
    last_name: string;
    phone?: string;
    password?: string;
    primary_email: string;
    secondary_email: string;
    language?: string;
    company: ICompany;
    department: IDepartment;
}

export interface IMailbox {
    name: string;
    description: string;
    unreadMails: string;
}

export interface IBasicInfoForm {
    firstName: string;
    lastName: string;
    company: string;
    department: string;
    group: string;
    team: string;
}

export interface IAccountInfoForm {
    username: string;
    password: string;
    primaryEmail: string;
}

export interface IEmailInfoForm {
    email: string;
}

export interface ISignUpFormInputData {
    basicInfo: IBasicInfoForm;
    accountInfo: IAccountInfoForm;
    emailInfo: IEmailInfoForm;
}

export type SignUpFormSection = "basicInfo" | "accountInfo" | "emailInfo"

// ==============================
// API Response type
// ==============================
export type APIStatus = "success" | "error"
export interface IAPIResponseData {
    status: APIStatus;
    message: string;
    detail: object;
}

export interface IPinCodeGenerateResponseData extends IAPIResponseData {
    detail: {
        email?: string;
        pin_code?: string;
        remaining?: string;
    }
}

export interface ISignupResponseData extends IAPIResponseData {
    detail: {
        first_name?:string;
        last_name?: string;
        username?: string;
        password?: string;
        primary_email?: string;
        secondary_email?: string;
    }
}

// export interface ISignUpFormData {
//     firstName: string;
//     lastName: string;
//     company : {
//         name: string;
//     }
//     department: {
//         department: string;
//         group: string;
//         team: string;
//     }
//     username: string;
//     password: string;
//     primaryEmail: string;
//     secondaryEmail: string;
// }
export type CheckExistenceFunc = (target: object) => Promise<IAPIResponseData>
export type PinCodeGenerateFunc = (email: string)  => Promise<IPinCodeGenerateResponseData>
export type PinCodeCheckFunc = (username: string, email: string) => Promise<IAPIResponseData>
export type LoginFunc = (username: string, password: string) => Promise<IAPIResponseData>
export type SignUpFunc = (signUpFormData: ISignUpFormData) => Promise<ISignupResponseData>