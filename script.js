// DonkeyType - Main JavaScript Application

// ===== CONSTANTS =====
const MODES = {
    TEST: 'test',
    PRACTICE: 'practice'
};

const TEST_MODES = {
    TIME: 'time',
    WORDS: 'words'
};

const TIMER_MODES = {
    COUNTDOWN: 'countdown',
    OFF: 'off'
};

const THEMES = ['default', 'solarized', 'nord', 'monokai'];
const DEFAULT_THEME = 'default';

const WPM_CHARS_PER_WORD = 5;
const NUMBERS_PROBABILITY = 0.1;
const PUNCTUATION_PROBABILITY = 0.08;

// ===== APPLICATION STATE =====
const state = {
    currentMode: MODES.TEST,
    testMode: TEST_MODES.TIME,
    timerMode: TIMER_MODES.COUNTDOWN,
    timeDuration: 30, // seconds for time mode
    wordCount: 25, // word count for words mode
    punctuation: false, // toggle for punctuation
    numbers: false, // toggle for numbers
    practiceRow: 'middle', // 'middle', 'upper', 'lower', 'num', 'special', 'mixed'
    
    testActive: false,
    testStarted: false,
    testText: '',
    currentCharIndex: 0,
    correctCount: 0,
    errorCount: 0,
    timeStarted: null,
    timeElapsed: 0,
    timerInterval: null,
    
    keyTracker: [], // tracks all key presses for accuracy calculation
    hintEnabled: false // tracks if hint button is active
};

// ===== DOM ELEMENTS =====
const typingTextEl = document.getElementById('typing-text');
const cursorEl = document.getElementById('cursor');
const resultCardEl = document.getElementById('result-card');
const timerEl = document.getElementById('timer-display');
const controlsMenuEl = document.getElementById('menu-controls');
const optionsMenuEl = document.getElementById('menu-options');
const restartBtnEl = document.getElementById('restart-btn');
const typingAreaEl = document.getElementById('typing-area');
const themeBtnEl = document.getElementById('theme-btn');
const mobileInputEl = document.getElementById('mobile-input');
const hintBtnEl = document.getElementById('hint-btn');
const hintImageContainerEl = document.getElementById('hint-image-container');
const hintImageEl = document.getElementById('hint-image');

// ===== DOM VALIDATION =====
function validateDOMElements() {
    const requiredElements = {
        typingTextEl,
        cursorEl,
        resultCardEl,
        timerEl,
        controlsMenuEl,
        optionsMenuEl,
        restartBtnEl,
        typingAreaEl,
        themeBtnEl,
        mobileInputEl,
        hintBtnEl,
        hintImageContainerEl,
        hintImageEl
    };
    
    for (const [name, element] of Object.entries(requiredElements)) {
        if (!element) {
            console.error(`Required DOM element not found: ${name}`);
            return false;
        }
    }
    
    return true;
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    if (!validateDOMElements()) {
        console.error('Failed to initialize: Missing required DOM elements');
        return;
    }
    
    if (!TYPING_TEST || TYPING_TEST.length === 0) {
        console.error('Failed to initialize: Word database not available');
        return;
    }
    
    // Load and apply saved theme
    loadTheme();
    
    // Ensure active button matches current state
    document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
    const initialButton = document.querySelector(`[data-mode="${state.currentMode}"]`);
    if (initialButton) {
        initialButton.classList.add('active');
    }
    
    renderMenuOptions();
    generateTestText();
    setupEventListeners();
});

// ===== THEME MANAGEMENT =====
function loadTheme() {
    const savedTheme = localStorage.getItem('donkeytype-theme') || DEFAULT_THEME;
    applyTheme(savedTheme);
}

function applyTheme(themeName) {
    if (!THEMES.includes(themeName)) {
        themeName = DEFAULT_THEME;
    }
    
    if (themeName === DEFAULT_THEME) {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', themeName);
    }
    
    localStorage.setItem('donkeytype-theme', themeName);
}

function cycleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
    const currentIndex = THEMES.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    
    applyTheme(nextTheme);
}

