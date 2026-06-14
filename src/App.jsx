import { useState, useEffect } from 'react'
import './index.css'

// Rotating headline word: types a word, holds, deletes, types the next.
// Upright vermilion (the old accent colour, minus the italics).
function RotatingWord() {
  const words = ['companion', 'assistant', 'programmer', 'helper']
  const [index, setIndex] = useState(0)
  const [sub, setSub] = useState(words[0].length)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let t
    if (!deleting && sub === word.length) {
      t = setTimeout(() => setDeleting(true), 1700) // hold the full word
    } else if (deleting && sub === 0) {
      setDeleting(false)
      setIndex((index + 1) % words.length) // advance to next word
    } else {
      t = setTimeout(() => setSub(sub + (deleting ? -1 : 1)), deleting ? 45 : 90)
    }
    return () => clearTimeout(t)
  }, [sub, deleting, index])

  return (
    <span className="text-accent whitespace-nowrap">
      {words[index].slice(0, sub)}
      <span className="type-cursor" aria-hidden="true" />
    </span>
  )
}

const FEATURES = [
  {
    title: 'Voice Assistant',
    desc: 'Always-on wake word detection. Say "Jarvis" and speak naturally; on-device speech recognition with ElevenLabs or Edge TTS.',
  },
  {
    title: 'Conversational AI',
    desc: 'Multi-turn conversations powered by Claude API. Executes actions mid-conversation and remembers context across sessions.',
  },
  {
    title: 'Deep Research',
    desc: 'Multi-hop research agent across arXiv, Semantic Scholar, and the web. Multiple investigation rounds with cited reports.',
  },
  {
    title: 'Rust Sidecar',
    desc: 'Compiled Rust binary for sub-millisecond vector search, fuzzy matching, and trace analytics. Falls back to TypeScript when unavailable.',
  },
  {
    title: 'Intelligence Layer',
    desc: 'Trace-driven learning: records every command, detects habits, predicts your next action, suggests automations.',
  },
  {
    title: 'Screen Awareness',
    desc: 'OCR-based screen reading; JARVIS can see what’s on your screen and respond contextually.',
  },
  {
    title: 'Browser Automation',
    desc: 'Full Playwright-powered browser control: navigate, search, click, fill forms, read pages, screenshot.',
  },
  {
    title: 'Multi-Device',
    desc: 'Apple Watch and iPhone apps connect via AIM WebSocket relay. Same JARVIS across all your devices.',
  },
  {
    title: 'Smart Home',
    desc: 'HomeKit control via macOS Shortcuts: lights, thermostat, locks, scenes. Natural language device control.',
  },
  {
    title: 'Spotify & Media',
    desc: 'Full Spotify Web API integration plus Apple Music control: play, pause, search, playlists, queue.',
  },
  {
    title: 'Security Monitoring',
    desc: 'Always-on breach monitor, network guardian, and threat detection. Alerts on your Apple Watch.',
  },
  {
    title: 'Multi-Agent',
    desc: 'Spawn parallel agents for complex tasks: coding agent, dev agent, self-improving module generator.',
  },
  {
    title: 'Email & Calendar',
    desc: 'Gmail and Google Calendar integration: read, send, schedule. Morning digest daily briefing.',
  },
  {
    title: 'System Control',
    desc: 'Volume, brightness, dark mode, DND, sleep, lock; full macOS control with 200+ commands.',
  },
  {
    title: 'WhatsApp',
    desc: 'Instant WhatsApp messaging via the multi-device protocol (Baileys) — sub-second sends, no browser.',
  },
]

const COMMANDS = [
  { cmd: 'research quantum computing', result: '15 papers analyzed, report saved' },
  { cmd: 'battery', result: 'Battery: 85%, charging' },
  { cmd: 'play Osamason on Spotify', result: 'Playing on Spotify...' },
  { cmd: 'deep research AI agents', result: '4 rounds, 28 papers, 12 web sources' },
  { cmd: 'good morning', result: 'Running morning routine...' },
  { cmd: 'turn off living room lights', result: 'HomeKit: lights off' },
  { cmd: "what's on my screen?", result: 'I can see VS Code open with...' },
  { cmd: 'whatsapp mom running late', result: 'Message sent to mom' },
]

const STATS = [
  { value: '45+', label: 'Modules' },
  { value: '500+', label: 'Commands' },
  { value: '7', label: 'Parse Phases' },
  { value: '4', label: 'Engines' },
]

const PARSE_PHASES = [
  'Variable Expansion',
  'Alias',
  'Pattern',
  'Keyword',
  'Rust Fuzzy',
  'NLU',
  'Conversation AI',
]

const BACKENDS = [
  { name: 'TypeScript', desc: 'Core runtime, module orchestration, conversation loop.' },
  { name: 'Rust Sidecar', desc: 'Sub-millisecond vector search, fuzzy match, trace analytics.' },
  { name: 'Swift', desc: 'Native macOS, Apple Watch and iPhone companion apps.' },
  { name: 'AppleScript / Shell', desc: 'System control, Shortcuts, and deep macOS integration.' },
]

const GITHUB_URL = 'https://github.com/ArhanCodes/jarvis'

