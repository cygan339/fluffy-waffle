# 日本Go — NihonGo

> Aplikacja PWA do nauki języka japońskiego po polsku

**Live demo:** `https://[twoja-nazwa].github.io/nihongo-app/`

## 🚀 Funkcje

- 🃏 **Fiszki SRS** — algorytm powtórek (jak Anki): hiragana, katakana, kanji JLPT N5
- ✏️ **Rysowanie** — tryb ślepy, ćwicz pisanie znaków bez podpowiedzi
- ⚡ **Quiz** — 3 tryby: znak→romaji, romaji→znak, kanji→znaczenie
- 🔍 **Słownik JP↔PL** — AI tłumaczy każde słowo z przykładami i rozkładem kanji
- 🎓 **Kurs Tofugu PL** — przetłumaczony przewodnik "Learn Japanese: A Ridiculously Detailed Guide"
- 📖 **Gramatyka** — partykuły, czasowniki, przymiotniki, liczebniki, keigo
- 🎬 **Filmy + napisy** — odtwarzacz z podwójnymi napisami JP+PL, tłumaczenie przez AI
- 📚 **Czytnik tekstów** — wklej tekst JP lub PL, AI tłumaczy, tryb furigana
- 📝 **Notatki i kaligrafia** — edytor z arkuszami do ćwiczenia pisania, szablony, druk

## 📁 Struktura plików

```
nihongo-app/
├── index.html          ← cała aplikacja (Single Page App)
├── sw.js               ← Service Worker (tryb offline)
├── 404.html            ← redirect dla GitHub Pages
├── .nojekyll           ← wyłącza Jekyll na GitHub Pages
├── README.md
└── favicon/
    ├── site.webmanifest
    ├── favicon.ico
    ├── favicon-96x96.png
    ├── apple-touch-icon.png
    ├── icon192x192.png
    └── icon512x512.png
```

## 🛠️ Deploy na GitHub Pages

### Krok 1 — Utwórz repozytorium
1. Wejdź na [github.com/new](https://github.com/new)
2. Nazwa: `nihongo-app` (lub dowolna)
3. Widoczność: **Public** (wymagane dla darmowego GitHub Pages)
4. Kliknij **Create repository**

### Krok 2 — Wgraj pliki
**Opcja A — przez przeglądarkę (najprostsze):**
1. W repozytorium kliknij **Add file → Upload files**
2. Przeciągnij WSZYSTKIE pliki i folder `favicon/`
3. Kliknij **Commit changes**

**Opcja B — przez Git:**
```bash
git init
git add .
git commit -m "Initial NihonGo deploy"
git branch -M main
git remote add origin https://github.com/TWOJA-NAZWA/nihongo-app.git
git push -u origin main
```

### Krok 3 — Włącz GitHub Pages
1. W repozytorium: **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. Kliknij **Save**
5. Po 1–2 minutach strona będzie dostępna pod:
   `https://TWOJA-NAZWA.github.io/nihongo-app/`

### Krok 4 — Zainstaluj jako PWA
- **Android (Chrome):** baner "Dodaj do ekranu głównego" pojawi się automatycznie
- **iOS (Safari):** Udostępnij → Dodaj do ekranu głównego
- **Desktop (Chrome/Edge):** ikona instalacji w pasku adresu

## ⚙️ Wymagania techniczne

- Działa offline (Service Worker cache)
- Słownik AI i tłumacz tekstu wymagają internetu (Anthropic API)
- Dane nauki zapisywane lokalnie (localStorage)
- Kompatybilność: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+

## 📄 Licencja

Do użytku osobistego. Kurs oparty na materiałach [Tofugu](https://www.tofugu.com/learn-japanese/).
