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
    
    if (!audio || !btn) return;

    if (audio.paused) {
        audio.play().catch(e => console.error("Audio playback failed:", e));
        btn.innerHTML = "Pause Memory";
        
        // Lirik utama ngetik dengan kecepatan 120ms (lebih dramatis/pelan)
        typeWriter(lyricsText, "lyrics-text", 120); 
    } else {
        audio.pause();
        btn.innerHTML = "Play Memory";
        // Lirik dibersihkan saat lagu dipause
        lyricsEl.innerHTML = "";
    }
}

function toggleLetter() {
    const modal = document.getElementById('letter-modal');
    if (!modal) return;
    
    modal.classList.toggle('hidden');
    
    // Ketik surat hanya saat modal dibuka
    if (!modal.classList.contains('hidden')) {
        typeWriter(letterContent, "letter-text", 30);
    }
}

// Event listener untuk rahasia
const secretBtn = document.getElementById('secret-btn');
if (secretBtn) {
    secretBtn.addEventListener('click', () => {
        const egg = document.getElementById('easter-egg');
        if (egg) egg.classList.remove('hidden');
    });
}

// Jalankan saat halaman siap
window.onload = () => {
    // Judul utama jalan duluan
    typeWriter(mainText, "typing-text", 40);
};
