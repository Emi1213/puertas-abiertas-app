export interface ILogin {
    usuario: string
    contrasenia: string
}

export interface ILoginResponse {
    token: string,
    expiracion: string
}