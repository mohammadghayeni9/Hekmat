import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
    state: () => ({
        selectedElement: null,
        currentIndex: 0,
        isPlaying: false,
        audio: null,
        selectedLanguage: 1,
        selectedSpeed: 1,
        base64AudioFiles: null,
        audioFiles: null,

    }),
    getters: {

    },
    actions: {
        // const importAudioFilesAsync = async () => {
        //     const response = await useFetch("/api/sahifeh");
        //     console.log(response.data.value);
        //     for (let index = 0; index < response?.data?.value?.length; index++) {
        //         /* @vite-ignore */
        //         let audio = response.data.value[index].filePath;
        //         audioFiles.value.push(audio);
        
        //         try {
        //             // با استفاده از useFetch فایل را دانلود کنید
        //             const { data, error: fetchError } = await useFetch(response.data.value[index].filePath, {
        //                 method: "GET",
        //                 // اینجا می‌توانید هدرهای خاص را اضافه کنید
        //             });
        
        //             if (fetchError.value) {
        //                 throw new Error(fetchError.value.message);
        //             }
        
        //             // تبدیل داده به Blob
        //             const blob = new Blob([data.value], { type: "audio/mp3" });
        
        //             // تبدیل Blob به Base64
        //             const reader = new FileReader();
        //             reader.onloadend = () => {
        //                 const base64data = reader.result;
        //                 // ذخیره در Local Storage
        //                 base64AudioFiles.value[response.data.value[index].trackNumber - 1] = base64data;
        //             };
        //             reader.onerror = () => {
        //                 throw new Error("خطا در خواندن فایل");
        //             };
        
        //             reader.readAsDataURL(blob);
        //         } catch (err) {
        //             console.log(err.message);
        //         }
        //     }
        
        //     console.log(audioFiles.value);
        
        //     // audioFiles.value.splice(0);
        //     // for (let index = 1; index <= audioFilesCount.value; index++) {
        //     // 	/* @vite-ignore */
        //     // 	let audio = baseDirectory.value + folder.value + index + ".mp3";
        //     // 	audioFiles.value.push(audio);
        //     // }
        // };
        
        // const currentAudio = computed(() => base64AudioFiles.value[currentIndex.value]);
        play () {
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
        },
        pause () {
            audio.value.pause();
            isPlaying.value = false;
        },
        onEnded () {
            this.next();
        },
        next () {
            if (currentIndex.value < audioFiles.value.length - 1) {
                currentIndex.value++;
                play();
            } else {
                currentIndex.value = 0;
                isPlaying.value = false;
            }
        },
        prev () {
            if (currentIndex.value > 0) {
                currentIndex.value--;
                this.play();
            }
        },
        changePlaybackRate () {
            this.audio.value.playbackRate = selectedSpeed.value;
        },
    }
});
