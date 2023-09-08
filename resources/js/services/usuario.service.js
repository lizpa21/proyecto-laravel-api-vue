import {http} from "./axios-interceptor";

export default {
    listar(q=""){
        return http().get("/usuario?q="+q);
    },
    guardar(datos){
        return http().post("/usuario", datos);
    },
    mostrar(id){
        return http().get(`/usuario/${id}`);
    },
    modificar(id, datos){
        return http().put(`/usuario/${id}`, datos);
    },
    eliminar(id){
        return http().delete(`/usuario/${id}`);
    },    
}