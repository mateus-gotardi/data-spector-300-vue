<template>
    <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true" action="http://localhost:5000/upload"
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
const handleChange = info => {
    const status = info.file.status;
    if (status !== 'uploading') {
        console.log('file upload ' + status);
    }
    if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        store.addTable({ ...info.file.response, fileName: `${info.file.name}-${Date.now()}` })
    } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
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