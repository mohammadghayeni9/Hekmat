<script setup>
import sahife_1 from "../assets/text/sahifeh/1/sahife_1.json";

const texts = sahife_1.map((text) => text.text);

const select = (id) => {
	const element = document.getElementById(id);
    console.log(element)
	window.scrollTo(0, element.offsetTop - 100);
};
</script>

<template>
	<div class="sahife-sajjadieh">
		<header class="sahife-sajjadieh__header">دعای اول</header>
		<div
			class="sahife-sajjadieh__arabi-text"
			v-for="(text, index) in texts"
			:id="index"
			@click="select(index)"
		>
			{{ text }}
		</div>
	</div>
</template>

<style scoped lang="scss">
.sahife-sajjadieh {
	font-family: arabic-nabi;
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin: 50px auto;
    align-items: center;

	&__header {
		position: fixed;
		top: 15px;
		left: 0;
		right: 0;
		margin: auto;
		background-color: chartreuse;
		width: 100%;
		padding: 12px;
		text-align: center;
		max-width: 420px;
        border-radius: 15px;
        font-size: 1rem;
	}

	&__arabi-text {
		display: flex;
		justify-content: flex-start;
        cursor: pointer;
        background-color: rgba(252, 185, 86, 0.13);
        padding: 12px;
        border-radius: 15px;
        font-size: 1.1rem;
        transition: all ease 0.4s;

        &:hover {
            background-color: rgba(252, 185, 86, 0.5);
        }
	}
}
</style>
