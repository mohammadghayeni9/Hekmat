<script setup>

</script>

<template>
    <div class="home">
        <NuxtLink class="home--item" to="/sahife-sajjadieh">صحیفه سجادیه</NuxtLink>
        <NuxtLink class="home--item" to="/sahife-sajjadieh">نهج البلاغه</NuxtLink>
    </div>
</template>

<style scoped lang='scss'>
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    &--item {
        border-radius: 15px;
        padding: 20px 24px;
        text-align: center;
        text-decoration: none;
        background-color: var(--color-secondary);
    }
}
</style>