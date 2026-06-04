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
let lyricTimer = null;

function showLyricLines() {
    const lines = document.querySelectorAll('.lyric-line');
    lines.forEach(l => {
        l.classList.remove('visible');
    });

    let idx = 0;
    function next() {
        if (idx >= lines.length) return;
        lines[idx].classList.add('visible');
        idx++;
        lyricTimer = setTimeout(next, 900);
    }
    // mulai setelah lirik utama selesai ngetik (~2 detik)
    lyricTimer = setTimeout(next, lyricsText.length * 120 + 400);
}

function hideLyricLines() {
    if (lyricTimer) clearTimeout(lyricTimer);
    document.querySelectorAll('.lyric-line').forEach(l => l.classList.remove('visible'));
}

// ── Main Audio (About You) ──
function toggleMainAudio() {
    const audio = document.getElementById('audio');
    const btn = document.getElementById('play-btn');
    const subLyrics = document.getElementById('about-you-section');

    if (!audio || !btn) return;

    if (audio.paused) {
        audio.play().catch(e => console.error("Audio error:", e));
        btn.textContent = "Pause";

        // Lirik utama typewriter
        typeWriter(lyricsText, "lyrics-text", 120);

        // Tampilkan section About You dulu, lalu fade per baris
        if (subLyrics) subLyrics.classList.add('show');
        showLyricLines();

    } else {
        audio.pause();
        btn.textContent = "Play";

        // Reset lirik
        const lyricsEl = document.getElementById('lyrics-text');
        if (lyricsEl) lyricsEl.innerHTML = "";
        if (subLyrics) subLyrics.classList.remove('show');
        hideLyricLines();
    }
}

// ── Backsound ──
function toggleBacksound() {
    const bs = document.getElementById('backsound');
    const btn = document.getElementById('back-btn');

    if (!bs || !btn) return;

    if (bs.paused) {
        bs.play().catch(e => console.error("Backsound error:", e));
        btn.textContent = "Pause";
    } else {
        bs.pause();
        btn.textContent = "Play";
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
