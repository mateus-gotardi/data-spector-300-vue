<template>
    <div class="custom-container">
        <!-- Slot padrão para aceitar qualquer conteúdo filho -->
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'CustomContainer',
}
</script>

<style scoped>
.custom-container {
    background-color: #ffffff;
    width: 100%;
    max-width: 1250px;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
}
</style>