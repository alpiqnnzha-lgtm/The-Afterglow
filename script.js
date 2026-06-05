const mainText = "Sometimes, memories are mirrors. One reflects the past, the other shows who you're becoming.";
const letterContent = "This journey wasn't about the destination, but the echoes we left behind. Everything has its own timing. Stay brave.";
const secretContent = "I kept every version of you — the laugh you tried to hide, the way you said my name like it meant something. I don't know when I started memorizing you. Maybe from the very first time. Maybe I never stopped.\n\nPeople say time heals. But time just taught me how to carry it better. How to smile without letting it show. How to hear our song and not fall apart — at least not where anyone can see.\n\nYou were never just a memory. You were the standard. The one I keep comparing every almost-love to. And they always fall short. Not because they're not enough — but because they're not you.\n\nMaybe in another life, the timing was right. Maybe in another world, I was brave enough to say it before it was too late. But here, in this one — I just have this. A shrine. A song. And the quiet hope that somewhere, somehow, you still think of me too.";

const lyricsPhrases = [
    "Someday, I'll see you again.",
    "Maybe not in this time,",
    "maybe not in this world.",
    "But I know that one day,",
    "in another place,",
    "we'll meet again."
];

function typeWriter(text, id, speed, callback) {
    const element = document.getElementById(id);
    if (!element) return;
    let i = 0;
    element.innerHTML = "";
    function typing() {
        if (i < text.length) {
            if (text.charAt(i) === '\n' && text.charAt(i+1) === '\n') {
                element.innerHTML += "<br><br>";
                i += 2;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(typing, speed);
        } else if (callback) callback();
    }
    typing();
}

// ── Someday fade-in per frasa ──
let wordTimer = null;
let somedayTimeout = null;

function showSomedayWords() {
    const el = document.getElementById('lyrics-text');
    if (!el) return;
    el.innerHTML = "";
    el.style.cssText = "opacity:0; transition: opacity 0.8s ease;";
    lyricsPhrases.forEach((phrase) => {
        const span = document.createElement('span');
        span.textContent = phrase + " ";
        span.style.cssText = "opacity:0; transition: opacity 0.8s ease; display:inline;";
        el.appendChild(span);
    });
    setTimeout(() => { el.style.opacity = "1"; }, 50);
    const spans = el.querySelectorAll('span');
    let idx = 0;
    function nextPhrase() {
        if (idx >= spans.length) return;
        spans[idx].style.opacity = "1";
        idx++;
        wordTimer = setTimeout(nextPhrase, 1800);
    }
    setTimeout(nextPhrase, 500);
}

function hideSomedayWords() {
    if (wordTimer) { clearTimeout(wordTimer); wordTimer = null; }
    if (somedayTimeout) { clearTimeout(somedayTimeout); somedayTimeout = null; }
    const el = document.getElementById('lyrics-text');
    if (el) { el.style.cssText = "opacity:0; transition:none;"; el.innerHTML = ""; }
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
        hideSomedayWords();
        hideLyricLines();
        if (subLyrics) subLyrics.classList.remove('show');
        audio.currentTime = 0;
        if (backsound) backsound.currentTime = 0;
        audio.play().catch(e => console.error("Audio error:", e));
        if (backsound) backsound.play().catch(e => console.error("Backsound error:", e));
        btn.textContent = "Pause Memory";
        setTimeout(() => {
            if (subLyrics) subLyrics.classList.add('show');
            showLyricLines();
        }, 100);
        somedayTimeout = setTimeout(() => { showSomedayWords(); }, 1700);
    } else {
        audio.pause();
        if (backsound) backsound.pause();
        btn.textContent = "Play Memory";
        hideSomedayWords();
        if (subLyrics) subLyrics.classList.remove('show');
        hideLyricLines();
    }
}

// ── Modals ──
function toggleLetter() {
    const modal = document.getElementById('letter-modal');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) typeWriter(letterContent, "letter-text", 30);
}

window.onload = () => {
    typeWriter(mainText, "typing-text", 40);
    document.getElementById('secret-btn')?.addEventListener('click', () => {
        const modal = document.getElementById('secret-modal');
        if (!modal) return;
        modal.classList.remove('hidden');
        typeWriter(secretContent, "secret-text", 25);
    });
};
