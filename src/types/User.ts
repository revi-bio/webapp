export interface User{
    jwt: string,
    data?:{
        id: string,
        avatar: string,
        displayName: string,
        email:string
    }
}