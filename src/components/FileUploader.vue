<template>
    <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true" :action="uploadUrl"
        @change="handleChange" @drop="handleDrop">
        <p class="ant-upload-drag-icon">

        </p>
        <p class="ant-upload-text upload-txt">Clique ou arraste arquivos para essa area</p>
        <p class="ant-upload-hint upload-txt">
            Suporta upload de um ou mais arquivos
        </p>
    </a-upload-dragger>
</template>
<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { useTableStore } from '@/stores/tables'
const fileList = ref([]);
const store = useTableStore()
const uploadUrl = import.meta.env.VITE_UPLOAD_URL
const handleChange = info => {
    const status = info.file.status;
    if (status !== 'uploading') {
        console.log('file upload ' + status);
    }
    if (status === 'done') {
        message.success(`${info.file.name} enviado com sucesso`);
        store.addTable({ ...info.file.response, fileName: `${info.file.name}-${Date.now()}` })
    } else if (status === 'error') {
        message.error(`falha ao enviar o arquivo.`);
    }
};
function handleDrop(e) {
    console.log(e);
}
</script>
<style scoped>
.upload-txt {
    padding: 0 1rem;
}
</style>