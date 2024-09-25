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