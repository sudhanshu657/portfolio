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
          const global = Array.from(document.querySelectorAll('button, a, h1, h2, h3, h4, span, p'))
          const lowerName = (nameOrSlug||'').toLowerCase().trim()
          if (lowerName) {
            const textMatch = global.find(e => (e.textContent||'').toLowerCase().includes(lowerName))
            if (textMatch) {
              // if the match is a heading inside a project card, scroll that card into view and try to click Demo/GitHub inside it
              let card = textMatch.closest('article, .card, .project, .Card, .card-content') || textMatch.parentElement
              for (let i = 0; i < 4 && card; i++) {
                // look for a demo button inside
                const demoBtn = card.querySelector('button, a')
                if (demoBtn) { try { demoBtn.scrollIntoView({behavior: 'smooth', block: 'center'}); demoBtn.click(); } catch(e){}; return true }
                card = card.parentElement
              }
              // last resort: click the matched element if it's interactive
              if (textMatch.tagName === 'A' || textMatch.tagName === 'BUTTON') { textMatch.click(); return true }
            }

            // If no direct text match, try scrolling to projects and perform a fuzzy word-match retry
            const projectsSection = document.getElementById('projects') || document.querySelector('#projects')
            if (projectsSection) {
              try { projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' }) } catch {}
              // try to find headings within projects after a short delay
              const retryFind = () => {
                const headings = Array.from(projectsSection.querySelectorAll('h1,h2,h3,h4'))
                const nameWords = lowerName.split(/\s+/).filter(Boolean)
                for (const h of headings) {
                  const txt = (h.textContent||'').toLowerCase()
                  const allWords = nameWords.every(w => txt.includes(w))
                  if (allWords) {
                    // find a clickable button/link within the card container
                    let card = h.closest('article, .Card, .card, .project') || h.parentElement
                    for (let i = 0; i < 6 && card; i++) {
                      const demoBtn = card.querySelector('button, a')
                      if (demoBtn) { try { demoBtn.scrollIntoView({behavior: 'smooth', block: 'center'}); demoBtn.click(); } catch(e){}; return true }
                      card = card.parentElement
                    }
                  }
                }
                return false
              }

              // perform synchronous retry (DOM is already rendered client-side)
              if (retryFind()) return true
            }
          }
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

      // helper: highlight and open social icons in the hero section (github, linkedin)
      const openSocialIcons = (services = []) => {
        try {
          const hero = document.getElementById('hero') || document.querySelector('#hero') || document.querySelector('section[id^="hero"]')
          const anchors = hero ? Array.from(hero.querySelectorAll('a')) : Array.from(document.querySelectorAll('a'))
          let acted = false
          for (const svc of services) {
            const key = (svc || '').toLowerCase()

            // heuristics: href includes, aria-label/title includes, innerHTML includes, github/linkedin path patterns
            let a = anchors.find(a => (a.getAttribute('href')||'').toLowerCase().includes(key))
            if (!a) a = anchors.find(a => ((a.getAttribute('aria-label')||'') + ' ' + (a.getAttribute('title')||'')).toLowerCase().includes(key))
            if (!a) a = anchors.find(a => (a.innerHTML||'').toLowerCase().includes(key))
            if (!a && key === 'linkedin') a = anchors.find(a => (a.getAttribute('href')||'').toLowerCase().includes('linkedin.com') || (a.getAttribute('href')||'').toLowerCase().includes('/in/'))
            if (!a && key === 'github') a = anchors.find(a => (a.getAttribute('href')||'').toLowerCase().includes('github.com'))

            if (a) {
              try {
                a.style.outline = '3px solid #34d399'
                a.style.outlineOffset = '4px'
                a.scrollIntoView({ behavior: 'smooth', block: 'center' })
                // try native click, but fallback to window.open if nav doesn't occur
                setTimeout(() => {
                  try { a.click() } catch (e) {}
                  try {
                    const href = a.getAttribute('href')
                    if (href && href.startsWith('http')) window.open(href, '_blank', 'noopener')
                  } catch (e) {}
                }, 250)
                setTimeout(() => { a.style.outline = ''; a.style.outlineOffset = '' }, 2500)
                acted = true
              } catch (e) {}
            }
          }
          return acted
        } catch (e) { console.error('openSocialIcons error', e); return false }
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

        case "submit-contact": {
          try {
            // Try to find a form inside #contact
            const contactRoot = document.getElementById('contact') || document.querySelector('#contact')
            let form = contactRoot ? contactRoot.querySelector('form') : null
            if (!form) {
              // try to find the form by heuristics (form that contains an email input)
              const forms = Array.from(document.querySelectorAll('form'))
              form = forms.find(f => f.querySelector('input[type="email"], input[name*="email"]')) || forms[0]
            }

            if (form) {
              // prefer clicking the submit button if present
              const btn = form.querySelector('button[type="submit"], input[type="submit"]')
              if (btn) {
                try { btn.focus?.(); } catch {}
                btn.click()
                addMessage(data.content || 'Message sent.')
                return
              }

              // fallback to submitting the form
              try { form.requestSubmit ? form.requestSubmit() : form.submit(); addMessage(data.content || 'Message sent.'); return } catch (e) {}
            }

            // last resort: click buttons with 'send' or 'send message' text
            const candidates = Array.from(document.querySelectorAll('button, a, input[type="button"]'))
            const sendBtn = candidates.find(e => {
              const t = (e.textContent || e.value || '').trim().toLowerCase()
              return t === 'send message' || t === 'send' || t === 'send message' || t.includes('send') || t.includes('submit')
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

    // Handle chained local commands like: "enter name sudhanshu enter mail sudh@143 enter message hello click the contact form submit button"
    const parseAndExecuteSequence = (t) => {
      const seq = t

      // find all fill commands
      const fillRegex = /(?:enter|type|fill)\s+(\w+)\s+([\s\S]*?)(?=(?:\s+(?:enter|click|press|submit|then|and)\b)|$)/gi
      const fills = []
      let m
      while ((m = fillRegex.exec(seq)) !== null) {
        fills.push({ field: m[1].toLowerCase().trim(), value: m[2].trim() })
      }

      // find click/submit commands
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

      // perform fills
      for (const f of fills) {
        const key = f.field in fieldMap ? f.field : (f.field.replace(/[^a-z]/g, '') in fieldMap ? f.field.replace(/[^a-z]/g, '') : f.field)
        const selectors = fieldMap[key] || fieldMap[f.field] || []
        let used = false
        for (const sel of selectors) {
          try {
            // use existing executeAction 'fill' which will resolve the selector
            executeAction({ type: 'fill', selector: sel, value: f.value, content: `Filled ${f.field}` })
            used = true
            break
          } catch (e) {}
        }
        if (!used) {
          // try generic selectors inside contact section
          const contactRoot = document.getElementById('contact') || document.querySelector('#contact')
          if (contactRoot) {
            const input = contactRoot.querySelector('input[name="' + f.field + '"]') || contactRoot.querySelector('textarea[name="' + f.field + '"]')
            if (input) {
              try { input.value = f.value; input.dispatchEvent(new Event('input', { bubbles: true })); addMessage(`Filled ${f.field}`) } catch (e) {}
            }
          }
        }
      }

      // perform clicks
      for (const c of clicks) {
        const s = c.toLowerCase()
        // common targets: submit, contact form submit, send message
        if (s.includes('submit') || s.includes('contact form') || s.includes('send')) {
          // try to click contact form submit button
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
          // generic click by text
          try { executeAction({ type: 'click', selector: c, content: `Clicked ${c}` }) } catch(e) { addMessage(`⚠️ Could not click ${c}`) }
        }
      }

      return true
    }

    if (parseAndExecuteSequence(text)) return

    // Quick direct matches for single-word social shortcuts (covers misspellings)
    const quickSocialMatch = (t) => {
      const s = t.toLowerCase().trim()
      const socialMap = {
        linkedin: ["linkedin", "linkdein", "linkdin", "linkdean", "jinkdien", "jinkedin", "linkdean"],
        github: ["github", "gitub", "githb", "git hub"]
      }
      const found = []
      Object.entries(socialMap).forEach(([k, variants]) => {
        if (variants.includes(s)) found.push(k)
      })
      return found.length ? found : null
    }

    const quick = quickSocialMatch(text)
    if (quick) {
      try { executeAction({ type: 'open-socials', value: quick, content: `Opening ${quick.join(' and ')}...` }) } catch (e) { console.error('quick social exec', e) }
      return
    }

    // Local command parser: handle common commands immediately without calling API
    const parseLocalCommand = (t) => {
      const s = t.toLowerCase()
      if (s.includes("view my work") || s.includes("view projects") || s.includes("show my work") || s === "view work") {
        return { type: "scroll", section: "projects", content: "Opening projects..." }
      }
      if (s.includes("download cv") || s.includes("download resume") || s.includes("download my cv") || s === "download cv") {
        return { type: "download-cv", content: "Downloading CV..." }
      }
      const openProjectMatch = s.match(/open project (?:named )?"?([\w\s-]+)"?/) || s.match(/open (?:the )?project "?([\w\s-]+)"?/) || s.match(/^open\s+"?([\w\s-]+)"?$/)
      if (openProjectMatch) return { type: "open-project", selector: openProjectMatch[1].trim(), content: `Opening project ${openProjectMatch[1].trim()}...` }
      if (s.includes("send message") || s.includes("send my message") || s.includes("submit message") || s === "send") {
        return { type: "submit-contact", content: "Sending your message..." }
      }
      const filterMatch = s.match(/filter projects by (.+)/) || s.match(/show projects (?:with|using) (.+)/)
      if (filterMatch) return { type: "filter-projects", value: filterMatch[1].trim(), content: `Filtering projects by ${filterMatch[1].trim()}...` }
      const playMatch = s.match(/play demo(?: of)? "?([\w\s-]+)"?/) || s.match(/play (?:the )?demo(?: for)? "?([\w\s-]+)"?/)
      if (playMatch) return { type: "play-demo", selector: playMatch[1].trim(), content: `Playing demo for ${playMatch[1].trim()}...` }
      const fillEmailMatch = s.includes("fill my email") || s.includes("fill email") || s.includes("autofill email")
      if (fillEmailMatch) return { type: "autofill-contact", value: { email: (document.querySelector('meta[name="author"]')?.getAttribute('content') || '') || '' }, content: "Filled your email." }

      // social shortcuts + misspellings (e.g., linkdein, jinkdien, gitub)
      const socialMap = {
        linkedin: ["linkedin", "linkdein", "linkdin", "linkdean", "jinkdien", "jinkedin"],
        github: ["github", "gitub", "githb", "git hub"]
      }
      // detect patterns like 'linkedin and github' or single words
      const socials = []
      Object.entries(socialMap).forEach(([key, variants]) => {
        for (const v of variants) {
          if (s.includes(v)) { socials.push(key); break }
        }
      })
      if (socials.length) return { type: "open-socials", value: socials, content: `Opening ${socials.join(' and ')}...` }
      return null
    }

    const local = parseLocalCommand(text)
    if (local) {
      // run local action immediately
      try {
        executeAction(local)
      } catch (e) {
        console.error('Local action error', e)
        addMessage('⚠️ Failed to perform local action.')
      }
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