<template>
    <h1>Mi Perfil</h1>
    <h2>{{ usuario?.email }}</h2>
    <button @click = "funSalir()">Salir</button>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as authService from "../../services/auth.service"

const usuario = ref(null);
const router = useRouter()

onMounted(()=> {
    funPerfil()
})

async function funPerfil(){
    const {data} = await authService.obtenerPerfil()
    //console.log(data)
    usuario.value = data
}

const funSalir = async () => {
    const { data } = await authService.salir();
    localStorage.removeItem("access_token");
    router.push("/login")
}



</script>