import { useState, useEffect } from 'react'

/* ─── Typewriter loop ────────────────────────────────────
   Types a word, holds, backspaces it, then types the next — cycling forever
   through `words`. Honours prefers-reduced-motion (returns the first word,
   static). Pair with a blinking `.type-caret` span for the classic look. */
export default function useTypewriter(words, { typeMs = 85, deleteMs = 45, holdMs = 1500 } = {}) {
  const [text, setText] = useState(words[0])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let wordIndex = 0
    let charIndex = words[0].length   // first word starts fully typed
    let deleting = true               // …so the first action is to hold, then delete
    let cancelled = false
    let timer
    const step = () => {
      if (cancelled) return
      const word = words[wordIndex]
      if (!deleting) {
        charIndex++
        setText(word.slice(0, charIndex))
        timer = setTimeout(step, charIndex >= word.length ? (deleting = true, holdMs) : typeMs)
      } else if (charIndex > 0) {
        charIndex--
        setText(word.slice(0, charIndex))
        timer = setTimeout(step, deleteMs)
      } else {
        deleting = false
        wordIndex = (wordIndex + 1) % words.length
        timer = setTimeout(step, typeMs)
      }
    }
    timer = setTimeout(step, holdMs)  // hold the first word before it starts deleting
    return () => { cancelled = true; clearTimeout(timer) }
  }, [])
  return text
}
