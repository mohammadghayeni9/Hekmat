<script setup>
import { Howl } from "howler";

const props = defineProps({
	baseDirectory: {
		type: String,
		Required: true,
	},
	audioFilesCount: {
		type: Number,
	},
});

const { baseDirectory, audioFilesCount } = toRefs(props);
const toast = useToast();
const route = useRoute();
const folder = computed(() => {
	if (selectedLanguage.value == 1) {
		return route.params.id + '/';
	}
	else {
		return 'translate/' + route.params.id + '/';
	}
})
let audioFiles = [];
const isPlaying = ref(false);
const currentTrack = ref(0);
const sound = ref(null);
const languageItmes = [
	{
		text: "صوت عربی",
		value: 1,
	},
	{
		text: "صوت ترجمه",
		value: 2,
	},
];
const selectedLanguage = ref(1);
const speedItems = [1, 1.2, 1.4, 1.6, 1.8, 2];
const selectedSpeed = ref(1);

const importAudioFilesAsync = async () => {
	audioFiles = [];
	for (let index = 1; index <= audioFilesCount.value; index++) {
		/* @vite-ignore */
		let audio = baseDirectory.value + folder.value + index + ".mp3";
		audioFiles.push(audio);
	}
};

onMounted(async () => {
	await importAudioFilesAsync();
});

const play = () => {
	playTrack(currentTrack.value);
};

const playTrack = (index) => {
	try {
		if (index < audioFiles.length) {
			isPlaying.value = true;
			const element = document.getElementById(currentTrack.value);
			window.scrollTo(0, element.offsetTop - 90);
			sound.value = new Howl({
				src: [audioFiles[index]],
				onend: () => {
					// وقتی یک فایل تمام شد، فایل بعدی را پخش کنید
					currentTrack.value++;
					playTrack(currentTrack.value);
				},
			});
			let id = sound.value.play();
			sound.value.rate(selectedSpeed.value, id);
		} else {
			isPlaying.value = false;
			console.log("All tracks finished.");
		}
	} catch (error) {
		console.log(error);
		toast.add({ title: "مشکلی رخ داده است" });
	}
};

const stop = () => {
	isPlaying.value = false;
	if (sound.value) {
		// sound.value.stop();
		sound.value.pause();
		// currentTrack.value = 0; // بازنشانی شمارنده
	}
};
</script>

<template>
	<div class="dua-menu-player">
		<div class="dua-menu-player__actions">
			<USelectMenu
				v-model="selectedLanguage"
				:options="languageItmes"
				value-attribute="value"
				option-attribute="text"
				@change="importAudioFilesAsync"
			/>
			<UButton
				class="dua-menu-player__actions--btn"
				icon="si:play-duotone"
				size="sm"
				square
				variant="soft"
				@click="play"
				v-if="!isPlaying"
			/>
			<UButton
				class="dua-menu-player__actions--btn"
				icon="si:pause-duotone"
				size="sm"
				square
				variant="soft"
				@click="stop"
				v-else
			/>
			<USelectMenu v-model="selectedSpeed" :options="speedItems" />
		</div>
		<UProgress
			class="dua-menu-player--progress"
			color="primary"
			:indicator="false"
			:max="audioFilesCount"
			:value="currentTrack"
			dir="ltr"
		/>
	</div>
</template>

<style lang="scss">
progress {
	color: var(--color-primary) !important;
}
</style>

<style scoped lang="scss">
.dua-menu-player {
	position: fixed;
	bottom: 15px;
	left: 0;
	right: 0;
	margin: auto;
	width: 100%;
	background-color: var(--color-secondary-75);
	padding: 10px;
	text-align: center;
	max-width: 420px;
	border-radius: 15px;
	font-size: 1.1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	backdrop-filter: blur(10px);
	gap: 5px;

	&__actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		gap: 24px;
		font-family: iranSans;

		&--btn {
			background-color: var(--color-btn-primary);
			color: var(--color-btn-text-primary);
			width: fit-content;
			padding: 10px;
			border-radius: 50%;
			flex-grow: 1;
		}
	}
}
</style>
