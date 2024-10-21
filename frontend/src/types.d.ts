export interface IDepartment {
    department: string;
    group: string;
    team: string;
}
export interface ICompany {
    name: string;
}
export interface IEmailAddresses {
    type: string;
    email: string;
}
export interface IUser {
    avatar: string;
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
    emails: IEmailAddresses[];
    language: string;
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
}

export interface IEmailInfoForm {
    email: string;
}

export interface ISignUpFormData {
    basicInfo: IBasicInfoForm;
    accountInfo: IAccountInfoForm;
    emailInfo: IEmailInfoForm;
}

export type SignUpFormSection = "basicInfo" | "accountInfo" | "emailInfo"

// ==============================
// API Response type
// ==============================
export type APIStatus = "success" | "error"
export interface APIResponseData {
    status: APIStatus;
    message: string;
    detail: object;
}

export interface PinCodeGenerateResponseData extends APIResponseData {
    detail: {
        email?: string;
        pin_code?: string;
        remaining?: string;
    };
}
export type CheckExistenceFunc = (target: object) => Promise<APIResponseData>
export type PinCodeGenerateFunc = (email: string)  => Promise<PinCodeGenerateResponseData>
export type PinCodeCheckFunc = (username: string, email: string) => Promise<APIResponseData>
export type LoginFunc = (username: string, password: string) => Promise<APIResponseData>

