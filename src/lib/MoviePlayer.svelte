<script lang="ts">
    export let movieName: string;
    let isVideoLoading = true;
    let videoElement: HTMLVideoElement;

    function handleVideoLoaded() {
        isVideoLoading = false;
    }

    function handleVideoError() {
        isVideoLoading = false;
        console.error("動画の読み込みに失敗しました");
    }

    // 動画の再生状態を管理
    let isPlaying = false;
    let isMuted = true; // デフォルトでミュート

    function togglePlay() {
        if (videoElement) {
            if (isPlaying) {
                videoElement.pause();
            } else {
                videoElement.play();
            }
            isPlaying = !isPlaying;
        }
    }

    function toggleMute() {
        if (videoElement) {
            videoElement.muted = !videoElement.muted;
            isMuted = videoElement.muted;
        }
    }
</script>

<div class="video-container">
    {#if isVideoLoading}
        <div class="skeleton-loader"></div>
    {/if}
    <video
        bind:this={videoElement}
        class="card-movie"
        class:loading={isVideoLoading}
        autoplay
        loop
        muted
        playsinline
        on:loadeddata={handleVideoLoaded}
        on:error={handleVideoError}
    >
        <source src="/VoR/movies/{movieName}.mp4" type="video/mp4" />
    </video>
    <div class="controls" class:hidden={isVideoLoading}>
        <button class="control-button" on:click={togglePlay}>
            {#if isPlaying}
                <span class="icon">⏸</span>
            {:else}
                <span class="icon">▶</span>
            {/if}
        </button>
        <button class="control-button" on:click={toggleMute}>
            {#if isMuted}
                <span class="icon">🔇</span>
            {:else}
                <span class="icon">🔊</span>
            {/if}
        </button>
    </div>
</div>

<style>
    .video-container {
        position: relative;
        width: 100%;
        padding-top: 56.25%; /* 16:9のアスペクト比 */
        margin-bottom: 1rem;
        background-color: #f0f0f0;
        border-radius: 4px;
        overflow: hidden;
    }

    .card-movie {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .card-movie:not(.loading) {
        opacity: 1;
    }

    .skeleton-loader {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
        border-radius: 4px;
    }

    .controls {
        position: absolute;
        bottom: 10px;
        left: 10px;
        display: flex;
        gap: 10px;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
    }

    .video-container:hover .controls {
        opacity: 1;
    }

    .control-button {
        background: rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 4px;
        padding: 5px 10px;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s ease;
    }

    .control-button:hover {
        background: rgba(0, 0, 0, 0.7);
    }

    .icon {
        font-size: 16px;
    }

    .hidden {
        display: none;
    }

    @keyframes loading {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
</style>
