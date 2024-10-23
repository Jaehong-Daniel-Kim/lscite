import {QueryFunctionContext} from "@tanstack/react-query";

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
    occupation: {
        company: string;
        department: string;
        group: string;
        team: string;
    }
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
export interface IOccupationTeam {
    id: number;
    name: string;
}
export interface IOccupationGroup {
    id: number;
    name: string;
    team: IOccupationTeam[];
}

export interface IOccupationDepartment {
    id: number;
    name: string;
    group: IOccupationGroup[];
}

export interface IOccupationCompany {
    id: number;
    name: string;
    department: IOccupationDepartment[];
}

export interface IOccupationTreeResponseData extends IAPIResponseData {
    detail: IOccupationCompany[];
}

export type CheckExistenceFunc = (target: object) => Promise<IAPIResponseData>
export type PinCodeGenerateFunc = (email: string)  => Promise<IPinCodeGenerateResponseData>
export type PinCodeCheckFunc = (username: string, email: string) => Promise<IAPIResponseData>
export type LoginFunc = (username: string, password: string) => Promise<IAPIResponseData>
export type SignUpFunc = (signUpFormData: ISignUpFormData) => Promise<ISignupResponseData>
export type OccupationFunc = ({queryKey}: QueryFunctionContext) => Promise<IOccupationTreeResponseData>