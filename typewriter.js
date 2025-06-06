/**
 * Typing Animation Script
 * Author: Giulio Pons
 *
 * Works on all elements with class "typewriter".
 * If also with class "fixtypo", simulates random errors and correction.
 * If also with class "fixheight", locks the element's height before animation.
 *
 * The effect displays the text letter by letter, then a blinking cursor,
 * and after random X seconds it is deleted. The cycle repeats.
 * The required CSS styles are injected automatically if missing.
 * The script starts on page load.
 */

function startTypewriter(element) {
  const fullText = element.textContent;
  const simulateErrors = element.classList.contains('fixtypo');
  const fixHeight = element.classList.contains('fixheight');

  // Blocca altezza prima di svuotare, se richiesto
  if (fixHeight) {
    const computed = getComputedStyle(element);
    element.style.height = element.offsetHeight + 'px';
    element.style.display = 'inline-block'; // necessario per altezza fissa su inline elements
    element.style.overflow = 'hidden';
  }

  element.textContent = "";

  let index = 0;
  let isCorrecting = false;
  let typed = '';

  function getRandomChar() {
    const chars = "abcdefghijklmnopqrstuvwxyz<>0123456789,.;:-_?!";
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function type() {
    if (isCorrecting) return;

    if (index <= fullText.length) {
      if (simulateErrors && Math.random() < 0.1 && index < fullText.length) {
        typed += getRandomChar();
        element.textContent = typed;
        isCorrecting = true;
        setTimeout(() => {
          typed = typed.slice(0, -1);
          element.textContent = typed;
          isCorrecting = false;
          setTimeout(type, 100 + Math.random() * 250);
        }, 300);
      } else {
        typed += fullText.charAt(index);
        element.textContent = typed;
        index++;
        setTimeout(type, 50 + Math.random() * 250);
      }
    } else {
      element.classList.add("blink");
      setTimeout(erase, 5000);
    }
  }

  function erase() {
    element.classList.remove("blink");
    if (index >= 0) {
      typed = fullText.substring(0, index);
      element.textContent = typed;
      index--;
      setTimeout(erase, 80);
    } else {
      element.classList.add("blink");
      typed = "";
      setTimeout(type, 3000);
    }
  }

  function injectTypewriterStyle() {
    const cssId = 'typewriter-style-block';
    if (!document.getElementById(cssId)) {
      const style = document.createElement('style');
      style.id = cssId;
      style.textContent = `
        .typewriter {
          position: relative;
          white-space: wrap;
        }
        .typewriter::after {
          content: '|';
          animation: none;
          opacity: 1;
        }
        .typewriter.blink::after {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  injectTypewriterStyle();
  type();
}


// Start only on page load
window.addEventListener('load', function () {
  document.querySelectorAll('.typewriter').forEach(startTypewriter);
});
