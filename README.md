# WebMusicPlayer

### Latest Version: 1.0.3

Try it here: <a src="<https://mctvr.github.io/WebMusicPlayer/>">https://mctvr.github.io/WebMusicPlayer/</a>

## Play your local audio files with your Browser

1. Click the **+** button to add a new audio file to the player.
    - select the audio file(s)<sup>1</sup> from your computer

2. Click the play button to start playing the audio file<sup>1</sup>.

## Shortcut Keys

`Space/Media Play Pause`: Play/Pause

`Left/Right Arrow Keys`: -5s/+5s

`Media Previous Track Key`: Previous Track

`Media Next Track Key`: Next Track

## Playlist Controls

<div style="display: flex; align-items: center; gap: 5px;">
<img src="static/assets/icons/autoplay.svg" style="width: 20px; padding: 2px; border-radius: 5px; background-color: rgba(255,255,255, .8);"/>
<span style="font-size: 22px;">Autoplay</span>
</div>
<div style="display: flex; align-items: center; gap: 5px;">
<img src="static/assets/icons/shuffle.svg" style="width: 20px; padding: 2px; border-radius: 5px; background-color: rgba(255,255,255, .8);"/>
<span style="font-size: 22px;">Shuffle</span>
</div>
<div style="display: flex; align-items: center; gap: 5px;">
<img src="static/assets/icons/infinite.svg" style="width: 20px; padding: 2px; border-radius: 5px; background-color: rgba(255,255,255, .8);"/>
<span style="font-size: 22px;">Loop Indefinitely</span>
</div>

## Supported Audio Files (Tested<sup>3</sup>, Stereo)

- .mp3
- .mp4 (AAC)
- .wav
- .flac
- .m4a (AAC encoded<sup>2</sup>)

<sup>1</sup> You can select multiple audio files at once.<br>
<sup>2</sup> .m4a with ALAC codec works on macOS Safari only.<br>
<sup>3</sup> Common audio files are playable, check <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Cross-browser_audio_basics#audio_codec_support">Here</a> for more info.<br>

### Welcome to Report Bugs and Request Features by Creating a New Issue in this Repository

## Credits

anime.js <a href="<https://github.com/juliangarnier/anime/>">https://github.com/juliangarnier/anime/</a>

JS MediaTags <a href="<https://github.com/aadsm/jsmediatags>">https://github.com/aadsm/jsmediatags</a>
