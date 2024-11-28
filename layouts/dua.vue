<script setup>

</script>

<template>
    <div class="dua">
        <slot class="dua__content" />
        <div class="dua__menu">منوی پخش</div>
    </div>
</template>

<style scoped lang='scss'>
.dua {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 50px 0;
    margin: auto;
    max-width: 420px;

    &__menu {
        position: fixed;
        bottom: 15px;
        left: 0;
        right: 0;
        margin: auto;
        width: 100%;
        background-color: chartreuse;
        padding: 15px 12px;
        text-align: center;
        max-width: 420px;
        border-radius: 15px;
        font-size: 1.1rem;
    }
}
</style>