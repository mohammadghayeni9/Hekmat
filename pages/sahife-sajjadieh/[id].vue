<script setup>
import DuaMenuPlayer from "~/components/menu/duaMenuPlayer.vue";
import AudioPlayer from "~/components/menu/AudioPlayer.vue";
import sahife_1 from "../assets/text/sahifeh/1/sahife_1.json";
import sahife_translate_1 from "../assets/text/sahifeh/translate/1/sahife_translate_1.json";

const texts = sahife_1.map((text) => text.text);
const translateTexts = sahife_translate_1.map((text) => text.text);

const audioFilesCountComputed = computed(() => texts?.length)

const select = (id) => {
	const element = document.getElementById(id);
    console.log(element)
	window.scrollTo(0, element.offsetTop - 90);
};
</script>

<template>
	<div class="sahife-sajjadieh-dua">
		<header class="sahife-sajjadieh-dua__header">دعای اول</header>
		<div
			class="sahife-sajjadieh-dua__text-wrapper"
			v-for="(text, index) in texts"
			:id="index"
		>
			<div class="sahife-sajjadieh-dua__text-wrapper__main-text">{{ text }}</div>
			<div class="sahife-sajjadieh-dua__text-wrapper__divider"></div>
			<div class="sahife-sajjadieh-dua__text-wrapper__translate-text">{{ translateTexts[index] }}</div>
		</div>
	</div>
	<AudioPlayer baseDirectory="https://hekmat.aghasizadehrc.ir/musics/sahifeh/" :audioFilesCount="audioFilesCountComputed" />
</template>

<style scoped lang="scss">
.sahife-sajjadieh-dua {
	font-family: arabic-nabi;
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin: 40px auto;
    align-items: center;

	&__header {
		position: fixed;
		top: 10px;
		left: 0;
		right: 0;
		margin: auto;
		background-color: var(--color-secondary-75);
		width: 100%;
		padding: 18px;
		text-align: center;
		max-width: 420px;
        border-radius: 15px;
        font-size: 1rem;
		backdrop-filter: blur(10px);
		font-family: iranSans;
	}

	&__text-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
        cursor: pointer;
        background-color: var(--color-primary-25);
        padding: 12px;
        border-radius: 15px;
        font-size: 1.1rem;
        transition: all ease 0.4s;
		line-height: 2.5;
		gap: 15px;

		&.selected {
			background-color: var(--color-primary-75);
		}

		&__main-text {

		}

		&__divider {
			padding: 0 20px;
			height: 2px;
			background-color: var(--color-primary);
		}

		&__translate-text {
			font-family: iranSans;
		}

        &:hover {
            background-color: var(--color-primary-75);
        }
	}
}
</style>
