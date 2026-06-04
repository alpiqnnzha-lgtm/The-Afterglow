const mainText = "Sometimes, memories are mirrors. One reflects the past, the other shows who you're becoming.";
const letterContent = "This journey wasn't about the destination, but the echoes we left behind. Everything has its own timing. Stay brave.";

const lyricsWords = ["Someday,", "I'll", "see", "you", "again.", "Maybe", "not", "in", "this", "time,", "maybe", "not", "in", "this", "world.", "But", "I", "know", "that", "one", "day,", "in", "another", "place,", "we'll", "meet", "again."];

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

// ── Someday fade-in per kata ──
let wordTimer = null;

function showSomedayWords() {
    const el = document.getElementById('lyrics-text');
    if (!el) return;

    // container fade-in dulu pelan
    el.style.opacity = "0";
    el.style.transition = "opacity 1.5s ease";
    el.innerHTML = "";

    lyricsWords.forEach((word) => {
        const span = document.createElement('span');
        span.textContent = word + " ";
        span.style.cssText = "opacity:0; transition: opacity 1.2s ease; display:inline;";
        el.appendChild(span);
    });

    // container fade in dulu
    setTimeout(() => {
        el.style.opacity = "1";
    }, 50);

    // baru kata-kata muncul satu per satu setelah container keliatan
    const spans = el.querySelectorAll('span');
    let idx = 0;
    function nextWord() {
        if (idx >= spans.length) return;
        spans[idx].style.opacity = "1";
        idx++;
        wordTimer = setTimeout(nextWord, 600);
    }
    setTimeout(nextWord, 800);
}

function hideSomedayWords() {
    if (wordTimer) { clearTimeout(wordTimer); wordTimer = null; }
    const el = document.getElementById('lyrics-text');
    if (el) {
        el.style.transition = "none";
        el.style.opacity = "0";
        el.innerHTML = "";
    }
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

        // reset dulu biar bersih
        hideSomedayWords();
        hideLyricLines();
        if (subLyrics) subLyrics.classList.remove('show');

        // do you think duluan
        setTimeout(() => {
            if (subLyrics) subLyrics.classList.add('show');
            showLyricLines();
        }, 100);

        // Someday 1.8 detik kemudian, fade pelan
        setTimeout(() => {
            showSomedayWords();
        }, 1800);

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