// ===== MENU RENDERING HELPERS =====
function createMenuButton(text, action, value = null, isActive = false, isToggle = false, title = '') {
    const btn = document.createElement('button');
    let className = 'menu-btn';
    
    if (isToggle) {
        className += ` toggle ${isActive ? 'active' : 'inactive'}`;
    } else if (isActive) {
        className += ' active';
    }
    
    btn.className = className;
    btn.textContent = text;
    btn.dataset.action = action;
    if (value !== null) {
        btn.dataset.value = value;
    }
    if (title) {
        btn.title = title;
    }
    
    return btn;
}

function createMenuGroup(buttons) {
    const group = document.createElement('div');
    group.style.display = 'flex';
    group.style.gap = '8px';
    buttons.forEach(btn => group.appendChild(btn));
    return group;
}

// Separators removed; spacing handled with CSS gaps.

// ===== MENU RENDERING =====
function renderMenuOptions() {
    if (!controlsMenuEl || !optionsMenuEl) return;
    controlsMenuEl.innerHTML = '';
    optionsMenuEl.innerHTML = '';

    if (state.currentMode === MODES.TEST) {
        // Punctuation toggle
        const punctBtn = createMenuButton('@', 'toggle-punctuation', null, state.punctuation, true, 'Toggle Punctuation');
        controlsMenuEl.appendChild(punctBtn);

        // Numbers toggle
        const numbersBtn = createMenuButton('#', 'toggle-numbers', null, state.numbers, true, 'Toggle Numbers');
        controlsMenuEl.appendChild(numbersBtn);

        // Test mode selector
        const timeModeBtn = createMenuButton('time', 'set-test-mode', TEST_MODES.TIME, state.testMode === TEST_MODES.TIME);
        const wordsModeBtn = createMenuButton('words', 'set-test-mode', TEST_MODES.WORDS, state.testMode === TEST_MODES.WORDS);
        const testModeGroup = createMenuGroup([timeModeBtn, wordsModeBtn]);
        controlsMenuEl.appendChild(testModeGroup);

        // Duration/Count options
        const options = state.testMode === TEST_MODES.TIME ? ['off', '15', '30', '60', '120'] : ['10', '25', '50', '100'];
        const optionButtons = options.map(opt => {
            let isActive = false;
            if (state.testMode === TEST_MODES.TIME) {
                if (opt === 'off') {
                    isActive = state.timerMode === TIMER_MODES.OFF;
                } else {
                    isActive = state.timerMode === TIMER_MODES.COUNTDOWN && state.timeDuration === parseInt(opt);
                }
            } else {
                isActive = state.wordCount === parseInt(opt);
            }
            return createMenuButton(opt, 'set-duration', opt, isActive);
        });
        const optionsGroup = createMenuGroup(optionButtons);
        optionsMenuEl.appendChild(optionsGroup);
    } else if (state.currentMode === MODES.PRACTICE) {
        // Practice row selection buttons
        const rows = [
            { id: 'middle', label: 'Middle' },
            { id: 'upper', label: 'Upper' },
            { id: 'lower', label: 'Lower' },
            { id: 'num', label: 'Number' },
            { id: 'special', label: 'Special' },
            { id: 'mixed', label: 'Mixed' }
        ];

        const rowButtons = rows.map(row =>
            createMenuButton(
                row.label,
                'set-practice-row',
                row.id,
                state.practiceRow === row.id
            )
        );
        const rowGroup = createMenuGroup(rowButtons);
        controlsMenuEl.appendChild(rowGroup);
    }
    // No separators; spacing handled via CSS.

}

