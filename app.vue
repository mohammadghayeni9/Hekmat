<script setup>
useHead({
    htmlAttrs: { dir: 'rtl', lang: 'fa' },
})
const layout = "dua";
</script>

<template>
	<NuxtLayout :name="layout">
		<NuxtPage />
	</NuxtLayout>
</template>

<style lang="scss">

</style>
