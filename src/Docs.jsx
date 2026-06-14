import { useState, useEffect } from 'react'
import './index.css'

const SECTIONS = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'modules', label: 'Modules' },
  { id: 'voice', label: 'Voice' },
  { id: 'plugins', label: 'Plugins' },
]

const PARSE_PHASES = [
  { name: 'Variable Expansion', desc: 'Expands $variables and ${expressions} in the raw input.' },
  { name: 'Alias Expansion', desc: 'Resolves user-defined command aliases.' },
  { name: 'Pattern Parser', desc: 'Regex-based pattern matching for structured commands.' },
  { name: 'Keyword Match', desc: 'Direct keyword lookup against registered module commands.' },
  { name: 'Rust Fuzzy Match', desc: 'Sub-millisecond fuzzy matching via the Rust sidecar (falls back to TypeScript).' },
  { name: 'NLU Mapping', desc: 'Natural-language understanding for intent classification.' },
  { name: 'Conversation AI', desc: 'Claude API multi-turn conversation with mid-conversation action execution.' },
]

const BACKENDS = [
  { name: 'TypeScript', desc: 'Core logic, API calls, and orchestration.' },
  { name: 'Rust Sidecar', desc: 'Vector search, fuzzy matching, and trace analytics.' },
  { name: 'Swift', desc: 'Apple Watch and iPhone companion apps.' },
  { name: 'AppleScript / Shell', desc: 'macOS system control and app automation.' },
]

const MODULE_CATEGORIES = [
  {
    name: 'Core',
    count: 10,
    modules: ['App Launcher', 'System Monitor', 'File Ops', 'Clipboard', 'Window Manager', 'Timer', 'Media Control', 'Conversions', 'Process Manager', 'Script Runner'],
  },
  {
    name: 'AI & Research',
    count: 6,
    modules: ['AI Chat', 'Research', 'Smart Assist', 'Personality', 'Screen Awareness', 'Screen Interaction'],
  },
  {
    name: 'Communications',
    count: 5,
    modules: ['Email', 'Calendar', 'WhatsApp', 'Comms Stack', 'Dossier'],
  },
  {
    name: 'Automation',
    count: 8,
    modules: ['Workflows', 'Scheduler', 'Smart Routines', 'Coding Agent', 'Dev Agent', 'Self-Improve', 'Multi-Agent', 'Sandbox Runner'],
  },
  {
    name: 'Media & Entertainment',
    count: 3,
    modules: ['Spotify', 'YouTube Tools', 'Media Control'],
  },
  {
    name: 'Smart Home & IoT',
    count: 2,
    modules: ['Smart Home', 'Energy Monitor'],
  },
  {
    name: 'Data & Intelligence',
    count: 5,
    modules: ['Data Connectors', 'Deep Research', 'File Intelligence', 'Morning Digest', 'API Orchestrator'],
  },
  {
    name: 'Security',
    count: 3,
    modules: ['Breach Monitor', 'Network Guardian', 'Threat Monitor'],
  },
]

const DEMO_COMMANDS = [
  { cmd: 'research quantum computing', result: '15 papers analyzed, report saved' },
  { cmd: 'battery', result: 'Battery: 85%, charging' },
  { cmd: 'play Osamason on Spotify', result: 'Playing on Spotify...' },
  { cmd: 'deep research AI agents', result: '4 rounds, 28 papers, 12 web sources' },
  { cmd: 'good morning', result: 'Running morning routine...' },
  { cmd: 'turn off living room lights', result: 'HomeKit: lights off' },
  { cmd: "what's on my screen?", result: 'I can see VS Code open with...' },
  { cmd: 'whatsapp mom running late', result: 'Message sent to mom' },
]

/* ── Small building blocks ────────────────────────────────────────── */

function Eyebrow({ children }) {
  return <div className="eyebrow mb-4">{children}</div>
}

function SectionHeading({ children }) {
  return <h2 className="display text-4xl md:text-5xl leading-tight mb-6">{children}</h2>
}

function SubHeading({ children }) {
  return <h3 className="display text-2xl mt-12 mb-4">{children}</h3>
}

function Prose({ children }) {
  return <p className="text-ink-2 leading-relaxed mb-5 text-[1.05rem]">{children}</p>
}

function Code({ children }) {
  return <code className="mono text-[0.86em] text-accent bg-paper-2 px-1.5 py-0.5 rounded border border-line">{children}</code>
}

function CodeBlock({ label, children }) {
  return (
    <div className="bg-paper-2 border border-line rounded-2xl overflow-hidden mb-6">
      {label && (
        <div className="px-4 py-2.5 border-b border-line eyebrow text-[0.62rem]">{label}</div>
      )}
      <pre className="p-4 md:p-5 mono text-[0.82rem] leading-relaxed text-ink-2 overflow-x-auto">{children}</pre>
    </div>
  )
}

