<script setup>

</script>

<template>
    <div class="dua">
        <slot class="dua__content" />
    </div>
</template>

<style scoped lang='scss'>
.dua {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 50px 8px;
    margin: auto;
    max-width: 420px;
}
</style>