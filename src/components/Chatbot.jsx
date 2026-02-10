"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Bot } from "lucide-react"

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your AI assistant. How can I help you?" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function addMessage(content, role = "assistant") {
    setMessages((prev) => [...prev, { role, content }])
  }

  function executeAction(data) {
    try {
      if (!data || !data.type) return

      // safe resolver: try querySelector, catch invalid selectors, support :contains(text)
      const findElement = (selector) => {
        if (!selector) return null
        // handle :contains(...) pattern
        try {
          const containsMatch = selector.match(/:contains\((?:'|")?(.*?)(?:'|")?\)/i)
          if (containsMatch) {
            const text = containsMatch[1].trim()
            // remove the :contains(...) part to allow a base selector
            const base = selector.replace(/:contains\((?:'|")?.*?(?:'|")?\)/i, "").trim() || null

            const scope = base ? Array.from(document.querySelectorAll(base)) : Array.from(document.querySelectorAll('button, a, [role="button"], input[type="submit"], input[type="button"]'))

            for (const el of scope) {
              if (el && el.textContent && el.textContent.trim().toLowerCase().includes(text.toLowerCase())) return el
            }
            // last resort: search globally by text among common elements
            const global = Array.from(document.querySelectorAll('button, a, [role="button"], input[type="submit"], input[type="button"]'))
            return global.find(e => e.textContent && e.textContent.trim().toLowerCase().includes(text.toLowerCase())) || null
          }
        } catch (e) {
          // fall through to try native querySelector
        }

        // try native querySelector in try/catch to avoid SyntaxError for invalid selectors
        try {
          const el = document.querySelector(selector)
          if (el) return el
        } catch (e) {
          // invalid selector syntax - fall back to simple text match for common interactives
          try {
            const text = selector.trim().replace(/^[.#]/, "")
            const candidates = Array.from(document.querySelectorAll('button, a, [role="button"], input[type="submit"], input[type="button"]'))
            return candidates.find(e => {
              const t = (e.textContent || e.value || "").trim().toLowerCase()
              return t && (t === text.toLowerCase() || t.includes(text.toLowerCase()))
            }) || null
          } catch (e2) {
            return null
          }
        }

        return null
      }

      // helper: click a link to download CV (looks for pdf download links)
      const triggerDownloadCV = () => {
        try {
          // prefer anchors with download or pdf href
          const link = document.querySelector('a[download]') || Array.from(document.querySelectorAll('a[href$=".pdf"]')).find(a => /cv|resume|sudhanshu|sudhanshu.pdf/i.test(a.getAttribute('href') || '')) || document.querySelector('a[href$=".pdf"]')
          if (link) { link.click(); return true }
        } catch (e) {}
        return false
      }

      // helper: toggle theme by toggling `dark` on documentElement or body
      const toggleTheme = () => {
        try {
          const root = document.documentElement
          if (root.classList.contains('dark')) root.classList.remove('dark')
          else root.classList.add('dark')
          return true
        } catch (e) { return false }
      }

      // helper: filter projects by tech text or data-tech
      const applyProjectFilter = (tech) => {
        try {
          // try to find filter buttons by data-tech or text
          const sel = `[data-tech]`, candidates = Array.from(document.querySelectorAll(sel))
          const match = candidates.find(c => (c.getAttribute('data-tech')||'').toLowerCase() === (tech||'').toLowerCase() || (c.textContent||'').toLowerCase().includes((tech||'').toLowerCase()))
          if (match) { match.click(); return true }

          // fallback: look for buttons/links with tech text
          const global = Array.from(document.querySelectorAll('button, a'))
          const byText = global.find(e => (e.textContent||'').trim().toLowerCase().includes((tech||'').toLowerCase()))
          if (byText) { byText.click(); return true }
        } catch (e) {}
        return false
      }

      // helper: open project modal or element by slug/name
      const openProjectModal = (nameOrSlug) => {
        try {
          // look for elements that open modals: data-project, data-slug, aria-controls
          const sel = `[data-project], [data-slug], [data-modal]`
          const candidates = Array.from(document.querySelectorAll(sel))
          const match = candidates.find(c => ((c.getAttribute('data-project')||'') === nameOrSlug) || ((c.getAttribute('data-slug')||'') === nameOrSlug) || (c.textContent||'').toLowerCase().includes((nameOrSlug||'').toLowerCase()))
          if (match) { match.click(); return true }

          // fallback: find button or link by text
          const global = Array.from(document.querySelectorAll('button, a'))
          const btn = global.find(e => (e.textContent||'').toLowerCase().includes((nameOrSlug||'').toLowerCase()))
          if (btn) { btn.click(); return true }
        } catch (e) {}
        return false
      }

      // helper: play demo/video in project card
      const playDemo = (nameOrSelector) => {
        try {
          // try selector first
          let el = null
          if (nameOrSelector) el = findElement(nameOrSelector) || document.querySelector(nameOrSelector)
          if (!el) el = document.querySelector('video') || document.querySelector('[data-demo]')
          if (el) {
            if (el.tagName === 'VIDEO') { el.play?.(); return true }
            // if a button to play exists inside element
            const btn = el.querySelector('button') || el
            btn.click?.()
            return true
          }
        } catch (e) {}
        return false
      }

      switch (data.type) {
        case "scroll": {
          const section = document.getElementById(data.section)
          if (section) {
            section.scrollIntoView({ behavior: "smooth" })
          }
          addMessage(data.content)
          break
        }

        case "click": {
          const el = findElement(data.selector)
          if (el) {
            try { el.focus?.(); } catch {}
            el.click()
            addMessage(data.content)
          } else {
            addMessage("⚠️ I couldn't find the element to click.")
          }
          break
        }

        case "download-cv": {
          const ok = triggerDownloadCV()
          addMessage(ok ? (data.content || 'Downloading CV...') : '⚠️ Could not find CV link.')
          break
        }

        case "toggle-theme": {
          const ok = toggleTheme()
          addMessage(ok ? (data.content || 'Toggled theme.') : '⚠️ Could not toggle theme.')
          break
        }

        case "filter-projects": {
          const tech = data.value || data.selector || data.section || ''
          const ok = applyProjectFilter(tech)
          addMessage(ok ? (data.content || `Filtered projects by ${tech}`) : `⚠️ Could not apply filter for ${tech}`)
          break
        }

        case "open-project": {
          const ok = openProjectModal(data.selector || data.value || data.section || '')
          addMessage(ok ? (data.content || 'Opened project details.') : '⚠️ Could not open project.')
          break
        }

        case "play-demo": {
          const ok = playDemo(data.selector || data.value || data.section || '')
          addMessage(ok ? (data.content || 'Playing demo.') : '⚠️ Could not play demo.')
          break
        }

        case "autofill-contact": {
          try {
            const fields = data.value || {}
            const nameEl = findElement('input[name="name"]') || document.querySelector('input[name="name"]')
            const emailEl = findElement('input[name="email"]') || document.querySelector('input[name="email"]')
            const msgEl = findElement('textarea[name="message"]') || document.querySelector('textarea[name="message"]')
            if (nameEl && fields.name) { nameEl.value = fields.name; nameEl.dispatchEvent(new Event('input',{bubbles:true})) }
            if (emailEl && fields.email) { emailEl.value = fields.email; emailEl.dispatchEvent(new Event('input',{bubbles:true})) }
            if (msgEl && fields.message) { msgEl.value = fields.message; msgEl.dispatchEvent(new Event('input',{bubbles:true})) }
            addMessage(data.content || 'Filled contact form.')
          } catch (e) {
            addMessage('⚠️ Could not autofill contact form.')
          }
          break
        }

        case "highlight": {
          const el = findElement(data.selector)
          if (el) {
            el.style.outline = "3px solid #38bdf8"
            el.style.outlineOffset = "4px"
            el.scrollIntoView({ behavior: "smooth", block: "center" })
            setTimeout(() => {
              el.style.outline = ""
              el.style.outlineOffset = ""
            }, 2500)
            addMessage(data.content)
          } else {
            addMessage("⚠️ I couldn't find the element to highlight.")
          }
          break
        }

        case "fill": {
          const el = findElement(data.selector)
          if (el) {
            try { el.focus(); } catch {}
            el.value = data.value
            el.dispatchEvent(new Event("input", { bubbles: true }))
            addMessage(data.content)
          } else {
            addMessage("⚠️ I couldn't find the input field to fill.")
          }
          break
        }

        case "focus": {
          const el = findElement(data.selector) || document.getElementById(data.section)
          if (el) {
            try { el.scrollIntoView({ behavior: "smooth", block: "center" }) } catch {}
            try { el.focus?.(); } catch {}
            el.style.transform = "scale(1.05)"
            el.style.transition = "transform 0.3s ease"
            setTimeout(() => {
              el.style.transform = ""
            }, 2000)
            addMessage(data.content)
          } else {
            addMessage("⚠️ I couldn't find the section to focus on.")
          }
          break
        }

        default:
          addMessage(data.content || "⚠️ Unknown action type.")
      }
    } catch (err) {
      console.error("ACTION ERROR:", err)
      addMessage("⚠️ Failed to execute action.")
    }
  }

  async function sendMessage() {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          pageContent: document.body.innerText.slice(0, 4000)
        })
      })

      if (!res.ok) {
        throw new Error("Server error")
      }

      const data = await res.json()

      executeAction(data)
    } catch (err) {
      console.error("FETCH ERROR:", err)
      addMessage("⚠️ Error connecting to server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
        whileTap={{ scale: 0.95 }}
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-80 max-h-[500px] bg-black/90 border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/70">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Bot className="w-5 h-5 text-blue-400" />
                AI Assistant
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "ml-auto bg-blue-600 text-white"
                      : "mr-auto bg-gray-800 text-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="mr-auto bg-gray-800 text-gray-300 px-3 py-2 rounded-lg animate-pulse">
                  Typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-3 flex gap-2 bg-black/70">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-gray-900 text-white placeholder-gray-400 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center justify-center disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}