function Bullets({ items }) {
  return (
    <ul className="space-y-3 mb-6">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-ink-2 leading-relaxed text-[1.02rem]">
          <span className="text-accent mt-0.5 flex-shrink-0">—</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

/* ── Sections ─────────────────────────────────────────────────────── */

function GettingStarted() {
  return (
    <section id="getting-started" className="scroll-mt-28 mb-24">
      <Eyebrow>01 — Setup</Eyebrow>
      <SectionHeading>
        Getting <span className="display-italic">started</span>
      </SectionHeading>
      <Prose>
        J.A.R.V.I.S. is a macOS AI assistant built in TypeScript with a Rust performance
        sidecar, Swift companion apps, and Claude-powered conversation. It runs as a CLI
        daemon with optional always-on voice activation.
      </Prose>

      <SubHeading>Requirements</SubHeading>
      <Bullets
        items={[
          <><strong className="text-ink">macOS 13 (Ventura)</strong> or later</>,
          <><strong className="text-ink">Node.js 20+</strong></>,
          <><strong className="text-ink">Xcode Command Line Tools</strong> — for voice and screen features</>,
          <><strong className="text-ink">Rust toolchain</strong> — optional, for building the sidecar</>,
          <><strong className="text-ink">Claude API key</strong> — for the conversation engine</>,
        ]}
      />

      <SubHeading>Installation</SubHeading>
      <Prose>
        Clone the repo, install dependencies, drop your Claude API key into the config, and
        start the dev daemon.
      </Prose>
      <CodeBlock label="terminal">
{`$ git clone https://github.com/ArhanCodes/jarvis.git
$ cd jarvis
$ npm install
$ # add your Claude API key to config/llm-config.json
$ npm run dev`}
      </CodeBlock>
      <Prose>
        Configuration lives in the <Code>config/</Code> directory. Set your Claude API key in{' '}
        <Code>config/llm-config.json</Code> before first run. The Rust sidecar is optional —
        when present, JARVIS uses it for sub-millisecond fuzzy matching and vector search,
        and falls back to the TypeScript implementation when it is not.
      </Prose>

      <SubHeading>Your first commands</SubHeading>
      <Prose>Once running, type naturally at the prompt. A few to try:</Prose>
      <div className="bg-paper-2 border border-line rounded-2xl overflow-hidden">
        {DEMO_COMMANDS.map((d, i) => (
          <div
            key={i}
            className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-4 py-3 mono text-[0.82rem] ${
              i !== DEMO_COMMANDS.length - 1 ? 'border-b border-line' : ''
            }`}
          >
            <span className="text-accent font-semibold flex-shrink-0 sm:w-72">
              jarvis&gt; {d.cmd}
            </span>
            <span className="text-ink-3">{d.result}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Architecture() {
  return (
    <section id="architecture" className="scroll-mt-28 mb-24">
      <Eyebrow>02 — Internals</Eyebrow>
      <SectionHeading>
        How it <span className="display-italic">thinks</span>
      </SectionHeading>
      <Prose>
        Every input flows through a <strong className="text-ink">7-phase parsing pipeline</strong> before
        it ever reaches the AI. Most commands resolve in sub-millisecond time without any LLM
        call — the conversation engine is the last resort, not the first.
      </Prose>

      <SubHeading>The parsing pipeline</SubHeading>
      <div className="space-y-3 mb-10">
        {PARSE_PHASES.map((p, i) => (
          <div key={i} className="card p-5 flex items-start gap-4">
            <div className="mono text-sm font-bold text-accent flex-shrink-0 w-8 h-8 rounded-full border-[1.5px] border-accent flex items-center justify-center">
              {i + 1}
            </div>
            <div>
              <div className="font-display text-lg text-ink leading-tight">{p.name}</div>
              <div className="text-ink-3 text-sm mt-1 leading-relaxed">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <SubHeading>Execution backends</SubHeading>
      <Prose>
        Once a command matches, it routes to one of four execution backends depending on what
        it needs to control:
      </Prose>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {BACKENDS.map((b, i) => (
          <div key={i} className="card p-5">
            <div className="mono text-sm font-bold text-accent mb-1.5">{b.name}</div>
            <div className="text-ink-2 text-sm leading-relaxed">{b.desc}</div>
          </div>
        ))}
      </div>

      <SubHeading>Rust sidecar</SubHeading>
      <Prose>
        The Rust sidecar is a compiled binary that handles performance-critical work —{' '}
        <strong className="text-ink">vector search</strong> over memory embeddings,{' '}
        <strong className="text-ink">fuzzy matching</strong> against the full command registry,
        and <strong className="text-ink">trace analytics</strong>. It speaks JSON-over-stdio to
        the TypeScript host and is started automatically. If it is missing or crashes, JARVIS
        falls back to TypeScript with no loss of functionality.
      </Prose>

      <SubHeading>Intelligence layer</SubHeading>
      <Prose>
        JARVIS learns from usage. Every command, its context, and its outcome are recorded as a
        trace. The intelligence layer analyzes these traces with{' '}
        <strong className="text-ink">trace-driven learning</strong> to detect habits, predict
        your next action, and suggest automations — so the assistant gets sharper the more you
        use it.
      </Prose>
    </section>
  )
}

function Modules() {
  return (
    <section id="modules" className="scroll-mt-28 mb-24">
      <Eyebrow>03 — Capabilities</Eyebrow>
      <SectionHeading>
        Forty-five <span className="display-italic">modules</span>
      </SectionHeading>
      <Prose>
        JARVIS ships with 45+ modules across 8 categories. Each registers its commands via the{' '}
        <Code>@RegisterModule()</Code> decorator and is hot-reloadable at runtime.
      </Prose>

      <div className="grid md:grid-cols-2 gap-5 mt-8">
        {MODULE_CATEGORIES.map((cat) => (
          <div key={cat.name} className="card p-6">
            <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-line">
              <h3 className="font-display text-xl text-ink">{cat.name}</h3>
              <span className="eyebrow text-[0.6rem]">{cat.count} modules</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.modules.map((m) => (
                <span
                  key={m}
                  className="mono text-[0.72rem] text-ink-2 bg-paper-2 px-2.5 py-1 rounded-full border border-line"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Voice() {
  return (
    <section id="voice" className="scroll-mt-28 mb-24">
      <Eyebrow>04 — Hands-free</Eyebrow>
      <SectionHeading>
        Just say <span className="display-italic">Jarvis</span>
      </SectionHeading>

      <div className="mb-6">
        <span className="pill">
          Listening
          <span className="wave"><i></i><i></i><i></i><i></i><i></i></span>
        </span>
      </div>

      <Prose>
        JARVIS supports always-on voice activation with the wake word{' '}
        <strong className="text-ink">"Jarvis"</strong>. Speech recognition runs{' '}
        <strong className="text-ink">on-device</strong>, and responses stream back
        sentence-by-sentence so you hear the first words while the rest is still generating.
      </Prose>

      <SubHeading>How it works</SubHeading>
      <Bullets
        items={[
          <>Say <strong className="text-ink">"Jarvis"</strong> — the wake word is detected on-device using macOS native speech recognition.</>,
          <>Your command is transcribed locally and sent through the standard 7-phase parser pipeline.</>,
          <>Responses are synthesized <strong className="text-ink">sentence-by-sentence</strong> with streaming TTS via <strong className="text-ink">ElevenLabs</strong> (or Edge TTS as a free fallback).</>,
          <>Interrupt at any time — just say <strong className="text-ink">"Jarvis"</strong> mid-response to cut it off and issue a new command.</>,
        ]}
      />

      <SubHeading>A voice session</SubHeading>
      <CodeBlock label="npm run voice">
{`✓ Voice assistant started. Say "Jarvis" to activate.
Listening...

[wake-word] Detected: "Jarvis"
[recording] Listening for command...
[stt]       "what's the weather like?"
[parser]    → conversation-engine
[tts]       Speaking response (ElevenLabs)...`}
      </CodeBlock>
    </section>
  )
}

function Plugins() {
  return (
    <section id="plugins" className="scroll-mt-28 mb-12">
      <Eyebrow>05 — Extend</Eyebrow>
      <SectionHeading>
        Write your own <span className="display-italic">modules</span>
      </SectionHeading>
      <Prose>
        JARVIS uses a decorator-based module system. Every module is a class decorated with{' '}
        <Code>@RegisterModule()</Code> that declares its commands, patterns, and handlers.
        Modules are <strong className="text-ink">hot-reloadable</strong> at runtime — drop a
        file in, no restart needed.
      </Prose>

      <SubHeading>Creating a module</SubHeading>
      <CodeBlock label="src/modules/my-module.ts">
{`import { RegisterModule, Module } from '../core/types'

@RegisterModule({
  name: 'my-module',
  description: 'A custom JARVIS module',
  keywords: ['mycommand', 'custom'],
  patterns: [/my custom (\\w+)/i],
})
export class MyModule implements Module {
  async handle(input: string, match?: RegExpMatchArray) {
    const arg = match?.[1] || input
    return { response: \`Handled: \${arg}\` }
  }
}`}
      </CodeBlock>

      <SubHeading>Generate one for yourself</SubHeading>
      <Prose>
        JARVIS can write new modules from a natural-language description. The self-improve
        module analyzes your request, generates TypeScript, validates it, and hot-loads it
        into the running system.
      </Prose>
      <CodeBlock label="jarvis">
{`jarvis> self-improve: create a pomodoro timer module
  Analyzing request...
  Generating module: pomodoro-timer
  Validating TypeScript...
  Module registered: pomodoro-timer (3 commands)
  ✓ Ready: "pomodoro start", "pomodoro stop", "pomodoro status"`}
      </CodeBlock>
      <Prose>
        Install community plugins the same way, or share your own. Every module — yours or
        built-in — runs through the identical registry, parser, and intelligence layer.
      </Prose>
    </section>
  )
}

/* ── Page shell ───────────────────────────────────────────────────── */

function Docs() {
  const [active, setActive] = useState('getting-started')

  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-paper text-ink bg-grid">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-paper/80 backdrop-blur-md border-b border-line">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="mono font-bold tracking-[0.22em] text-ink text-sm">
            JARVIS
          </a>
          <div className="flex items-center gap-6 text-sm">
            <a href="#getting-started" className="hidden sm:inline text-ink-2 hover:text-accent transition-colors">
              Overview
            </a>
            <a href="#modules" className="hidden sm:inline text-ink-2 hover:text-accent transition-colors">
              Modules
            </a>
            <a href="#architecture" className="hidden sm:inline text-ink-2 hover:text-accent transition-colors">
              Architecture
            </a>
            <a
              href="https://github.com/ArhanCodes/jarvis"
              target="_blank"
              rel="noopener"
              className="btn btn-outline !py-2 !px-4 !text-[0.8rem]"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Header band */}
      <header className="pt-36 pb-14 px-6 border-b border-line">
        <div className="max-w-6xl mx-auto fade-up">
          <Eyebrow>Documentation</Eyebrow>
          <h1 className="display text-5xl md:text-6xl leading-tight">
            The <span className="display-italic">J.A.R.V.I.S.</span> handbook
          </h1>
          <p className="text-ink-2 text-lg mt-5 max-w-2xl leading-relaxed">
            A macOS AI assistant with voice control, screen awareness, deep research, a Rust
            performance sidecar, and multi-device support. Everything you need to install,
            understand, and extend it.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8 mono text-[0.78rem] text-ink-3">
            <span><span className="text-accent font-bold">45+</span> Modules</span>
            <span><span className="text-accent font-bold">500+</span> Commands</span>
            <span><span className="text-accent font-bold">7</span> Parse Phases</span>
            <span><span className="text-accent font-bold">4</span> Engines</span>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="max-w-6xl mx-auto px-6 flex gap-12 pt-14">
        {/* Sidebar */}
        <aside className="hidden md:block w-52 flex-shrink-0">
          <div className="sticky top-28">
            <div className="eyebrow mb-4">On this page</div>
            <nav className="space-y-1 border-l border-line">
              {SECTIONS.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActive(s.id)}
                  className={`block pl-4 -ml-px py-1.5 text-sm border-l-2 transition-colors ${
                    active === s.id
                      ? 'border-accent text-accent font-medium'
                      : 'border-transparent text-ink-3 hover:text-ink'
                  }`}
                >
                  <span className="mono text-[0.7rem] mr-2 text-ink-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 max-w-3xl pb-24 fade-up d2">
          <GettingStarted />
          <hr className="rule mb-24" />
          <Architecture />
          <hr className="rule mb-24" />
          <Modules />
          <hr className="rule mb-24" />
          <Voice />
          <hr className="rule mb-24" />
          <Plugins />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-line bg-paper px-6 py-14">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="mono font-bold tracking-[0.22em] text-ink text-sm mb-1">
              J.A.R.V.I.S.
            </div>
            <p className="text-ink-3 text-sm max-w-sm leading-relaxed">
              Just A Rather Very Intelligent System — a self-improving macOS AI assistant.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="/" className="text-ink-2 hover:text-accent transition-colors">
              Home
            </a>
            <a href="/docs" className="text-ink-2 hover:text-accent transition-colors">
              Docs
            </a>
            <a
              href="https://github.com/ArhanCodes/jarvis"
              target="_blank"
              rel="noopener"
              className="text-ink-2 hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-line text-ink-3 text-xs">
          Built by{' '}
          <a
            href="https://arhan.dev"
            target="_blank"
            rel="noopener"
            className="text-ink-2 hover:text-accent transition-colors"
          >
            Arhan Harchandani
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Docs
