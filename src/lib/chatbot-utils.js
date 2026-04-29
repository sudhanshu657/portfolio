/**
 * Safe resolver: try querySelector, catch invalid selectors, support :contains(text)
 */
export const findElement = (selector) => {
  if (!selector) return null;
  // handle :contains(...) pattern
  try {
    const containsMatch = selector.match(/:contains\((?:'|")?(.*?)(?:'|")?\)/i);
    if (containsMatch) {
      const text = containsMatch[1].trim();
      // remove the :contains(...) part to allow a base selector
      const base = selector.replace(/:contains\((?:'|")?.*?(?:'|")?\)/i, "").trim() || null;

      const scope = base
        ? Array.from(document.querySelectorAll(base))
        : Array.from(
            document.querySelectorAll(
              'button, a, [role="button"], input[type="submit"], input[type="button"]'
            )
          );

      for (const el of scope) {
        if (
          el &&
          el.textContent &&
          el.textContent.trim().toLowerCase().includes(text.toLowerCase())
        )
          return el;
      }
      // last resort: search globally by text among common elements
      const global = Array.from(
        document.querySelectorAll(
          'button, a, [role="button"], input[type="submit"], input[type="button"]'
        )
      );
      return (
        global.find(
          (e) =>
            e.textContent &&
            e.textContent.trim().toLowerCase().includes(text.toLowerCase())
        ) || null
      );
    }
  } catch (e) {
    // fall through to try native querySelector
  }

  // try native querySelector in try/catch to avoid SyntaxError for invalid selectors
  try {
    const el = document.querySelector(selector);
    if (el) return el;
  } catch (e) {
    // invalid selector syntax - fall back to simple text match for common interactives
    try {
      const text = selector.trim().replace(/^[.#]/, "");
      const candidates = Array.from(
        document.querySelectorAll(
          'button, a, [role="button"], input[type="submit"], input[type="button"]'
        )
      );
      return (
        candidates.find((e) => {
          const t = (e.textContent || e.value || "").trim().toLowerCase();
          return t && (t === text.toLowerCase() || t.includes(text.toLowerCase()));
        }) || null
      );
    } catch (e2) {
      return null;
    }
  }

  return null;
};

/**
 * Helper: click a link to download CV
 */
export const triggerDownloadCV = () => {
  try {
    const link =
      document.querySelector("a[download]") ||
      Array.from(document.querySelectorAll('a[href$=".pdf"]')).find((a) =>
        /cv|resume|sudhanshu|sudhanshu.pdf/i.test(a.getAttribute("href") || "")
      ) ||
      document.querySelector('a[href$=".pdf"]');
    if (link) {
      link.click();
      return true;
    }
  } catch (e) {}
  return false;
};

/**
 * Helper: toggle theme
 */
export const toggleTheme = () => {
  try {
    const root = document.documentElement;
    if (root.classList.contains("dark")) root.classList.remove("dark");
    else root.classList.add("dark");
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Helper: filter projects by tech
 */
export const applyProjectFilter = (tech) => {
  try {
    const sel = `[data-tech]`,
      candidates = Array.from(document.querySelectorAll(sel));
    const match = candidates.find(
      (c) =>
        (c.getAttribute("data-tech") || "").toLowerCase() ===
          (tech || "").toLowerCase() ||
        (c.textContent || "").toLowerCase().includes((tech || "").toLowerCase())
    );
    if (match) {
      match.click();
      return true;
    }

    const global = Array.from(document.querySelectorAll("button, a"));
    const byText = global.find((e) =>
      (e.textContent || "").trim().toLowerCase().includes((tech || "").toLowerCase())
    );
    if (byText) {
      byText.click();
      return true;
    }
  } catch (e) {}
  return false;
};

/**
 * Helper: open project modal
 */
export const openProjectModal = (nameOrSlug) => {
  try {
    const sel = `[data-project], [data-slug], [data-modal]`;
    const candidates = Array.from(document.querySelectorAll(sel));
    const match = candidates.find(
      (c) =>
        (c.getAttribute("data-project") || "") === nameOrSlug ||
        (c.getAttribute("data-slug") || "") === nameOrSlug ||
        (c.textContent || "")
          .toLowerCase()
          .includes((nameOrSlug || "").toLowerCase())
    );
    if (match) {
      match.click();
      return true;
    }

    const global = Array.from(
      document.querySelectorAll("button, a, h1, h2, h3, h4, span, p")
    );
    const lowerName = (nameOrSlug || "").toLowerCase().trim();
    if (lowerName) {
      const textMatch = global.find((e) =>
        (e.textContent || "").toLowerCase().includes(lowerName)
      );
      if (textMatch) {
        let card =
          textMatch.closest("article, .card, .project, .Card, .card-content") ||
          textMatch.parentElement;
        for (let i = 0; i < 4 && card; i++) {
          const demoBtn = card.querySelector("button, a");
          if (demoBtn) {
            try {
              demoBtn.scrollIntoView({ behavior: "smooth", block: "center" });
              demoBtn.click();
            } catch (e) {}
            return true;
          }
          card = card.parentElement;
        }
        if (textMatch.tagName === "A" || textMatch.tagName === "BUTTON") {
          textMatch.click();
          return true;
        }
      }

      const projectsSection =
        document.getElementById("projects") || document.querySelector("#projects");
      if (projectsSection) {
        try {
          projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch {}
        const headings = Array.from(projectsSection.querySelectorAll("h1,h2,h3,h4"));
        const nameWords = lowerName.split(/\s+/).filter(Boolean);
        for (const h of headings) {
          const txt = (h.textContent || "").toLowerCase();
          const allWords = nameWords.every((w) => txt.includes(w));
          if (allWords) {
            let card =
              h.closest("article, .Card, .card, .project") || h.parentElement;
            for (let i = 0; i < 6 && card; i++) {
              const demoBtn = card.querySelector("button, a");
              if (demoBtn) {
                try {
                  demoBtn.scrollIntoView({ behavior: "smooth", block: "center" });
                  demoBtn.click();
                } catch (e) {}
                return true;
              }
              card = card.parentElement;
            }
          }
        }
      }
    }
  } catch (e) {}
  return false;
};

/**
 * Helper: play demo
 */
export const playDemo = (nameOrSelector) => {
  try {
    let el = null;
    if (nameOrSelector)
      el = findElement(nameOrSelector) || document.querySelector(nameOrSelector);
    if (!el) el = document.querySelector("video") || document.querySelector("[data-demo]");
    if (el) {
      if (el.tagName === "VIDEO") {
        el.play?.();
        return true;
      }
      const btn = el.querySelector("button") || el;
      btn.click?.();
      return true;
    }
  } catch (e) {}
  return false;
};

/**
 * Helper: open social icons
 */
export const openSocialIcons = (services = []) => {
  try {
    const hero =
      document.getElementById("hero") ||
      document.querySelector("#hero") ||
      document.querySelector('section[id^="hero"]');
    const anchors = hero
      ? Array.from(hero.querySelectorAll("a"))
      : Array.from(document.querySelectorAll("a"));
    let acted = false;
    for (const svc of services) {
      const key = (svc || "").toLowerCase();
      let a = anchors.find((a) => (a.getAttribute("href") || "").toLowerCase().includes(key));
      if (!a)
        a = anchors.find((a) =>
          ((a.getAttribute("aria-label") || "") + " " + (a.getAttribute("title") || ""))
            .toLowerCase()
            .includes(key)
        );
      if (!a) a = anchors.find((a) => (a.innerHTML || "").toLowerCase().includes(key));
      if (!a && key === "linkedin")
        a = anchors.find(
          (a) =>
            (a.getAttribute("href") || "").toLowerCase().includes("linkedin.com") ||
            (a.getAttribute("href") || "").toLowerCase().includes("/in/")
        );
      if (!a && key === "github")
        a = anchors.find((a) =>
          (a.getAttribute("href") || "").toLowerCase().includes("github.com")
        );

      if (a) {
        try {
          a.style.outline = "3px solid #34d399";
          a.style.outlineOffset = "4px";
          a.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => {
            try {
              a.click();
            } catch (e) {}
            try {
              const href = a.getAttribute("href");
              if (href && href.startsWith("http"))
                window.open(href, "_blank", "noopener");
            } catch (e) {}
          }, 250);
          setTimeout(() => {
            a.style.outline = "";
            a.style.outlineOffset = "";
          }, 2500);
          acted = true;
        } catch (e) {}
      }
    }
    return acted;
  } catch (e) {
    console.error("openSocialIcons error", e);
    return false;
  }
};

/**
 * Local command parser
 */
export const parseLocalCommand = (t) => {
  const s = t.toLowerCase();
  if (
    s.includes("view my work") ||
    s.includes("view projects") ||
    s.includes("show my work") ||
    s === "view work"
  ) {
    return { type: "scroll", section: "projects", content: "Opening projects..." };
  }
  if (
    s.includes("download cv") ||
    s.includes("download resume") ||
    s.includes("download my cv") ||
    s === "download cv"
  ) {
    return { type: "download-cv", content: "Downloading CV..." };
  }
  const openProjectMatch =
    s.match(/open project (?:named )?"?([\w\s-]+)"?/) ||
    s.match(/open (?:the )?project "?([\w\s-]+)"?/) ||
    s.match(/^open\s+"?([\w\s-]+)"?$/);
  if (openProjectMatch)
    return {
      type: "open-project",
      selector: openProjectMatch[1].trim(),
      content: `Opening project ${openProjectMatch[1].trim()}...`,
    };
  if (
    s.includes("send message") ||
    s.includes("send my message") ||
    s.includes("submit message") ||
    s === "send"
  ) {
    return { type: "submit-contact", content: "Sending your message..." };
  }
  const filterMatch =
    s.match(/filter projects by (.+)/) || s.match(/show projects (?:with|using) (.+)/);
  if (filterMatch)
    return {
      type: "filter-projects",
      value: filterMatch[1].trim(),
      content: `Filtering projects by ${filterMatch[1].trim()}...`,
    };
  const playMatch =
    s.match(/play demo(?: of)? "?([\w\s-]+)"?/) ||
    s.match(/play (?:the )?demo(?: for)? "?([\w\s-]+)"?/);
  if (playMatch)
    return {
      type: "play-demo",
      selector: playMatch[1].trim(),
      content: `Playing demo for ${playMatch[1].trim()}...`,
    };
  const fillEmailMatch =
    s.includes("fill my email") || s.includes("fill email") || s.includes("autofill email");
  if (fillEmailMatch)
    return {
      type: "autofill-contact",
      value: {
        email:
          document.querySelector('meta[name="author"]')?.getAttribute("content") || "",
      },
      content: "Filled your email.",
    };

  const socialMap = {
    linkedin: ["linkedin", "linkdein", "linkdin", "linkdean", "jinkdien", "jinkedin"],
    github: ["github", "gitub", "githb", "git hub"],
  };
  const socials = [];
  Object.entries(socialMap).forEach(([key, variants]) => {
    for (const v of variants) {
      if (s.includes(v)) {
        socials.push(key);
        break;
      }
    }
  });
  if (socials.length)
    return {
      type: "open-socials",
      value: socials,
      content: `Opening ${socials.join(" and ")}...`,
    };
  return null;
};

/**
 * Quick social match
 */
export const quickSocialMatch = (t) => {
  const s = t.toLowerCase().trim();
  const socialMap = {
    linkedin: [
      "linkedin",
      "linkdein",
      "linkdin",
      "linkdean",
      "jinkdien",
      "jinkedin",
      "linkdean",
    ],
    github: ["github", "gitub", "githb", "git hub"],
  };
  const found = [];
  Object.entries(socialMap).forEach(([k, variants]) => {
    if (variants.includes(s)) found.push(k);
  });
  return found.length ? found : null;
};
