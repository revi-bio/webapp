export interface User{
    jwt: string,
    data?:{
        id: string,
        profilePic: string,
        displayName: string,
        email:string
    }
}