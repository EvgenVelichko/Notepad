/** @format */

let firstNumber = '';
let operation = '';
let newNumber = true;

function toggleCalculator() {
    const calculator = document.getElementById('calculator');
    calculator.classList.toggle('calculator--visible');
}

function toggleFormatPanel() {
    const formatPanel = document.getElementById('formatPanel');
    formatPanel.classList.toggle('format-panel--visible');
}

function appendNumber(num) {
    const display = document.getElementById('display');
    if (newNumber) {
        display.value = num;
        newNumber = false;
    } else {
        display.value += num;
    }
}

function setOperation(op) {
    const display = document.getElementById('display');
    firstNumber = display.value;
    operation = op;
    newNumber = true;
}

function calculate() {
    const display = document.getElementById('display');
    const secondNumber = display.value;
    let result;

    switch (operation) {
        case '+':
            result = parseFloat(firstNumber) + parseFloat(secondNumber);
            break;
        case '-':
            result = parseFloat(firstNumber) - parseFloat(secondNumber);
            break;
        case '*':
            result = parseFloat(firstNumber) * parseFloat(secondNumber);
            break;
        case '/':
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
            break;
    }

    display.value = result;
    newNumber = true;
}

function saveNote() {
    const notepad = document.getElementById('notepad');
    localStorage.setItem('savedNote', notepad.value);
    alert('Заметка сохранена!');
}

function clearNote() {
    const notepad = document.getElementById('notepad');
    notepad.value = '';
    updateWordCount();
}

function downloadNote() {
    const notepad = document.getElementById('notepad');
    const blob = new Blob([notepad.value], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'note.txt';
    a.click();
}

function formatText(format) {
    const notepad = document.getElementById('notepad');
    const start = notepad.selectionStart;
    const end = notepad.selectionEnd;
    const selectedText = notepad.value.substring(start, end);

    if (!selectedText) {
        alert('Пожалуйста, выделите текст для форматирования');
        return;
    }

    let formattedText;
    switch (format) {
        case 'bold':
            formattedText = `**${selectedText}**`;
            break;
        case 'italic':
            formattedText = `*${selectedText}*`;
            break;
        case 'underline':
            formattedText = `_${selectedText}_`;
            break;
    }

    notepad.value =
        notepad.value.substring(0, start) +
        formattedText +
        notepad.value.substring(end);

    // Set cursor position after the inserted formatted text
    const newCursorPos = start + formattedText.length;
    notepad.focus();
    notepad.setSelectionRange(newCursorPos, newCursorPos);

    // Update word count after formatting
    updateWordCount();
}

function updateWordCount() {
    const notepad = document.getElementById('notepad');
    const text = notepad.value.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    const charCount = text.length;

    document.getElementById('wordCount').textContent = `Слов: ${wordCount}`;
    document.getElementById('charCount').textContent = `Символов: ${charCount}`;
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle.checked) {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    }
}

window.onload = function () {
    const savedNote = localStorage.getItem('savedNote');
    if (savedNote) {
        document.getElementById('notepad').value = savedNote;
        updateWordCount();
    }

    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    if (savedTheme === 'light') {
        themeToggle.checked = true;
        document.body.classList.add('light-theme');
    }

    // Add event listener for theme toggle
    themeToggle.addEventListener('change', toggleTheme);
};
