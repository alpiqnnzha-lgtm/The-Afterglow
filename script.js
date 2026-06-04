const mainText = "Sometimes, memories are mirrors. One reflects the past, the other shows who you're becoming.";
const letterContent = "This journey wasn't about the destination, but the echoes we left behind. Everything has its own timing. Stay brave.";
const lyricsText = "Someday, I'll see you again. Maybe not in this time, maybe not in this world. But I know that one day, in another place, we'll meet again.";

function typeWriter(text, id, speed, callback) {
    const element = document.getElementById(id);
    if (!element) return;
    
    let i = 0;
    element.innerHTML = "";
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            callback();
        }
    }
    typing();
}

function toggleAudio() {
    const audio = document.getElementById('audio');
    const btn = document.getElementById('play-btn');
    const lyricsEl = document.getElementById('lyrics-text');
    const aboutYouEl = document.querySelector('.sub-lyrics-section'); // Seleksi lirik About You
    
    if (!audio || !btn) return;

    if (audio.paused) {
        audio.play().catch(e => console.error("Audio playback failed:", e));
        btn.innerHTML = "Pause Memory";
        
        // 1. Lirik utama ngetik
        typeWriter(lyricsText, "lyrics-text", 120); 
        
        // 2. Munculkan lirik About You dengan fade-in
        if (aboutYouEl) aboutYouEl.style.opacity = "1";
    } else {
        audio.pause();
        btn.innerHTML = "Play Memory";
        // Reset tampilan
        lyricsEl.innerHTML = "";
        if (aboutYouEl) aboutYouEl.style.opacity = "0";
    }
}

function toggleLetter() {
    const modal = document.getElementById('letter-modal');
    if (!modal) return;
    
    modal.classList.toggle('hidden');
    
    if (!modal.classList.contains('hidden')) {
        typeWriter(letterContent, "letter-text", 30);
    }
}

const secretBtn = document.getElementById('secret-btn');
if (secretBtn) {
    secretBtn.addEventListener('click', () => {
        const egg = document.getElementById('easter-egg');
        if (egg) egg.classList.remove('hidden');
    });
}

window.onload = () => {
    typeWriter(mainText, "typing-text", 40);
};
