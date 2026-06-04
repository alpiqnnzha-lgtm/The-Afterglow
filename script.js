const mainText = "Sometimes, memories are mirrors. One reflects the past, the other shows who you're becoming.";
const letterContent = "This journey wasn't about the destination, but the echoes we left behind. Everything has its own timing. Stay brave.";
const lyricsText = "Someday, I'll see you again. Maybe not in this time, maybe not in this world. But I know that one day, in another place, we'll meet again.";

// ── Typewriter ──
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

// ── Lyric lines fade-in per baris ──
// 3 baris, total ~17 detik → tiap baris muncul tiap ~5500ms
let lyricTimer = null;

function showLyricLines() {
    const lines = document.querySelectorAll('.lyric-line');
    lines.forEach(l => l.classList.remove('visible'));

    let idx = 0;
    function next() {
        if (idx >= lines.length) return;
        lines[idx].classList.add('visible');
        idx++;
        lyricTimer = setTimeout(next, 5500); // ~5.5 detik per baris → 3 baris = ~16.5 detik
    }
    // mulai setelah lirik utama selesai ngetik
    lyricTimer = setTimeout(next, lyricsText.length * 120 + 400);
}

function hideLyricLines() {
    if (lyricTimer) clearTimeout(lyricTimer);
    document.querySelectorAll('.lyric-line').forEach(l => l.classList.remove('visible'));
}

// ── Toggle Audio (1 tombol, 2 audio jalan bersamaan) ──
function toggleAudio() {
    const audio = document.getElementById('audio');
    const backsound = document.getElementById('backsound');
    const btn = document.getElementById('play-btn');
    const subLyrics = document.getElementById('about-you-section');
    const lyricsEl = document.getElementById('lyrics-text');

    if (!audio || !btn) return;

    if (audio.paused) {
        audio.play().catch(e => console.error("Audio error:", e));
        if (backsound) backsound.play().catch(e => console.error("Backsound error:", e));

        btn.textContent = "Pause Memory";

        // Lirik utama typewriter
        typeWriter(lyricsText, "lyrics-text", 120);

        // About You fade-in per baris
        if (subLyrics) subLyrics.classList.add('show');
        showLyricLines();

    } else {
        audio.pause();
        if (backsound) backsound.pause();

        btn.textContent = "Play Memory";

        if (lyricsEl) lyricsEl.innerHTML = "";
        if (subLyrics) subLyrics.classList.remove('show');
        hideLyricLines();
    }
}

// ── Letter Modal ──
function toggleLetter() {
    const modal = document.getElementById('letter-modal');
    if (!modal) return;

    modal.classList.toggle('hidden');

    if (!modal.classList.contains('hidden')) {
        typeWriter(letterContent, "letter-text", 30);
    }
}

// ── Secret Button ──
document.getElementById('secret-btn')?.addEventListener('click', () => {
    document.getElementById('easter-egg')?.classList.remove('hidden');
});

// ── Init ──
window.onload = () => {
    typeWriter(mainText, "typing-text", 40);
};
