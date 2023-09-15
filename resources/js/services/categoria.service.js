import {http} from "./axios-interceptor";

export default {
    listar(q=""){
        return http().get("/categoria?q="+q);
    },
    guardar(datos){
        return http().post("/categoria", datos);
    },
    mostrar(id){
        return http().get(`/categoria/${id}`);
    },
    modificar(id, datos){
        return http().put(`/categoria/${id}`, datos);
    },
    eliminar(id){
        return http().delete(`/categoria/${id}`);
    },    
}
