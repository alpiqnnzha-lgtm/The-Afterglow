const mainText = "Sometimes, memories are mirrors. One reflects the past, the other shows who you're becoming.";
const letterContent = "This journey wasn't about the destination, but the echoes we left behind. Everything has its own timing. Stay brave.";

const lyricsWords = ["Someday,", "I'll", "see", "you", "again.", "Maybe", "not", "in", "this", "time,", "maybe", "not", "in", "this", "world.", "But", "I", "know", "that", "one", "day,", "in", "another", "place,", "we'll", "meet", "again."];

// ── Typewriter (cuma buat mainText & letter) ──
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

// ── Someday fade-in per kata (no geser, pure opacity) ──
let wordTimer = null;

function showSomedayWords() {
    const el = document.getElementById('lyrics-text');
    if (!el) return;

    // render semua kata dulu, opacity 0
    el.innerHTML = "";
    lyricsWords.forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word + " ";
        span.style.cssText = "opacity:0; transition: opacity 1.2s ease; display:inline;";
        span.dataset.idx = i;
        el.appendChild(span);
    });

    // fade in satu per satu
    const spans = el.querySelectorAll('span');
    let idx = 0;
    function nextWord() {
        if (idx >= spans.length) return;
        spans[idx].style.opacity = "1";
        idx++;
        wordTimer = setTimeout(nextWord, 600);
    }
    nextWord();
}

function hideSomedayWords() {
    if (wordTimer) { clearTimeout(wordTimer); wordTimer = null; }
    const el = document.getElementById('lyrics-text');
    if (el) el.innerHTML = "";
}

// ── do you think fade-in per baris ──
let lyricTimer = null;

function showLyricLines() {
    const lines = document.querySelectorAll('.lyric-line');
    lines.forEach(l => l.classList.remove('visible'));

    let idx = 0;
    function next() {
        if (idx >= lines.length) return;
        lines[idx].classList.add('visible');
        idx++;
        lyricTimer = setTimeout(next, 5500);
    }
    // do you think duluan, langsung pas play
    next();
}

function hideLyricLines() {
    if (lyricTimer) { clearTimeout(lyricTimer); lyricTimer = null; }
    document.querySelectorAll('.lyric-line').forEach(l => l.classList.remove('visible'));
}

// ── Toggle Audio ──
function toggleAudio() {
    const audio = document.getElementById('audio');
    const backsound = document.getElementById('backsound');
    const btn = document.getElementById('play-btn');
    const subLyrics = document.getElementById('about-you-section');

    if (!audio || !btn) return;

    if (audio.paused) {
        audio.play().catch(e => console.error("Audio error:", e));
        if (backsound) backsound.play().catch(e => console.error("Backsound error:", e));
        btn.textContent = "Pause Memory";

        // do you think duluan
        if (subLyrics) subLyrics.classList.add('show');
        showLyricLines();

        // Someday muncul setelah do you think ke-3 selesai (~2 detik setelah baris terakhir)
        setTimeout(() => {
            showSomedayWords();
        }, 5500 * 3 + 2000);

    } else {
        audio.pause();
        if (backsound) backsound.pause();
        btn.textContent = "Play Memory";

        hideSomedayWords();
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
