const mainText = "Sometimes, memories are mirrors. One reflects the past, the other shows who you're becoming.";
const letterContent = "This journey wasn't about the destination, but the echoes we left behind. Everything has its own timing. Stay brave.";

function typeWriter(text, id, speed, callback) {
    let i = 0;
    const element = document.getElementById(id);
    if (!element) return; // Mencegah error kalau elemen tidak ketemu
    element.innerHTML = "";
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else if (callback) callback();
    }
    typing();
}

function toggleAudio() {
    const audio = document.getElementById('audio');
    const btn = document.getElementById('play-btn');
    
    // Cek apakah audio benar-benar load
    if (audio.paused) {
        audio.play().catch(e => console.log("Audio play blocked:", e));
        btn.innerHTML = "Pause Memory";
    } else {
        audio.pause();
        btn.innerHTML = "Play Memory";
    }
}

function toggleLetter() {
    const modal = document.getElementById('letter-modal');
    modal.classList.toggle('hidden');
    
    // Tambahkan pengecekan agar efek ketik cuma jalan kalau modal dibuka
    if (!modal.classList.contains('hidden')) {
        typeWriter(letterContent, "letter-text", 30);
    }
}

document.getElementById('secret-btn').addEventListener('click', () => {
    const egg = document.getElementById('easter-egg');
    if(egg) egg.classList.remove('hidden');
});

// Jalankan saat load
window.onload = () => {
    typeWriter(mainText, "typing-text", 40);
};