function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-paper/80 backdrop-blur-md border-b border-line">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono font-bold tracking-widest text-ink text-sm">
          JARVIS
        </a>
        <div className="flex items-center gap-7 text-sm">
          <a href="#features" className="text-ink-2 hover:text-accent transition-colors">
            Features
          </a>
          <a href="/docs" className="text-ink-2 hover:text-accent transition-colors">
            Docs
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-2 hover:text-accent transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section id="top" className="bg-grid relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 pt-40 pb-28 md:pt-48 md:pb-36">
        <p className="eyebrow fade-up d1">Just A Rather Very Intelligent System</p>

        <h1 className="display text-5xl sm:text-6xl lg:text-7xl leading-[1.04] mt-6 max-w-4xl fade-up d2">
          Your macOS <RotatingWord />
        </h1>

        <p className="text-ink-2 text-lg md:text-xl leading-relaxed mt-8 max-w-2xl fade-up d3">
          A macOS AI assistant with voice control, screen awareness, browser automation, and
          connection across Apple devices.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-10 fade-up d4">
          <a href="/docs" className="btn btn-accent">
            Read the docs <span aria-hidden="true">&rarr;</span>
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            View on GitHub
          </a>
          <span className="pill ml-1">
            <span className="wave" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </span>
            Listening
          </span>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y border-line bg-paper-2/40">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y divide-line md:divide-y-0 md:divide-x">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-2 py-6 md:py-2 text-center md:text-left md:px-10">
              <div className="display text-5xl md:text-6xl text-ink">{stat.value}</div>
              <div className="eyebrow mt-3">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Demo() {
  return (
    <section className="bg-grid">
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <p className="eyebrow">Talk to it like a person</p>
        <h2 className="display text-4xl md:text-5xl mt-5 max-w-3xl leading-tight">
          Plain language in.{' '}
          <span className="display-italic">Real action out.</span>
        </h2>

        <div className="card mt-12 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-line">
            <span className="w-3 h-3 rounded-full border border-line bg-paper-3" />
            <span className="w-3 h-3 rounded-full border border-line bg-paper-3" />
            <span className="w-3 h-3 rounded-full border border-line bg-paper-3" />
            <span className="mono text-xs text-ink-3 ml-3 tracking-wide">
              jarvis — voice-daemon
            </span>
          </div>

          <div className="p-6 md:p-8 mono text-sm md:text-[0.95rem] leading-relaxed">
            {COMMANDS.map((c) => (
              <div key={c.cmd} className="py-1.5">
                <span className="text-ink-3 select-none">jarvis&gt;</span>{' '}
                <span className="text-ink">{c.cmd}</span>
                <span className="text-accent">{'  -> '}{c.result}</span>
              </div>
            ))}
            <div className="py-1.5">
              <span className="text-ink-3 select-none">jarvis&gt;</span>{' '}
              <span className="text-accent" aria-hidden="true">
                &#9608;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ index, title, desc, delayClass }) {
  return (
    <article className={`card p-6 md:p-7 text-left fade-up ${delayClass}`}>
      <span className="mono text-xs text-accent tracking-widest">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="display text-2xl mt-3 text-ink">{title}</h3>
      <p className="text-ink-2 text-sm leading-relaxed mt-3">{desc}</p>
    </article>
  )
}

function Features() {
  return (
    <section id="features" className="border-t border-line">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <p className="eyebrow">Fifteen things it does</p>
        <h2 className="display text-4xl md:text-5xl mt-5 max-w-3xl leading-tight">
          One assistant for{' '}
          <span className="display-italic">everything on your Mac.</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={f.title}
              index={i}
              title={f.title}
              desc={f.desc}
              delayClass={`d${(i % 6) + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Architecture() {
  return (
    <section className="bg-paper-2/40 border-t border-line">
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <p className="eyebrow">Under the hood</p>
        <h2 className="display text-4xl md:text-5xl mt-5 max-w-3xl leading-tight">
          Seven phases before{' '}
          <span className="display-italic">it ever guesses.</span>
        </h2>

        <p className="text-ink-2 text-lg leading-relaxed mt-8 max-w-2xl">
          Every input runs through a deterministic parsing pipeline. Cheap, exact matches resolve
          first; the language model is the last resort, not the first.
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-3 mt-12">
          {PARSE_PHASES.map((phase, i) => (
            <span key={phase} className="inline-flex items-center gap-3">
              <span className="mono text-sm text-ink border border-line bg-paper rounded-full px-4 py-2">
                <span className="text-accent">{i + 1}.</span> {phase}
              </span>
              {i < PARSE_PHASES.length - 1 && (
                <span className="text-ink-3 mono" aria-hidden="true">
                  &rarr;
                </span>
              )}
            </span>
          ))}
        </div>

        <hr className="rule my-14" />

        <p className="eyebrow">Four execution backends</p>
        <div className="grid sm:grid-cols-2 gap-5 mt-8">
          {BACKENDS.map((b) => (
            <div key={b.name} className="card p-6">
              <h3 className="display text-xl text-ink">{b.name}</h3>
              <p className="text-ink-2 text-sm leading-relaxed mt-2">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a href="/docs" className="text-accent font-medium hover:underline underline-offset-4">
            Read the full architecture docs <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="max-w-md">
            <p className="font-mono font-bold tracking-widest text-ink">J.A.R.V.I.S.</p>
            <p className="text-ink-2 text-sm leading-relaxed mt-3">
              Just A Rather Very Intelligent System. A macOS AI assistant with voice, screen
              awareness, deep research, and a Rust performance sidecar.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm" aria-label="Footer">
            <a href="#features" className="text-ink-2 hover:text-accent transition-colors">
              Features
            </a>
            <a href="/docs" className="text-ink-2 hover:text-accent transition-colors">
              Docs
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-2 hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>

        <hr className="rule my-10" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-ink-3">
          <span className="mono">Built by Arhan Harchandani</span>
          <span className="mono">macOS 13+ &middot; Node 20+</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Demo />
        <Features />
        <Architecture />
      </main>
      <Footer />
    </div>
  )
}