// ===== MODAL RENDERING (MOBILE SETTINGS) =====
function renderModalSettings() {
    const modalBodyEl = document.getElementById('modal-body');
    if (!modalBodyEl) return;

    modalBodyEl.innerHTML = '';

    if (state.currentMode === MODES.TEST) {
        // Punctuation & Numbers section
        const toggleSection = document.createElement('div');
        toggleSection.className = 'modal-section';
        
        const toggleTitle = document.createElement('div');
        toggleTitle.className = 'modal-section-title';
        toggleTitle.textContent = 'Options';
        toggleSection.appendChild(toggleTitle);

        const toggleButtons = document.createElement('div');
        toggleButtons.className = 'modal-buttons';

        const punctBtn = createMenuButton('@', 'toggle-punctuation', null, state.punctuation, true, 'Toggle Punctuation');
        const numbersBtn = createMenuButton('#', 'toggle-numbers', null, state.numbers, true, 'Toggle Numbers');
        
        toggleButtons.appendChild(punctBtn);
        toggleButtons.appendChild(numbersBtn);
        toggleSection.appendChild(toggleButtons);
        modalBodyEl.appendChild(toggleSection);

        // Test Mode section
        const modeSection = document.createElement('div');
        modeSection.className = 'modal-section';

        const modeTitle = document.createElement('div');
        modeTitle.className = 'modal-section-title';
        modeTitle.textContent = 'Test Mode';
        modeSection.appendChild(modeTitle);

        const modeButtons = document.createElement('div');
        modeButtons.className = 'modal-buttons';

        const timeModeBtn = createMenuButton('Time', 'set-test-mode', TEST_MODES.TIME, state.testMode === TEST_MODES.TIME);
        const wordsModeBtn = createMenuButton('Words', 'set-test-mode', TEST_MODES.WORDS, state.testMode === TEST_MODES.WORDS);

        modeButtons.appendChild(timeModeBtn);
        modeButtons.appendChild(wordsModeBtn);
        modeSection.appendChild(modeButtons);
        modalBodyEl.appendChild(modeSection);

        // Duration/Count section
        const durationSection = document.createElement('div');
        durationSection.className = 'modal-section';

        const durationTitle = document.createElement('div');
        durationTitle.className = 'modal-section-title';
        durationTitle.textContent = state.testMode === TEST_MODES.TIME ? 'Duration' : 'Word Count';
        durationSection.appendChild(durationTitle);

        const options = state.testMode === TEST_MODES.TIME ? ['off', '15', '30', '60', '120'] : ['10', '25', '50', '100'];
        const durationButtons = document.createElement('div');
        durationButtons.className = 'modal-buttons';

        options.forEach(opt => {
            let isActive = false;
            if (state.testMode === TEST_MODES.TIME) {
                if (opt === 'off') {
                    isActive = state.timerMode === TIMER_MODES.OFF;
                } else {
                    isActive = state.timerMode === TIMER_MODES.COUNTDOWN && state.timeDuration === parseInt(opt);
                }
            } else {
                isActive = state.wordCount === parseInt(opt);
            }
            const btn = createMenuButton(opt, 'set-duration', opt, isActive);
            durationButtons.appendChild(btn);
        });

        durationSection.appendChild(durationButtons);
        modalBodyEl.appendChild(durationSection);

    } else if (state.currentMode === MODES.PRACTICE) {
        // Practice Row section
        const rowSection = document.createElement('div');
        rowSection.className = 'modal-section';

        const rowTitle = document.createElement('div');
        rowTitle.className = 'modal-section-title';
        rowTitle.textContent = 'Practice Row';
        rowSection.appendChild(rowTitle);

        const rows = [
            { id: 'middle', label: 'Middle' },
            { id: 'upper', label: 'Upper' },
            { id: 'lower', label: 'Lower' },
            { id: 'num', label: 'Number' },
            { id: 'special', label: 'Special' },
            { id: 'mixed', label: 'Mixed' }
        ];

        const rowButtons = document.createElement('div');
        rowButtons.className = 'modal-buttons';

        rows.forEach(row => {
            const btn = createMenuButton(
                row.label,
                'set-practice-row',
                row.id,
                state.practiceRow === row.id
            );
            rowButtons.appendChild(btn);
        });

        rowSection.appendChild(rowButtons);
        modalBodyEl.appendChild(rowSection);
    }
}

// (overflow detection removed — settings overlay scrapped)

// Update timer text shown in the menu (visible at load)
function updateTimerDisplay(text) {
    if (!timerEl) return;
    if (text !== undefined) {
        // If explicit text is provided, use it
        timerEl.textContent = text;
    } else {
        // Show initial duration in test mode, 0s in practice mode
        if (state.currentMode === MODES.PRACTICE) {
            timerEl.textContent = '0s';
        } else {
            timerEl.textContent = String(state.timeDuration) + 's';
        }
    }
    // Only show timer if test is active (typing has started)
    if (state.testActive) {
        timerEl.classList.add('active');
    } else {
        timerEl.classList.remove('active');
    }
}

// ===== STATE HELPERS =====
function resetTestState() {
    state.testStarted = false;
    state.testActive = false;
    state.currentCharIndex = 0;
    state.correctCount = 0;
    state.errorCount = 0;
    state.keyTracker = [];
    clearTimer();
}

