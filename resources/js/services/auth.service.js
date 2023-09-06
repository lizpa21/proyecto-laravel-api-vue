import {http} from "./axios-interceptor";

export function login(datos) {
    return http().post("/v1/auth/login", datos);
}

export function registro(datos) {
    return http().post("/v1/auth/register", datos);
}

export function obtenerPerfil() {
    return http().get("/v1/auth/profile");
}

export function salir() {
    return http().post("/v1/auth/logout");
}