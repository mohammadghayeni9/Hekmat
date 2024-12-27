<script setup>
import { ref, computed } from "vue";
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
		return route.params.id + "/";
	} else {
		return "translate/" + route.params.id + "/";
	}
});
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

const importAudioFilesAsync = async () => {
	audioFiles.value.splice(0);
	for (let index = 1; index <= audioFilesCount.value; index++) {
		/* @vite-ignore */
		let audio = baseDirectory.value + folder.value + index + ".mp3";
		audioFiles.value.push(audio);
	}
};

let audioFiles = ref([]);

const currentIndex = ref(0);
const isPlaying = ref(false);
const audio = ref(null);

const currentAudio = computed(() => audioFiles.value[currentIndex.value]);
let selectedElement = ref(null);
const play = () => {
	if (selectedElement.value) {
		selectedElement.value.classList.remove("selected");
	}
	audio.value.src = currentAudio.value;
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
	await importAudioFilesAsync();
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
					@click="prev"
					:disabled="currentIndex === 0"
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
					@click="next"
					:disabled="currentIndex === audioFiles.length - 1"
				/>
			</div>
            <USelectMenu
                class="audio-player__actions--language"
				v-model="selectedLanguage"
				:options="languageItmes"
				value-attribute="value"
				option-attribute="text"
				@change="importAudioFilesAsync"
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
			:max="audioFilesCount"
			:value="currentIndex"
			dir="ltr"
		/>
		<audio ref="audio" @ended="onEnded"></audio>
	</div>
</template>

<style lang="scss">
progress {
	color: var(--color-primary) !important;
}
</style>

<style scoped lang="scss">
.audio-player {
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
		gap: 10px;
		font-family: iranSans;

        &--language {
            max-width: 200px;
        }

        &--speed {
            width: 80px;
        }

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
