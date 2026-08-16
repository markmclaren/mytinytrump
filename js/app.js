/* My Tiny Trump — framework-free entrance and quotation controller. */

import { QUOTES } from './messages.js';

const stage = document.querySelector('.character-stage');
const quoteButton = document.querySelector('.quote-bubble__text');
const quoteSource = document.querySelector('.quote-bubble__source');

const orderedQuotes = [...QUOTES].sort(() => Math.random() - 0.5);
let quoteIndex = 0;

function renderQuote() {
  const quote = orderedQuotes[quoteIndex];
  if (!quoteButton || !quoteSource || !quote) return;
  quoteButton.textContent = `“${quote.text}”`;
  quoteSource.textContent = quote.source;
  quoteSource.href = quote.url;
}

function showNextQuote() {
  quoteIndex = (quoteIndex + 1) % orderedQuotes.length;
  renderQuote();
}

function showPreviousQuote() {
  quoteIndex = (quoteIndex - 1 + orderedQuotes.length) % orderedQuotes.length;
  renderQuote();
}

function handleQuoteNavigation(event) {
  if (event.altKey || event.ctrlKey || event.metaKey) return;

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    showNextQuote();
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    showPreviousQuote();
  }
}

renderQuote();
quoteButton?.addEventListener('click', showNextQuote);
window.addEventListener('keydown', handleQuoteNavigation);
window.setInterval(showNextQuote, 9000);

if (stage) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => stage.classList.add('is-ready'));
  });
}
