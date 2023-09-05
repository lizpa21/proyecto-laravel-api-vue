<template>
    <h1>Mi Perfil</h1>
    <h2>{{ usuario?.email }}</h2>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as authService from "../../services/auth.service"

const usuario = ref(null);

onMounted(()=> {
    funPerfil()
})

async function funPerfil(){
    const {data} = await authService.obtenerPerfil()
    console.log(data)
    usuario.value = data
}



</script>