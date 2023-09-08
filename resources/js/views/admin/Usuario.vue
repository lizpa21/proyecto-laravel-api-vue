<template>
    <h1>Gestión Usuarios</h1>

    <pre>{{ usuario }}</pre>
    <label for="n">Ingrese Nombre</label>
    <input type="text" v-model="usuario.name">
    {{ errors.name }}
    <br>
    <label for="n">Ingrese Correo</label>
    <input type="email" v-model="usuario.email">
    {{ errors.email }}
    <br>
    <label for="n">Ingrese Contraseña</label>
    <input type="password" v-model="usuario.password">
    {{ errors.password }}
    <br>
    <button @click="guardarUsuario()">Guardar Usuario</button>

<br>
    <input type="text" v-model="buscar" @keyup.enter="buscarUsuarios" placeholder="Buscar...">
    <button @click="buscarUsuarios">buscar</button>
    <table border="1">
        <thead>
            <tr>
                <td>ID</td>
                <td>NOMBRE</td>
                <td>CORREO</td>
                <td>CREADO EN</td>
                <td>GESTION</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="u in usuarios" :key="u.id">
                <td>{{ u.id }}</td>
                <td>{{ u.name }}</td>
                <td>{{ u.email }}</td>
                <td>{{ u.created_at }}</td>
                <td>
                    <button @click="editarUsuario(u)">editar</button>
                    <button @click="eliminarUsuario(u)">eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
    <pre>{{ usuarios }}</pre>
    
</template>

<script setup>
import {ref, onMounted} from "vue";
import usuarioService from "./../../services/usuario.service"

const usuarios = ref([])
const usuario = ref({name: "", email: "", password: ""})
const errors = ref({})
const buscar = ref("")

onMounted(()=> {
    getUsuarios()
})

const getUsuarios = async () => {
    /*
    usuarioService.listar().then(
        (res) => {
            usuarios.value = res.data
        }
    )
    */
    const res = await usuarioService.listar()
    usuarios.value = res.data
}

const guardarUsuario = async () => {
    console.log(usuario.value)
    if(usuario.value.id){
        // editar
        try {
            const res = await usuarioService.modificar(usuario.value.id, usuario.value)
            console.log(res)
            usuario.value = {name: "", email: "", password: ""}
            errors.value = {}
            getUsuarios()
        } catch (error) {
            console.log(error.response.data.errors)
            errors.value = error.response.data.errors
            // alert("Ocurrió un error al regiastrar el usuario")
        }
    }else{
        // guardar
        try {
            const res = await usuarioService.guardar(usuario.value)
            console.log(res)
            usuario.value = {name: "", email: "", password: ""}
            errors.value = {}
            getUsuarios()
        } catch (error) {
            console.log(error.response.data.errors)
            errors.value = error.response.data.errors
            // alert("Ocurrió un error al regiastrar el usuario")
        }
    }
}

const editarUsuario = (us) => {
    usuario.value = us
}

const eliminarUsuario = async(us) => {
    if(confirm("¿esta seguro de eliminar el usuario?")){
        const res = await usuarioService.eliminar(us.id)
        getUsuarios()
    }
}

const buscarUsuarios = async () => {
    const res = await usuarioService.listar(buscar.value)
    usuarios.value = res.data
}

</script>