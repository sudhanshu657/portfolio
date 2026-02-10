export const tools = {
  scrollToSection: (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  },

  highlightElement: (selector) => {
    const el = document.querySelector(selector)
    if (!el) return
    el.style.outline = "3px solid #2563eb"
    setTimeout(() => (el.style.outline = ""), 3000)
  },

  clickElement: (selector) => {
    const el = document.querySelector(selector)
    el?.click()
  },

  fillInput: (selector, value) => {
    const input = document.querySelector(selector)
    if (input) input.value = value
  },

  scrollBy: (pixels) => {
    window.scrollBy({ top: pixels, behavior: "smooth" })
  },
}