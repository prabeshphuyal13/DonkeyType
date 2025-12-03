# DonkeyType

DonkeyType is a lightweight, client-side typing test and practice web app. It provides timed and word-count tests, focused practice drills (rows, numbers, special chars), and a compact responsive UI with results (WPM, accuracy, errors).

**Quick Summary**
- **Type:** Browser-based single-page app (no backend).
- **Features:** Time & word modes, punctuation and numbers toggles, practice rows, results card (WPM/accuracy/errors), responsive layout.
- **Run:** Open `index.html` in a browser or serve the folder with a static server.

**Files**
- `index.html`: Main HTML file and UI scaffolding.
- `style.css`: All styles and responsive layout (CSS variables at the top for quick theming).
- `script.js`: Main application logic (modes, generation, input handling, timers, results).
- `words.js`: Word list, punctuation, numbers, and practice text sets used to generate test/practice content.
- `assets/`: Static assets (logo image used by the UI).

**Usage**
- Switch between **Typing Test** and **Typing Practice** using the top-left buttons.
- In **Typing Test** mode you can:
  - Toggle punctuation and numbers in the dynamic menu.
  - Choose `time` or `words` test mode.
  - Select durations (e.g., 15s, 30s, 60s) or word counts (10, 25, 50, 100).
- In **Typing Practice** mode pick a practice row (`middle`, `upper`, `lower`, `num`, `special`, `mixed`).
- Start typing — the test begins on the first key press. Use Backspace to correct; results appear when the test ends.

**How results are calculated**
- WPM: computed using 5 characters per word (classic WPM approximation) and elapsed time.
- Accuracy: percent of correct characters versus attempted characters.
- Errors: total incorrect keystrokes tracked during the test.

**Accessibility & behavior notes**
- The app listens for global `keydown` events and ignores most multi-character keys except `Backspace` and `Enter`.
- Tests begin on first keystroke and stop based on timer/word completion.
----

