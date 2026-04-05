import { ref, watch, onUnmounted, computed, Ref } from "vue";

export interface TextStreamingOptions {
    delayTotal?: number
    delayUnit?: number
    batchBy?: 'character' | 'word'
}

export function useTextStreaming(text: Readonly<Ref<string>>, options: TextStreamingOptions = {}): Ref<string> {
    const displayText = ref<string>('');

    let requestId: number | null = null;
    let lastTimestamp: number = 0;
    let characterIndex: number = 0;

    const delayUnit = computed<number>(() => {
        if(options.delayTotal) {
            const length = text.value.length;

            return length > 0 ? options.delayTotal / length : 0;
        }

        return options.delayUnit ?? 50;
    });

    const byWord = computed<boolean>(() => {
        return options.batchBy === 'word';
    });

    function animate(timestamp: number): void {
        if(lastTimestamp === 0) {
            lastTimestamp = timestamp;
        }

        const characterCount: number = getCharactersToAdd(timestamp);

        if(characterCount > 0) {
            characterIndex = Math.min(characterIndex + characterCount, text.value.length);

            displayText.value = text.value.slice(0, characterIndex);
            lastTimestamp = timestamp;
        }

        if(characterIndex < text.value.length) {
            requestId = requestAnimationFrame(animate);
        }
    }

    function getCharactersToAdd(timestamp: number): number {
        // no delay set, render everything
        if(delayUnit.value <= 0) {
            return text.value.length;
        }

        const elapsed = timestamp - lastTimestamp;

        // render next characters
        if(!byWord.value) {
            return Math.floor(elapsed / delayUnit.value);
        }

        // not enough time passed to render next word
        if(elapsed < delayUnit.value) {
            return 0;
        }

        const spaceIndex = text.value.indexOf(' ', characterIndex);

        // no word boundaries left, render everything
        if(spaceIndex < 0) {
            return text.value.length;
        }

        // render next word
        return spaceIndex - characterIndex + 1;
    }

    function startRender(): void {
        stopRender();

        characterIndex = 0;
        lastTimestamp = 0;
        displayText.value = '';

        requestId = requestAnimationFrame(animate);
    }

    function stopRender(): void {
        if(requestId !== null) {
            cancelAnimationFrame(requestId);
        }
    }

    startRender();
    watch(text, startRender);
    onUnmounted(stopRender);

    return displayText;
}