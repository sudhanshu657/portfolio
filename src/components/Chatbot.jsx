"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Bot } from "lucide-react"
import { 
  findElement, 
  triggerDownloadCV, 
  toggleTheme, 
  applyProjectFilter, 
  openProjectModal, 
  playDemo, 
  openSocialIcons, 
  parseLocalCommand, 
  quickSocialMatch 
} from "@/lib/chatbot-utils"

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

      switch (data.type) {
        case "scroll": {
          const section = document.getElementById(data.section)
          if (section) {
            section.scrollIntoView({ behavior: "smooth" })
          }
          addMessage(data.content)
          break
        }

        case "submit-contact": {
          try {
            const contactRoot = document.getElementById('contact') || document.querySelector('#contact')
            let form = contactRoot ? contactRoot.querySelector('form') : null
            if (!form) {
              const forms = Array.from(document.querySelectorAll('form'))
              form = forms.find(f => f.querySelector('input[type="email"], input[name*="email"]')) || forms[0]
            }

            if (form) {
              const btn = form.querySelector('button[type="submit"], input[type="submit"]')
              if (btn) {
                try { btn.focus?.(); } catch {}
                btn.click()
                addMessage(data.content || 'Message sent.')
                return
              }
              try { form.requestSubmit ? form.requestSubmit() : form.submit(); addMessage(data.content || 'Message sent.'); return } catch (e) {}
            }

            const candidates = Array.from(document.querySelectorAll('button, a, input[type="button"]'))
            const sendBtn = candidates.find(e => {
              const t = (e.textContent || e.value || '').trim().toLowerCase()
              return t === 'send message' || t === 'send' || t.includes('send') || t.includes('submit')
            })
            if (sendBtn) { try { sendBtn.click(); addMessage(data.content || 'Message sent.'); return } catch (e) {} }

            addMessage('⚠️ Could not find the contact submit button.')
          } catch (e) {
            console.error('submit-contact error', e)
            addMessage('⚠️ Failed to submit contact form.')
          }
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

        case "open-socials": {
          const sv = Array.isArray(data.value) ? data.value : (typeof data.value === 'string' ? data.value.split(',').map(s=>s.trim()) : [])
          const ok = openSocialIcons(sv.length ? sv : [data.selector || data.section || 'github','linkedin'])
          addMessage(ok ? (data.content || 'Opened socials.') : '⚠️ Could not find social icons.')
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
    const text = input.trim()
    const newMessages = [...messages, { role: "user", content: text }]
    setMessages(newMessages)
    setInput("")

    // Handle chained local commands
    const parseAndExecuteSequence = (t) => {
      const seq = t
      const fillRegex = /(?:enter|type|fill)\s+(\w+)\s+([\s\S]*?)(?=(?:\s+(?:enter|click|press|submit|then|and)\b)|$)/gi
      const fills = []
      let m
      while ((m = fillRegex.exec(seq)) !== null) {
        fills.push({ field: m[1].toLowerCase().trim(), value: m[2].trim() })
      }

      const clickRegex = /(?:click|press|submit)\s+(?:the\s+)?([\s\S]*?)(?=(?:\s+(?:enter|click|press|submit|then|and)\b)|$)/gi
      const clicks = []
      while ((m = clickRegex.exec(seq)) !== null) {
        clicks.push(m[1].trim())
      }

      if (!fills.length && !clicks.length) return false

      const fieldMap = {
        name: [ 'input[name="name"]', 'input[placeholder*="Name"]', 'input[id*="name"]' ],
        email: [ 'input[name="email"]', 'input[type="email"]', 'input[placeholder*="Email"]', 'input[id*="email"]' ],
        mail: [ 'input[name="email"]', 'input[type="email"]' ],
        message: [ 'textarea[name="message"]', 'textarea[placeholder*="Message"]', 'textarea[id*="message"]' ],
        mesage: [ 'textarea[name="message"]', 'textarea[placeholder*="Message"]' ],
        msg: [ 'textarea[name="message"]' ]
      }

      for (const f of fills) {
        const key = f.field in fieldMap ? f.field : (f.field.replace(/[^a-z]/g, '') in fieldMap ? f.field.replace(/[^a-z]/g, '') : f.field)
        const selectors = fieldMap[key] || fieldMap[f.field] || []
        let used = false
        for (const sel of selectors) {
          try {
            executeAction({ type: 'fill', selector: sel, value: f.value, content: `Filled ${f.field}` })
            used = true
            break
          } catch (e) {}
        }
        if (!used) {
          const contactRoot = document.getElementById('contact') || document.querySelector('#contact')
          if (contactRoot) {
            const input = contactRoot.querySelector('input[name="' + f.field + '"]') || contactRoot.querySelector('textarea[name="' + f.field + '"]')
            if (input) {
              try { input.value = f.value; input.dispatchEvent(new Event('input', { bubbles: true })); addMessage(`Filled ${f.field}`) } catch (e) {}
            }
          }
        }
      }

      for (const c of clicks) {
        const s = c.toLowerCase()
        if (s.includes('submit') || s.includes('contact form') || s.includes('send')) {
          const selectors = [ '#contact form button[type="submit"]', '#contact button[type="submit"]', 'form button[type="submit"]', 'button[type="submit"]', 'button:contains("Send Message")', 'button:contains("Send")' ]
          let clicked = false
          for (const sel of selectors) {
            try {
              executeAction({ type: 'click', selector: sel, content: 'Clicked submit' })
              clicked = true
              break
            } catch (e) {}
          }
          if (!clicked) addMessage('⚠️ Could not find submit button to click.')
        } else {
          try { executeAction({ type: 'click', selector: c, content: `Clicked ${c}` }) } catch(e) { addMessage(`⚠️ Could not click ${c}`) }
        }
      }
      return true
    }

    if (parseAndExecuteSequence(text)) return

    const quick = quickSocialMatch(text)
    if (quick) {
      try { executeAction({ type: 'open-socials', value: quick, content: `Opening ${quick.join(' and ')}...` }) } catch (e) {}
      return
    }

    const local = parseLocalCommand(text)
    if (local) {
      try { executeAction(local) } catch (e) { addMessage('⚠️ Failed to perform local action.') }
      return
    }

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
      if (!res.ok) throw new Error("Server error")
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
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
        whileTap={{ scale: 0.95 }}
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-80 max-h-[500px] bg-black/90 border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/70">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Bot className="w-5 h-5 text-blue-400" />
                AI Assistant
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

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