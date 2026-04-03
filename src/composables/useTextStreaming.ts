import { computed, onUnmounted, ref, Ref, watch } from "vue";

export interface TextStreamingOptions {
    isTotal?: boolean
    speed?: number
}

export function useTextStreaming(text: Readonly<Ref<string>>, options: TextStreamingOptions = {}): Ref<string> {
    const msPerUnit = computed(() => {
        if(options.isTotal) {
            return (options.speed ?? 2000) / text.value.length;
        }

        return options.speed ?? 50;
    });

    const displayText = ref<string>('');
    const interval = ref<number>();

    startRender();

    watch(text, startRender);

    onUnmounted(stopRender);

    function startRender() {
        stopRender();
        displayText.value = '';
        interval.value = setInterval(renderNext, msPerUnit.value);
    }

    function stopRender() {
        clearInterval(interval.value);
    }

    function renderNext() {
        const length = displayText.value.length;

        if(length >= text.value.length) {
            stopRender();
            return;
        }
        displayText.value += text.value[length];
    }

    return displayText;
}