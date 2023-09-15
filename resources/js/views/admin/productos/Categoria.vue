<template>
    <div class="card">
        <h5>Gestión Categorias</h5>

        <Button label="Nueva Categoria" icon="pi pi-external-link" @click="visible = true" />

        <Dialog v-model:visible="visible" modal header="Categoria" :style="{ width: '50vw' }" class="p-fluid">
            
            <div class="field">
                <label for="name">Ingrese nombre</label>
                <InputText id="name" v-model.trim="categoria.nombre" required="true" autofocus :class="{'p-invalid': submitted && !categoria.nombre}" />
                <small class="p-error" v-if="submitted && !categoria.nombre">Nombre es obligatorio.</small>
            </div>
            <div class="field">
                <label for="det">Ingrese Detalle</label>
                <InputText id="det" v-model.trim="categoria.detalle" required="true" autofocus  />
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="ocularDialog"/>
                <Button label="Guardar" icon="pi pi-check" text @click="guardarCategoria" />
            </template>
        </Dialog>

        <DataTable :value="categorias" tableStyle="min-width: 50rem">
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="detalle" header="Detalle"></Column>
            <Column :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editCategoria(slotProps.data)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="canfirmarEliminacionCategoria(slotProps.data)" />
                </template>
            </Column>
        </DataTable>

        {{ categorias }}
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import categoriaService from "./../../../services/categoria.service"

    const categorias = ref([])
    const visible = ref(false);
    const categoria = ref({nombre: "", detalle: ""})
    const submitted = ref(false);

    onMounted(() => {
        listarCategorias();
    })

    const listarCategorias = async () => {
        const datos = await categoriaService.listar()
        categorias.value = datos.data
    }

    const guardarCategoria = async () => {
        if(categoria.value.id){
            const {data} = await categoriaService.modificar(categoria.value.id, categoria.value)
            console.log(data)
        }else{
            const {data} = await categoriaService.guardar(categoria.value)
            console.log(data)

        }
        listarCategorias()
        ocularDialog();
        categoria.value = {nombre: "", detalle: ""}
    }

    const ocularDialog = () => {
        visible.value = false;
        submitted.value = false;
    };

    const editCategoria = (cat) => {
        categoria.value = cat;
        visible.value = true;
    }
    const canfirmarEliminacionCategoria = async(cat) => {
        if(confirm("¿Está seguro de eliminar la categoria?")){
            await categoriaService.eliminar(cat.id);
            listarCategorias()
        }
    }
</script>