<script setup>
import { ref, computed } from "vue";
const props = defineProps({
	audioFilesPath: {
		type: Array,
		Required: true,
	},
	audioTranslateFilesPath: {
		type: Array,
		Required: true,
	},
});

const { audioFilesPath, audioTranslateFilesPath } = toRefs(props);

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
const speedItems = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const selectedSpeed = ref(1);
let audioFiles = ref([]);
const base64AudioFiles = ref([]);

const downloadAudioFilesAsync = async (language) => {
	let audioFilesPathTemp;
	if (language == 1) {
		audioFilesPathTemp = audioFilesPath.value;
		console.log(1)
	} else {
		audioFilesPathTemp = audioTranslateFilesPath.value;
		console.log(2)
	}
	
	for (let index = 0; index < audioFilesPathTemp?.length; index++) {
		/* @vite-ignore */
		let audio = audioFilesPathTemp[index];
		audioFiles.value.push(audio);

		try {
			console.log(audioFilesPathTemp[index])
			const { data, error: fetchError } = await useFetch(audioFilesPathTemp[index], {
				method: "GET",
			});

			if (fetchError.value) {
				throw new Error(fetchError.value.message);
			}
			const blob = new Blob([data.value], { type: "audio/mp3" });

			const reader = new FileReader();
			reader.onloadend = () => {
				const base64data = reader.result;
				base64AudioFiles.value[index] = base64data;
			};
			reader.onerror = () => {
				throw new Error("خطا در خواندن فایل");
			};

			reader.readAsDataURL(blob);
		} catch (err) {
			console.log(err.message);
		}
	}
};

const currentIndex = ref(0);
const isPlaying = ref(false);
const audio = ref(null);

const currentAudio = computed(() => base64AudioFiles.value[currentIndex.value]);
let selectedElement = ref(null);
const play = () => {
	if (selectedElement.value) {
		selectedElement.value.classList.remove("selected");
	}
	audio.value.src = currentAudio.value;
	audio.value.load();
	audio.value.playbackRate = selectedSpeed.value;
	selectedElement.value = document.getElementById(currentIndex.value);
	selectedElement.value.classList.add("selected");
	window.scrollTo(0, selectedElement.value.offsetTop - 90);
	audio.value.play();
	isPlaying.value = true;
};

const pause = () => {
	audio.value.pause();
	isPlaying.value = false;
};

const onEnded = () => {
	next();
};

const next = () => {
	if (currentIndex.value < audioFiles.value.length - 1) {
		currentIndex.value++;
		play();
	} else {
		currentIndex.value = 0;
		isPlaying.value = false;
	}
};

const prev = () => {
	if (currentIndex.value > 0) {
		currentIndex.value--;
		play();
	}
};

const changePlaybackRate = () => {
	audio.value.playbackRate = selectedSpeed.value;
};

onMounted(async () => {
	await downloadAudioFilesAsync(selectedLanguage.value);
});
</script>

<template>
	<div class="audio-player">
		<div class="audio-player__actions">
			<div class="audio-player__actions__controls">
				<UButton
					class="audio-player__actions__controls--small-btn"
					icon="si:play-next-duotone"
					size="sm"
					square
					variant="soft"
					@click="next"
					:disabled="currentIndex === audioFiles.length - 1"
				/>
				<UButton
					class="audio-player__actions__controls--btn"
					icon="si:play-duotone"
					size="sm"
					square
					variant="soft"
					@click="play"
					v-if="!isPlaying"
				/>
				<UButton
					class="audio-player__actions__controls--btn"
					icon="si:pause-duotone"
					size="sm"
					square
					variant="soft"
					@click="pause"
					v-else
				/>
				<UButton
					class="audio-player__actions__controls--small-btn"
					icon="si:play-previous-duotone"
					size="sm"
					square
					variant="soft"
					@click="prev"
					:disabled="currentIndex === 0"
				/>
			</div>
			<USelectMenu
				class="audio-player__actions--language"
				v-model="selectedLanguage"
				:options="languageItmes"
				value-attribute="value"
				option-attribute="text"
				@change="downloadAudioFilesAsync(selectedLanguage)"
				dir="rtl"
			/>
			<USelectMenu
				class="audio-player__actions--speed"
				v-model="selectedSpeed"
				@change="changePlaybackRate"
				:options="speedItems"
			/>
		</div>
		<UProgress
			class="audio-player--progress"
			color="primary"
			:indicator="false"
			:max="audioFilesPath?.length - 1"
			:value="currentIndex"
		/>
		<audio ref="audio" @ended="onEnded"></audio>
	</div>
</template>

<style lang="scss">
.audio-player {
	progress {
		color: var(--color-primary) !important;
		direction: ltr;
	}
}
</style>

<style scoped lang="scss">
.audio-player {
	position: fixed;
	bottom: 10px;
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
		gap: 10px;
		font-family: iranSans;

		&__controls {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 6px;

			&--btn {
				background-color: var(--color-btn-primary);
				color: var(--color-btn-text-primary);
				width: fit-content;
				padding: 10px;
				border-radius: 50%;
			}

			&--small-btn {
				background-color: var(--color-btn-primary);
				color: var(--color-btn-text-primary);
				width: fit-content;
				padding: 5px;
				border-radius: 50%;
			}
		}
	}
}
</style>
