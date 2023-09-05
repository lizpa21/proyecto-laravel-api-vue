<template>
    <h1>Ingresar: {{ titulo }}</h1>
    <p>{{ descripcion }}</p>
    {{ token }}

    <pre>{{ datos }}</pre>
    
    <hr>
    <label for="e">Ingrese su Correo:</label>
    <input type="email" id="e" v-model="datos.email">
    <br />

    <label for="c">Ingrese su Contraseña:</label>
    <input type="password" id="c" v-model="datos.password">
    <br />
    <input type="button" value="Ingresar" v-on:click="funIngresar" />
</template>

<script setup>
    import { ref } from "vue"
    import * as authService from "../../services/auth.service"
        // variables
        const titulo = ref("Otro titulo 2");
        const descripcion = "Otra descripción 2";
        const token = ref({})
        const datos = ref({email: "micorreo@mail.com", password: "mipass"})
        // metodos
        async function funIngresar(){
            // alert("Ingresando... 2")
            const {data} = await authService.login(datos.value)
            console.log(data)
            token.value = data
            localStorage.setItem("access_token", data.acces_token)
        }
</script>


<!--
<script>
// opciones API de Vue (1 y 2)
export default {
    data(){
        return {
            titulo: "Login",
            descripcion: "este es un componente de Login"
        }
    },
    mounted(){

    },
    methods: {
        function funIngresar(){
            alert("Ingresando...")
        }
    }
}
</script>
-->

<!--
<script>
export default {
    setup() {
        // variables
        const titulo = "Otro titulo";
        const descripcion = "Otra descripción";
        // metodos
        function funIngresar(){
            alert("Ingresando...")
        }
        
        return {
            titulo, descripcion, funIngresar
        }        
    },
}
</script>
-->