function resetUI() {
    if (cursorEl) cursorEl.classList.remove('active');
    if (timerEl) timerEl.classList.remove('active');
    if (resultCardEl) resultCardEl.classList.add('hidden');
    // Remove global blur state
    document.body.classList.remove('blur-active');
    // Clear hint image visibility (but preserve hint enabled state)
    if (hintImageContainerEl) {
        hintImageContainerEl.classList.remove('visible');
        hintImageContainerEl.classList.add('hidden');
    }
    // Restore hint button visual state based on state.hintEnabled
    if (hintBtnEl) {
        if (state.hintEnabled) {
            hintBtnEl.classList.add('active');
        } else {
            hintBtnEl.classList.remove('active');
        }
    }
}

// Check if results are currently displayed
function isResultsShown() {
    return resultCardEl && !resultCardEl.classList.contains('hidden');
}

// ===== EVENT HANDLERS =====
function handleModeSwitch(newMode) {
    // Prevent action if results are shown
    if (isResultsShown()) return;
    
    // Remove active class from all mode buttons
    document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
    // Add active class to the selected button
    const selectedButton = document.querySelector(`[data-mode="${newMode}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
    state.currentMode = newMode;

    resetTestState();
    resetUI();

    if (newMode === MODES.PRACTICE) {
        // Default practice row
        state.practiceRow = 'middle';
    }

    renderMenuOptions();
    updateTimerDisplay();
    generateTestText();
    updateDisplay();
}

function handleTogglePunctuation() {
    // Prevent action if results are shown
    if (isResultsShown()) return;
    
    state.punctuation = !state.punctuation;
    resetTestState();
    resetUI();
    generateTestText();
    renderMenuOptions();
    updateDisplay();
}

function handleToggleNumbers() {
    // Prevent action if results are shown
    if (isResultsShown()) return;
    
    state.numbers = !state.numbers;
    resetTestState();
    resetUI();
    generateTestText();
    renderMenuOptions();
    updateDisplay();
}

function handleSetTestMode(newMode) {
    // Prevent action if results are shown
    if (isResultsShown()) return;
    
    state.testMode = newMode;
    resetTestState();
    resetUI();
    updateTimerDisplay();
    renderMenuOptions();
    updateDisplay();
}

function handleSetDuration(value) {
    // Prevent action if results are shown
    if (isResultsShown()) return;
    
    // Stop running timer if test is active
    if (state.timerInterval) {
        clearTimer();
    }
    
    if (value === 'off') {
        state.timerMode = TIMER_MODES.OFF;
        state.timeDuration = 0;
        if (state.testActive && state.testMode === TEST_MODES.WORDS) {
            startCountUpTimer();
        } else {
            updateTimerDisplay();
        }
    } else if (state.testMode === TEST_MODES.TIME) {
        state.timerMode = TIMER_MODES.COUNTDOWN;
        state.timeDuration = parseInt(value);
    } else {
        state.wordCount = parseInt(value);
        generateTestText();
    }
    
    if (!state.testActive) {
        resetTestState();
    }
    
    renderMenuOptions();
    updateDisplay();
}

function handleSetPracticeRow(row) {
    // Prevent action if results are shown
    if (isResultsShown()) return;
    
    state.practiceRow = row;
    resetTestState();
    resetUI();
    generateTestText();
    renderMenuOptions();
    updateDisplay();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Mode switching
    document.querySelectorAll('[data-mode]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const newMode = e.target.dataset.mode;
            if (newMode === MODES.TEST || newMode === MODES.PRACTICE) {
                handleModeSwitch(newMode);
            }
        });
    });

    // Dynamic menu actions
    // Actions in controls/options sections
    if (controlsMenuEl) {
        controlsMenuEl.addEventListener('click', (e) => {
            if (!e.target.dataset.action) return;

            const action = e.target.dataset.action;
            const value = e.target.dataset.value;

            switch (action) {
                case 'toggle-punctuation':
                    handleTogglePunctuation();
                    break;
                case 'toggle-numbers':
                    handleToggleNumbers();
                    break;
                case 'set-test-mode':
                    if (value === TEST_MODES.TIME || value === TEST_MODES.WORDS) {
                        handleSetTestMode(value);
                    }
                    break;
                case 'set-duration':
                    handleSetDuration(value);
                    break;
                case 'set-practice-row':
                    if (value === 'middle' || value === 'upper' || value === 'lower' || value === 'num' || value === 'special' || value === 'mixed') {
                        handleSetPracticeRow(value);
                    }
                    break;
            }
        });
    }
    if (optionsMenuEl) {
        optionsMenuEl.addEventListener('click', (e) => {
            if (!e.target.dataset.action) return;
            const action = e.target.dataset.action;
            const value = e.target.dataset.value;
            if (action === 'set-duration') {
                handleSetDuration(value);
            }
        });
    }

    // (vertical menu handling removed)

    // Typing input
    document.addEventListener('keydown', handleKeyPress);

    // Restart button
    if (restartBtnEl) {
        restartBtnEl.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from bubbling to typing-area
            resetTest();
        });
    }

    // Click on typing area to focus
    const typingArea = document.querySelector('.typing-area');
    if (typingArea) {
        typingArea.addEventListener('click', () => {
            // Prevent action if results are shown
            if (isResultsShown()) return;
            
            if (!state.testActive && !state.testStarted && cursorEl) {
                cursorEl.classList.add('active');
            }
            // Focus hidden input to show mobile keyboard
            if (mobileInputEl) mobileInputEl.focus();
        });

        // Also focus on touch to ensure mobile keyboard opens
        typingArea.addEventListener('touchstart', () => {
            if (isResultsShown()) return;
            if (mobileInputEl) mobileInputEl.focus();
        }, { passive: true });
        typingArea.addEventListener('pointerdown', () => {
            if (isResultsShown()) return;
            if (mobileInputEl) mobileInputEl.focus();
        });
    }

    // Logo click: refresh the page
    const logoEl = document.querySelector('.logo');
    if (logoEl) {
        logoEl.addEventListener('click', () => {
            location.reload();
        });
    }

    // Theme toggle button
    if (themeBtnEl) {
        themeBtnEl.addEventListener('click', cycleTheme);
    }

    // Hint button: toggle hint image visibility (allow click anytime, show image only when typing)
    if (hintBtnEl) {
        hintBtnEl.addEventListener('click', () => {
            if (!hintImageContainerEl) return;
            // Toggle hint state
            state.hintEnabled = !state.hintEnabled;
            
            if (state.hintEnabled) {
                // Activate hint button
                hintBtnEl.classList.add('active');
                // Only show image if typing is active (blur state is on)
                if (document.body.classList.contains('blur-active')) {
                    hintImageContainerEl.classList.remove('hidden');
                    hintImageContainerEl.classList.add('visible');
                    if (hintImageEl) {
                        hintImageEl.src = 'assets/hint.png';
                    }
                }
            } else {
                // Deactivate hint button and hide image
                hintBtnEl.classList.remove('active');
                hintImageContainerEl.classList.add('hidden');
                hintImageContainerEl.classList.remove('visible');
            }
        });
    }

    // Mobile input handling (for devices requiring a focused input)
    if (mobileInputEl) {
        // When value changes, process typed char or backspace
        mobileInputEl.addEventListener('input', (e) => {
            if (isResultsShown()) return;

            // Start test on first input
            if (!state.testStarted) {
                startTest();
            }

            const ev = e; // InputEvent
            const data = ev.data; // last inserted character
            const inputType = ev.inputType;

            if (inputType === 'deleteContentBackward') {
                handleBackspace();
            } else if (typeof data === 'string' && data.length > 0) {
                processTypedCharacter(data);
            }

            // Clear the hidden input to keep it minimal
            mobileInputEl.value = '';
        });

        // Ensure backspace and special keys still work
        mobileInputEl.addEventListener('keydown', (e) => {
            // Forward Backspace explicitly (some browsers emit keydown)
            if (e.key === 'Backspace') {
                e.preventDefault();
                handleBackspace();
            }
        });
    }


    // No separators to update on resize.
    window.addEventListener('resize', () => {});

}

// ===== TEXT GENERATION =====
function generateTestText() {
    try {
        if (state.currentMode === MODES.PRACTICE) {
            generatePracticeText();
        } else {
            generateTestTextWords();
        }
        updateDisplay();
    } catch (error) {
        console.error('Error generating test text:', error);
        state.testText = 'Error generating text. Please refresh the page.';
        updateDisplay();
    }
}

function generateTestTextWords() {
    if (!TYPING_TEST || TYPING_TEST.length === 0) {
        throw new Error('Word database not available');
    }
    
    let words = [...TYPING_TEST];
    
    // Shuffle words using Fisher-Yates algorithm (more efficient)
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }

    // Get appropriate count
    const wordCount = Math.min(state.wordCount, words.length);
    words = words.slice(0, wordCount);

    // Join with spaces
    let text = words.join(' ');

    // Add numbers if enabled
    if (state.numbers && NUMBERS && NUMBERS.length > 0) {
        text = insertRandomElements(text, NUMBERS, NUMBERS_PROBABILITY);
    }

    // Add punctuation if enabled
    if (state.punctuation && PUNCTUATION && PUNCTUATION.length > 0) {
        text = insertRandomElements(text, PUNCTUATION, PUNCTUATION_PROBABILITY);
    }

    state.testText = text || 'No text available';
}

function generatePracticeText() {
    // Get practice text lines based on selected practice row
    let practiceLines = [];
    
    switch (state.practiceRow) {
        case 'upper':
            practiceLines = PRACTICE_TEXTS.upper;
            break;
        case 'lower':
            practiceLines = PRACTICE_TEXTS.lower;
            break;
        case 'num':
            practiceLines = PRACTICE_TEXTS.num;
            break;
        case 'special':
            practiceLines = PRACTICE_TEXTS.special;
            break;
        case 'mixed':
            practiceLines = PRACTICE_TEXTS.mixed;
            break;
        case 'middle':
        default:
            practiceLines = PRACTICE_TEXTS.middle;
            break;
    }

    if (!practiceLines || practiceLines.length === 0) {
        throw new Error('Practice text configuration not available');
    }

    // Build multi-line practice text
    let text = '';
    
    for (let lineIndex = 0; lineIndex < practiceLines.length; lineIndex++) {
        const line = practiceLines[lineIndex];
        
        // Shuffle elements within the line for variety
        const shuffledLine = [...line];
        for (let i = shuffledLine.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledLine[i], shuffledLine[j]] = [shuffledLine[j], shuffledLine[i]];
        }
        
        // Join elements with space and add to text
        text += shuffledLine.join(' ');
        
        // Add newline between lines (except after last line)
        if (lineIndex < practiceLines.length - 1) {
            text += '\n';
        }
    }

    state.testText = text;
}

function insertRandomElements(text, elements, probability) {
    const words = text.split(' ');
    const result = [];
    
    words.forEach(word => {
        result.push(word);
        
        // Insert element as a separate "word" after the current word (not merged)
        if (Math.random() < probability) {
            const element = elements[Math.floor(Math.random() * elements.length)];
            result.push(element);
        }
    });
    
    return result.join(' ');
}

// ===== DISPLAY UPDATE =====
function updateDisplay() {
    if (!typingTextEl || !state.testText) return;
    
    // Store cursor reference before clearing
    const cursorElement = cursorEl;
    
    typingTextEl.innerHTML = '';

    state.testText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'char';

        // Make spaces visible and stable width
        if (char === ' ') {
            span.classList.add('space');
            span.textContent = '\u00A0'; // non-breaking space to preserve width
        } else if (char === '\n') {
            // Render newline as visible space placeholder
            span.classList.add('space');
            span.textContent = '\u00A0'; // non-breaking space to preserve width
        } else {
            span.textContent = char;
        }

        if (index === state.currentCharIndex) {
            span.classList.add('current');
            span.id = 'current-char'; // Mark current character for scrolling
        } else if (index < state.currentCharIndex) {
            // Character has been typed
            if (state.keyTracker[index] === state.testText[index]) {
                span.classList.add('correct');
                span.textContent = state.testText[index]; // Show expected char in blue
            } else {
                span.classList.add('incorrect');
                span.textContent = state.keyTracker[index] || ''; // Show actual key pressed in red
            }
        }

        typingTextEl.appendChild(span);
    });

    // Re-append cursor inside typing-text so it scrolls with content
    if (cursorElement) {
        typingTextEl.appendChild(cursorElement);
    }

    // Auto-scroll to current character
    if (state.testActive || state.testStarted) {
        scrollToCurrentChar();
        updateCursorPosition();
    }

    // Update timer visibility
    if (state.testActive && timerEl) {
        timerEl.classList.add('active');
    } else if (timerEl) {
        timerEl.classList.remove('active');
    }
}

function scrollToCurrentChar() {
    const currentChar = document.getElementById('current-char');
    if (!currentChar) return;
    
    const typingArea = document.querySelector('.typing-area');
    const typingText = document.querySelector('.typing-text');
    if (!typingArea || !typingText) return;
    
    // Get position of current character relative to text container
    const charTop = currentChar.offsetTop;
    const charHeight = currentChar.offsetHeight;
    const containerHeight = typingArea.offsetHeight;
    
    // Calculate desired scroll position to keep current char visible
    const viewportMiddle = containerHeight / 2;
    const targetScroll = charTop - viewportMiddle + (charHeight / 2);
    
    typingText.scrollTop = Math.max(0, targetScroll);
}

function updateCursorPosition() {
    if (!cursorEl || !typingTextEl) return;
    
    const chars = typingTextEl.querySelectorAll('.char');
    if (chars[state.currentCharIndex]) {
        const currentChar = chars[state.currentCharIndex];
        
        // Position cursor at the left edge of current character
        // Using offsetLeft/offsetTop since cursor is inside typing-text
        cursorEl.style.left = currentChar.offsetLeft + 'px';
        cursorEl.style.top = currentChar.offsetTop + 'px';
        
        // Match cursor height to character height
        cursorEl.style.height = currentChar.offsetHeight + 'px';
    }
}

// ===== KEYPRESS HANDLING =====
function handleKeyPress(e) {
    // Handle Ctrl+H to toggle hint (works anytime)
    if (e.ctrlKey && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        if (hintBtnEl) {
            hintBtnEl.click(); // Trigger the hint button click handler
        }
        return;
    }

    // Handle Enter key when result card is visible (only allowed action)
    if (e.key === 'Enter') {
        if (isResultsShown()) {
            e.preventDefault();
            resetTest();
            return;
        }
    }

    // Handle Escape to end test and show results (while typing)
    if (e.key === 'Escape') {
        if (state.testActive) {
            e.preventDefault();
            endTest();
            return;
        }
    }

    // Prevent all other actions when results are shown
    if (isResultsShown()) {
        e.preventDefault();
        return;
    }

    // Ignore special keys (except Backspace)
    if (e.key.length > 1 && e.key !== 'Backspace') {
        return;
    }

    // Start test on first keypress (works for both test and practice modes)
    if (!state.testStarted) {
        startTest();
    }

    if (!state.testActive) {
        return;
    }

    e.preventDefault();

    if (e.key === 'Backspace') {
        handleBackspace();
    } else if (state.currentCharIndex < state.testText.length) {
        const typedChar = e.key;
        const expectedChar = state.testText[state.currentCharIndex];

        state.keyTracker[state.currentCharIndex] = typedChar;

        if (typedChar === expectedChar) {
            state.correctCount++;
        } else {
            state.errorCount++;
        }

        state.currentCharIndex++;

        // Check if test is complete
        if (state.currentCharIndex >= state.testText.length) {
            endTest();
        }

        updateDisplay();
    }
}

function handleBackspace() {
    if (state.currentCharIndex > 0) {
        state.currentCharIndex--;
        const char = state.keyTracker[state.currentCharIndex];

        if (char === state.testText[state.currentCharIndex]) {
            state.correctCount--;
        } else if (char !== undefined) {
            state.errorCount--;
        }

        delete state.keyTracker[state.currentCharIndex];
        updateDisplay();
    }
}

// Process a single typed character (used by mobile input)
function processTypedCharacter(typedChar) {
    if (!state.testActive) return;
    if (state.currentCharIndex < state.testText.length) {
        const expectedChar = state.testText[state.currentCharIndex];

        state.keyTracker[state.currentCharIndex] = typedChar;

        if (typedChar === expectedChar) {
            state.correctCount++;
        } else {
            state.errorCount++;
        }

        state.currentCharIndex++;

        if (state.currentCharIndex >= state.testText.length) {
            endTest();
        }

        updateDisplay();
    }
}

// ===== TIMER HELPERS =====
function clearTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

function updateTimerDisplayDuringTest(text) {
    if (!timerEl) return;
    timerEl.textContent = text;
    timerEl.classList.add('active');
}

// ===== TEST MANAGEMENT =====
function startTest() {
    state.testStarted = true;
    state.testActive = true;
    state.timeStarted = Date.now();
    state.currentCharIndex = 0;
    state.correctCount = 0;
    state.errorCount = 0;
    state.keyTracker = [];

    if (cursorEl) cursorEl.classList.add('active');

    // Enable global blur for non-typing elements
    document.body.classList.add('blur-active');

    // Show hint image if hint is enabled (state persists across restarts)
    if (state.hintEnabled && hintImageContainerEl) {
        hintBtnEl.classList.add('active'); // Ensure button shows active
        hintImageContainerEl.classList.remove('hidden');
        hintImageContainerEl.classList.add('visible');
        if (hintImageEl) {
            hintImageEl.src = 'assets/hint.png';
        }
    }

    // Clear any previous timer
    clearTimer();

    // Start timer: countdown/countup in test mode, countup in practice mode
    if (state.currentMode === MODES.TEST) {
        if (state.timerMode === TIMER_MODES.OFF) {
            startCountUpTimer();
        } else if (state.testMode === TEST_MODES.TIME) {
            startCountdownTimer(state.timeDuration, true); // End test when timer reaches 0
        } else if (state.testMode === TEST_MODES.WORDS) {
            startCountdownTimer(state.timeDuration, true); // End test when timer reaches 0
        }
    } else if (state.currentMode === MODES.PRACTICE) {
        startCountUpTimer();
    }

    updateDisplay();
}

function startCountdownTimer(duration, shouldEndTest = false) {
    let timeRemaining = duration;
    updateTimerDisplayDuringTest(timeRemaining + 's');

    state.timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplayDuringTest(timeRemaining + 's');

        if (timeRemaining <= 0) {
            clearTimer();
            if (shouldEndTest) {
                endTest();
            }
        }
    }, 1000);
}

function startCountUpTimer() {
    let timeElapsed = 0;
    updateTimerDisplayDuringTest('0s');

    state.timerInterval = setInterval(() => {
        timeElapsed++;
        updateTimerDisplayDuringTest(timeElapsed + 's');
    }, 1000);
}

function endTest() {
    state.testActive = false;
    if (cursorEl) cursorEl.classList.remove('active');
    clearTimer();
    // Disable blur when test ends
    document.body.classList.remove('blur-active');
    // Hide hint image when test ends (but keep button state for restart)
    if (hintImageContainerEl) {
        hintImageContainerEl.classList.remove('visible');
        hintImageContainerEl.classList.add('hidden');
    }

    // Calculate results
    const timeElapsedMinutes = (Date.now() - state.timeStarted) / 1000 / 60; // in minutes
    // Prevent division by zero
    const wpm = timeElapsedMinutes > 0 
        ? Math.round((state.correctCount / WPM_CHARS_PER_WORD) / timeElapsedMinutes)
        : 0;
    const totalAttempted = state.currentCharIndex;
    const accuracy = totalAttempted > 0 
        ? Math.round((state.correctCount / totalAttempted) * 100) 
        : 0;

    // Display results
    showResults(wpm, accuracy, state.errorCount);
}

function showResults(wpm, accuracy, errors) {
    const wpmEl = document.getElementById('wpm');
    const accuracyEl = document.getElementById('accuracy');
    const errorsEl = document.getElementById('errors');
    
    if (wpmEl) wpmEl.textContent = wpm;
    if (accuracyEl) accuracyEl.textContent = accuracy + '%';
    if (errorsEl) errorsEl.textContent = errors;
    
    // Hide typing text and cursor, show result card
    if (typingTextEl) typingTextEl.style.display = 'none';
    if (cursorEl) cursorEl.style.display = 'none';
    if (resultCardEl) resultCardEl.classList.remove('hidden');
    if (timerEl) timerEl.classList.remove('active');
}

function resetTest() {
    resetTestState();
    resetUI();
    
    // Show typing text and cursor, hide result card
    if (typingTextEl) typingTextEl.style.display = 'block';
    if (cursorEl) cursorEl.style.display = '';
    if (resultCardEl) resultCardEl.classList.add('hidden');
    
    // Reset timer display based on current mode
    if (timerEl) {
        if (state.currentMode === MODES.PRACTICE) {
            updateTimerDisplay('0s');
        } else {
            updateTimerDisplay(String(state.timeDuration) + 's');
        }
    }

    generateTestText();
    updateDisplay();
}
