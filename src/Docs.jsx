import { useState, useEffect } from 'react'
import './index.css'

/* ── Sidebar map ──────────────────────────────────────────────────── */

const SECTIONS = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'voice', label: 'Voice & Conversation' },
  { id: 'system', label: 'System & Apps' },
  { id: 'files-control', label: 'Files & Control' },
  { id: 'media-browser', label: 'Media & Browser' },
  { id: 'screen', label: 'Screen Awareness' },
  { id: 'comms', label: 'Comms & WhatsApp' },
  { id: 'info', label: 'Weather, News & Info' },
  { id: 'automation', label: 'Automation' },
  { id: 'ai-research', label: 'AI & Research' },
  { id: 'productivity', label: 'Email & Calendar' },
  { id: 'smart-home', label: 'Smart Home' },
  { id: 'intelligence', label: 'Intelligence Layer' },
  { id: 'multi-device', label: 'Multi-Device' },
  { id: 'plugins', label: 'Plugins' },
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

function Lead({ children }) {
  return <p className="text-ink-2 leading-relaxed mb-7 text-[1.08rem]">{children}</p>
}

function Code({ children }) {
  return (
    <code className="mono text-[0.86em] text-accent bg-paper-2 px-1.5 py-0.5 rounded border border-line">
      {children}
    </code>
  )
}

function CodeBlock({ label, children }) {
  return (
    <div className="bg-paper-2 border border-line rounded-2xl overflow-hidden mb-6">
      {label && (
        <div className="px-4 py-2.5 border-b border-line eyebrow text-[0.62rem]">{label}</div>
      )}
      <pre className="p-4 md:p-5 mono text-[0.82rem] leading-relaxed text-ink-2 overflow-x-auto">
        {children}
      </pre>
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

/* Scannable command list: mono command on the left, plain description on the right. */
function CommandList({ rows }) {
  return (
    <div className="bg-paper-2 border border-line rounded-2xl overflow-hidden mb-7">
      {rows.map((r, i) => (
        <div
          key={i}
          className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-5 px-4 py-3 ${
            i !== rows.length - 1 ? 'border-b border-line' : ''
          }`}
        >
          <code className="mono text-[0.8rem] text-accent font-medium flex-shrink-0 sm:w-[46%] leading-relaxed">
            {r.cmd}
          </code>
          <span className="text-ink-2 text-[0.92rem] leading-relaxed">{r.desc}</span>
        </div>
      ))}
    </div>
  )
}

/* A titled card holding a CommandList — used to group a module's commands. */
function ModuleBlock({ title, intro, rows, children }) {
  return (
    <div className="mb-12">
      <h3 className="display text-2xl mb-2">{title}</h3>
      {intro && <p className="text-ink-2 leading-relaxed mb-4 text-[1.02rem]">{intro}</p>}
      {rows && <CommandList rows={rows} />}
      {children}
    </div>
  )
}

/* ── Reference data ───────────────────────────────────────────────── */

const PARSE_PHASES = [
  { name: 'Variable Expansion', desc: 'Expands $HOME, $DATE, $TIME and your own custom $vars before anything else runs.' },
  { name: 'Alias Expansion', desc: 'Resolves user-defined shortcuts into the full commands they stand for.' },
  { name: 'Pattern Parser', desc: 'Each module declares regex patterns; the first match wins with confidence 1.0.' },
  { name: 'Keyword Match', desc: 'Exact keyword lookup against every registered module (confidence 0.6).' },
  { name: 'Rust Fuzzy Match', desc: 'Levenshtein typo correction via the Rust sidecar — "baterry" still resolves to battery.' },
  { name: 'NLU Mapping', desc: 'Natural-language phrases mapped onto existing commands (confidence 0.5).' },
  { name: 'Conversation AI', desc: 'If nothing matches, the input is treated as natural language and handed to Claude.' },
]

const BACKENDS = [
  { name: 'TypeScript', desc: 'Core logic, the parser, module orchestration, and all API calls.' },
  { name: 'Rust Sidecar', desc: 'Sub-millisecond vector search, fuzzy matching, and trace analytics.' },
  { name: 'Swift', desc: 'Native Apple Watch and iPhone companion apps plus the macOS menubar.' },
  { name: 'AppleScript / Shell', desc: 'macOS system control, app automation, and native tools like mdfind and pmset.' },
]

/* ── Sections ─────────────────────────────────────────────────────── */

function GettingStarted() {
  return (
    <section id="getting-started" className="scroll-mt-28 mb-24">
      <Eyebrow>01 — Setup</Eyebrow>
      <SectionHeading>Getting started</SectionHeading>
      <Lead>
        J.A.R.V.I.S. — Just A Rather Very Intelligent System — is a macOS AI assistant with
        voice control, screen awareness, browser automation, 45+ modules, a Rust performance
        sidecar, and companion apps on Apple Watch and iPhone. It runs as a CLI daemon with
        optional always-on voice activation.
      </Lead>

      <SubHeading>Requirements</SubHeading>
      <Bullets
        items={[
          <><strong className="text-ink">macOS 13 (Ventura) or later</strong> — tested on macOS 14 Sonoma, Apple Silicon.</>,
          <><strong className="text-ink">Node.js 20+</strong>.</>,
          <><strong className="text-ink">Xcode Command Line Tools</strong> for voice and screen features — <Code>xcode-select --install</Code>.</>,
          <><strong className="text-ink">Rust toolchain</strong> — optional, only needed to build the performance sidecar.</>,
          <><strong className="text-ink">Claude API key</strong> — powers the conversation engine and AI commands.</>,
        ]}
      />

      <SubHeading>Install</SubHeading>
      <Prose>
        Clone the repo, install dependencies, drop your Claude API key into the config, and start
        the dev daemon. No build step is required in development.
      </Prose>
      <CodeBlock label="terminal">
{`$ git clone https://github.com/ArhanCodes/jarvis
$ cd jarvis
$ npm install
$ # add your Claude API key to config/llm-config.json
$ npm run dev`}
      </CodeBlock>
      <Prose>
        Configuration lives in <Code>config/</Code>. The Rust sidecar is optional — build it with{' '}
        <Code>cd rust-sidecar && cargo build --release</Code>, and JARVIS falls back to TypeScript
        with no loss of functionality when it is absent. To install globally, run{' '}
        <Code>npm link</Code> and then just type <Code>jarvis</Code> anywhere.
      </Prose>

      <SubHeading>Your first commands</SubHeading>
      <Prose>Once running, type naturally at the prompt — or say "Jarvis" to go hands-free.</Prose>
      <CommandList
        rows={[
          { cmd: 'battery', desc: 'Charge %, charging state, and time remaining.' },
          { cmd: 'open Safari', desc: 'Launch any application by name.' },
          { cmd: 'play Daft Punk', desc: 'Search and play on Spotify or Apple Music.' },
          { cmd: 'good morning', desc: 'Run a routine that chains weather, news, and volume.' },
          { cmd: 'ask what is recursion', desc: 'Chat with the Claude-powered AI.' },
          { cmd: 'message mom running late', desc: 'Send a WhatsApp message instantly.' },
        ]}
      />
    </section>
  )
}

function CoreConcepts() {
  return (
    <section id="core-concepts" className="scroll-mt-28 mb-24">
      <Eyebrow>02 — Internals</Eyebrow>
      <SectionHeading>Core concepts</SectionHeading>
      <Lead>
        Every input flows through a <strong className="text-ink">seven-phase parser</strong> before
        it ever reaches the AI. Most commands resolve instantly with no LLM call at all — the
        conversation engine is the last resort, not the first.
      </Lead>

      <SubHeading>The 7-phase parser</SubHeading>
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

      <SubHeading>Four execution backends</SubHeading>
      <Prose>
        Once a command matches, it routes to one of four backends depending on what it needs to
        control:
      </Prose>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {BACKENDS.map((b, i) => (
          <div key={i} className="card p-5">
            <div className="mono text-sm font-bold text-accent mb-1.5">{b.name}</div>
            <div className="text-ink-2 text-sm leading-relaxed">{b.desc}</div>
          </div>
        ))}
      </div>

      <SubHeading>Command chaining</SubHeading>
      <Prose>
        Run multiple commands in sequence with <Code>&&</Code> or <Code>;</Code>. Each step runs in
        order and reports its own result.
      </Prose>
      <CodeBlock label="jarvis">
{`jarvis> battery && cpu && disk
  ✓ Battery: 85% ...
  ✓ CPU: Apple M3 ...
  ✓ Disk: 45% used ...

jarvis> open Safari; open Chrome; tile Safari left; tile Chrome right`}
      </CodeBlock>

      <SubHeading>Variables</SubHeading>
      <Prose>
        Built-in variables expand automatically, and you can define your own with{' '}
        <Code>set name = value</Code>.
      </Prose>
      <CommandList
        rows={[
          { cmd: '$HOME  $USER  $PWD', desc: 'Home directory, username, current directory.' },
          { cmd: '$DATE  $TIME  $NOW', desc: 'Today, current time, and a full timestamp.' },
          { cmd: '$UPTIME', desc: 'How long the current session has been running.' },
          { cmd: 'set mydir = ~/Projects', desc: 'Define a custom variable, then use $mydir anywhere.' },
        ]}
      />

      <SubHeading>Aliases, history & startup</SubHeading>
      <Prose>
        Create shortcuts for anything, replay past commands, and auto-run commands on launch.
      </Prose>
      <CommandList
        rows={[
          { cmd: 'alias deploy = run npm run build', desc: 'Create a shortcut for any command.' },
          { cmd: 'aliases', desc: 'List every alias you have defined.' },
          { cmd: 'history', desc: 'Show recent commands — persistent across sessions.' },
          { cmd: '!!', desc: 'Repeat the last command.' },
          { cmd: 'history search volume', desc: 'Search command history.' },
          { cmd: 'startup add battery', desc: 'Auto-run a command every time JARVIS launches.' },
        ]}
      />

      <SubHeading>Fuzzy matching & typos</SubHeading>
      <Prose>
        JARVIS uses Levenshtein distance to tolerate typos. Anything within an edit distance of 2
        from a known keyword still works.
      </Prose>
      <CodeBlock label="jarvis">
{`jarvis> baterry
  ✓ Battery: 85% ...

jarvis> neetwork
  ✓ Network: 192.168.1.5, WiFi: MyNetwork`}
      </CodeBlock>
    </section>
  )
}

function VoiceConversation() {
  return (
    <section id="voice" className="scroll-mt-28 mb-24">
      <Eyebrow>03 — Hands-free</Eyebrow>
      <SectionHeading>Voice &amp; conversation</SectionHeading>

      <div className="mb-6">
        <span className="pill">
          Listening
          <span className="wave"><i></i><i></i><i></i><i></i><i></i></span>
        </span>
      </div>

      <Lead>
        JARVIS has an always-on voice assistant with the wake word{' '}
        <strong className="text-ink">"Jarvis"</strong>. Speech recognition runs on-device, and
        responses stream back sentence-by-sentence so you hear the first words while the rest is
        still being generated.
      </Lead>

      <SubHeading>How voice works</SubHeading>
      <Bullets
        items={[
          <>Say <strong className="text-ink">"Jarvis"</strong> — the wake word is detected on-device with Apple's SFSpeechRecognizer.</>,
          <>Your command is transcribed locally and sent through the standard 7-phase parser.</>,
          <>Responses are synthesized <strong className="text-ink">sentence-by-sentence</strong> with streaming TTS via <strong className="text-ink">ElevenLabs</strong>, or Edge TTS as a free fallback.</>,
          <>Interrupt at any time — say <strong className="text-ink">"Jarvis"</strong> mid-response to cut it off and issue a new command.</>,
        ]}
      />
      <CommandList
        rows={[
          { cmd: 'voice on  /  voice off', desc: 'Start or stop the always-on wake-word listener.' },
          { cmd: 'set voice <name>', desc: 'Choose the TTS voice.' },
        ]}
      />

      <SubHeading>The conversation engine</SubHeading>
      <Prose>
        Beyond single commands, JARVIS runs a multi-turn conversation engine powered by Claude. It
        understands context, executes actions mid-conversation, and remembers facts across
        sessions. It detects <Code>[ACTION:]</Code> tags in its own replies and runs them in real
        time, and <Code>[REMEMBER:]</Code> tags to persist memory.
      </Prose>
      <CodeBlock label="jarvis">
{`jarvis> turn on dark mode and set volume to 30
  [action] dark mode on
  ✓ Dark mode enabled
  [action] volume 30
  ✓ Volume set to 30%
  Done — dark mode is on and volume is at 30%.

jarvis> remember that my project deadline is March 20th
  ✓ Noted — I'll remember your project deadline is March 20th.`}
      </CodeBlock>
      <CommandList
        rows={[
          { cmd: 'clear chat  /  new conversation', desc: 'Reset the conversation history.' },
          { cmd: 'ai status', desc: 'Check the LLM connection and active model.' },
        ]}
      />
    </section>
  )
}

function SystemApps() {
  return (
    <section id="system" className="scroll-mt-28 mb-24">
      <Eyebrow>04 — Modules</Eyebrow>
      <SectionHeading>System &amp; apps</SectionHeading>
      <Lead>
        Launch apps, read live system stats, manage processes, and arrange windows — all with
        plain commands.
      </Lead>

      <ModuleBlock
        title="App Launcher"
        intro="Open, close, switch between, and list applications."
        rows={[
          { cmd: 'open <app>', desc: 'Launch an application.' },
          { cmd: 'close <app>  /  quit <app>', desc: 'Quit an application.' },
          { cmd: 'switch to <app>', desc: 'Bring an app to the front.' },
          { cmd: 'list apps  /  apps', desc: 'List running applications.' },
        ]}
      />

      <ModuleBlock
        title="System Monitor"
        intro="CPU, memory, disk, battery, and network at a glance."
        rows={[
          { cmd: 'cpu  /  processor', desc: 'CPU model, core count, and usage.' },
          { cmd: 'memory  /  ram', desc: 'Total, used, and free RAM.' },
          { cmd: 'disk  /  storage  /  space', desc: 'Disk usage and available space.' },
          { cmd: 'battery', desc: 'Charge %, state, and time remaining.' },
          { cmd: 'network  /  wifi  /  ip', desc: 'Local IP and WiFi network name.' },
          { cmd: 'status', desc: 'A full report — all of the above at once.' },
        ]}
      />

      <ModuleBlock
        title="Process Manager"
        intro="Find resource hogs, inspect ports, and kill processes."
        rows={[
          { cmd: 'top cpu  /  top memory', desc: 'Show the top resource consumers.' },
          { cmd: 'kill <name>', desc: 'Kill a process by name.' },
          { cmd: 'kill pid <pid>', desc: 'Kill a process by PID.' },
          { cmd: 'port <number>', desc: 'Show what is using a port.' },
          { cmd: 'kill port <number>', desc: 'Kill the process on a port.' },
          { cmd: 'find process <name>', desc: 'Search for a running process.' },
          { cmd: 'ps', desc: 'List all foreground processes.' },
        ]}
      />

      <ModuleBlock
        title="Window Manager"
        intro="Tile, resize, fullscreen, and arrange windows across the screen."
        rows={[
          { cmd: 'tile <app> left/right', desc: 'Tile a window to half of the screen.' },
          { cmd: 'tile <app> top/bottom', desc: 'Tile to the top or bottom half.' },
          { cmd: 'fullscreen <app>  /  maximize <app>', desc: 'Maximize a window.' },
          { cmd: 'center <app>', desc: 'Center a window on the screen.' },
          { cmd: 'resize <app> 800x600', desc: 'Resize to exact dimensions.' },
          { cmd: 'minimize <app>', desc: 'Minimize all of an app’s windows.' },
          { cmd: '<app> and <app> side by side', desc: 'Arrange two apps next to each other.' },
          { cmd: 'windows', desc: 'List all open windows.' },
        ]}
      />
    </section>
  )
}

function FilesControl() {
  return (
    <section id="files-control" className="scroll-mt-28 mb-24">
      <Eyebrow>05 — Modules</Eyebrow>
      <SectionHeading>Files &amp; control</SectionHeading>
      <Lead>
        Search and move files, control system settings, run shell commands safely, manage the
        clipboard, and set timers — the everyday toolkit.
      </Lead>

      <ModuleBlock
        title="File Operations"
        intro="Spotlight-powered search and safe file management — delete moves to Trash, never permanent."
        rows={[
          { cmd: 'search <name>', desc: 'Instant Spotlight (mdfind) file search.' },
          { cmd: 'open folder <path>', desc: 'Open a folder in Finder.' },
          { cmd: 'move <src> to <dest>', desc: 'Move a file or folder.' },
          { cmd: 'copy <src> to <dest>', desc: 'Copy a file or folder.' },
          { cmd: 'delete <path>', desc: 'Move a file to the Trash.' },
          { cmd: 'ls <path>', desc: 'List a directory.' },
        ]}
      />

      <ModuleBlock
        title="System Control"
        intro="Volume, brightness, dark mode, Do Not Disturb, and power."
        rows={[
          { cmd: 'volume <0-100>', desc: 'Set the volume level.' },
          { cmd: 'volume up  /  volume down', desc: 'Adjust volume by 10%.' },
          { cmd: 'mute  /  unmute', desc: 'Toggle mute.' },
          { cmd: 'brightness <0-100>', desc: 'Set screen brightness.' },
          { cmd: 'brighter  /  dimmer', desc: 'Step brightness up or down.' },
          { cmd: 'dark mode  /  light mode', desc: 'Toggle appearance.' },
          { cmd: 'dnd on  /  dnd off', desc: 'Toggle Do Not Disturb.' },
          { cmd: 'sleep  /  lock', desc: 'Sleep or lock the screen.' },
          { cmd: 'screensaver  /  empty trash', desc: 'Start the screensaver or empty the Trash.' },
          { cmd: 'shutdown  /  restart', desc: 'Power controls.' },
        ]}
      />

      <ModuleBlock
        title="Script Runner"
        intro="Run shell commands directly. Dangerous commands (rm -rf /, sudo rm, mkfs, dd, fork bombs, chmod 777, and more) are automatically blocked by a deny-list."
        rows={[
          { cmd: '$ <command>', desc: 'Run a shell command.' },
          { cmd: 'run <command>  /  exec <command>', desc: 'Run a shell command.' },
          { cmd: 'shell <command>', desc: 'Run a shell command.' },
        ]}
      />

      <ModuleBlock
        title="Clipboard Manager"
        intro="Copy, paste, and a searchable history of your last 50 clips."
        rows={[
          { cmd: 'copy <text>', desc: 'Copy text to the clipboard.' },
          { cmd: 'paste  /  clipboard', desc: 'Show the current clipboard.' },
          { cmd: 'clips  /  clip history', desc: 'Show clipboard history (last 50).' },
          { cmd: 'paste #<n>', desc: 'Paste an item from history by index.' },
          { cmd: 'clip search <query>', desc: 'Search clipboard history.' },
          { cmd: 'clip clear', desc: 'Clear clipboard history.' },
        ]}
      />

      <ModuleBlock
        title="Timers & Reminders"
        intro="Timers, reminders, alarms, and a stopwatch. When a timer fires you get a notification with sound plus a terminal alert. Time formats: 30s, 5 min, 1h30m, 2.5 hours, 1:30, or a bare number (minutes)."
        rows={[
          { cmd: 'timer <duration>', desc: 'Set a countdown.' },
          { cmd: 'remind me in <time> to <msg>', desc: 'A reminder with a notification.' },
          { cmd: 'alarm <time>', desc: 'Set an alarm, e.g. 7:00 am.' },
          { cmd: 'stopwatch', desc: 'Start or stop a stopwatch.' },
          { cmd: 'timers', desc: 'List active timers.' },
          { cmd: 'cancel timer <#>  /  cancel all timers', desc: 'Cancel one or every timer.' },
        ]}
      />

      <ModuleBlock
        title="Conversions"
        intro="Unit and timezone conversions — always exact, no LLM needed."
        rows={[
          { cmd: 'convert 5 miles to km', desc: 'Convert between units.' },
          { cmd: 'time in Tokyo', desc: 'Look up the time in any timezone.' },
        ]}
      />
    </section>
  )
}

function MediaBrowser() {
  return (
    <section id="media-browser" className="scroll-mt-28 mb-24">
      <Eyebrow>06 — Modules</Eyebrow>
      <SectionHeading>Media &amp; browser</SectionHeading>
      <Lead>
        Control playback across Spotify and Apple Music, drive a real browser with Playwright, and
        run macOS Shortcuts.
      </Lead>

      <ModuleBlock
        title="Media Control"
        intro="Auto-detects whether Spotify or Apple Music is running and controls whichever is active."
        rows={[
          { cmd: 'play  /  resume  /  pause', desc: 'Start, resume, or pause playback.' },
          { cmd: 'next  /  skip  /  prev  /  back', desc: 'Move between tracks.' },
          { cmd: 'play/pause', desc: 'Toggle play and pause.' },
          { cmd: 'now playing  /  np', desc: 'Show the current track, artist, and album.' },
          { cmd: 'play <song/artist>', desc: 'Search and play on Spotify.' },
          { cmd: 'playlist <name>', desc: 'Play a named playlist.' },
          { cmd: 'shuffle  /  shuffle off  /  repeat', desc: 'Toggle shuffle and repeat.' },
        ]}
      />

      <ModuleBlock
        title="Browser Control"
        intro="Read a URL instantly with fetch + Claude (no browser), or drive a real browser for interaction — navigate, search, click, fill forms, screenshot."
        rows={[
          { cmd: 'read <url>  /  summarize <url>', desc: 'Read & summarize a page with fetch + Claude — no browser launch. Falls back to a real browser only for JS-heavy pages.' },
          { cmd: 'browse <url>  /  go to <url>', desc: 'Open a URL in the browser.' },
          { cmd: 'search <query>', desc: 'Run a Google search.' },
          { cmd: 'read this page', desc: 'Extract content from the currently open browser page.' },
          { cmd: 'click <element>', desc: 'Click an element on the page.' },
          { cmd: 'fill <field> with <value>', desc: 'Fill a form field.' },
          { cmd: 'screenshot', desc: 'Take a browser screenshot.' },
        ]}
      />

      <ModuleBlock
        title="YouTube Tools"
        intro="Search and play videos directly."
        rows={[
          { cmd: 'search YouTube <query>', desc: 'Search YouTube.' },
          { cmd: 'play <video> on YouTube', desc: 'Open and play a video.' },
        ]}
      />

      <ModuleBlock
        title="macOS Shortcuts"
        intro="Run and list shortcuts from the Shortcuts app."
        rows={[
          { cmd: 'shortcut <name>', desc: 'Run a macOS Shortcut.' },
          { cmd: 'shortcuts', desc: 'List available macOS Shortcuts.' },
        ]}
      />
    </section>
  )
}

function Screen() {
  return (
    <section id="screen" className="scroll-mt-28 mb-24">
      <Eyebrow>07 — Modules</Eyebrow>
      <SectionHeading>Screen awareness</SectionHeading>
      <Lead>
        JARVIS sees your screen with Claude vision — it reads a screenshot directly, so it
        understands layout, buttons, and content, not just text.
      </Lead>

      <ModuleBlock
        title="Screen Awareness"
        intro="Claude vision reads the screenshot directly — one call, no OCR step — so it's faster and more accurate. OCR (macOS Vision / Tesseract) stays as an offline fallback. Screen context can also be injected into a conversation for context-aware answers."
        rows={[
          { cmd: "what's on my screen", desc: 'Claude vision describes what it sees.' },
          { cmd: 'summarize my screen', desc: 'A 2-3 sentence summary of the current screen.' },
          { cmd: 'read screen', desc: 'Extract all visible text (OCR).' },
        ]}
      />

      <ModuleBlock
        title="Screen Interaction"
        intro="Process the text you currently have selected with AI."
        rows={[
          { cmd: 'paraphrase this', desc: 'Rewrite the selected text.' },
          { cmd: 'fix grammar', desc: 'Correct grammar in the selection.' },
          { cmd: 'translate to <language>', desc: 'Translate the selected text.' },
        ]}
      />
    </section>
  )
}

function Comms() {
  return (
    <section id="comms" className="scroll-mt-28 mb-24">
      <Eyebrow>08 — Modules</Eyebrow>
      <SectionHeading>Comms &amp; WhatsApp</SectionHeading>
      <Lead>
        WhatsApp is built on the <strong className="text-ink">Baileys multi-device protocol</strong>{' '}
        — no browser, no Selenium. Sends are <strong className="text-ink">instant (sub-second)</strong>.
        Link your account once by scanning a QR code, and JARVIS stays connected in the background.
      </Lead>

      <ModuleBlock
        title="WhatsApp"
        intro="Contact names resolve automatically via config/whatsapp-contacts.json or your macOS Contacts, so you can message people by name."
        rows={[
          { cmd: 'whatsapp login', desc: 'Scan a QR code once to link your account.' },
          { cmd: 'message mom running late', desc: 'Send a message to a contact by name.' },
          { cmd: 'whatsapp dad: call me', desc: 'Send to a named contact with explicit syntax.' },
          { cmd: 'read whatsapp', desc: 'Read your most recent messages.' },
          { cmd: 'whatsapp status', desc: 'Check the connection state.' },
        ]}
      />

      <ModuleBlock
        title="Comms Stack"
        intro="A unified communications hub that ties messaging channels together for a single view across your conversations."
      />

      <ModuleBlock
        title="Dossier"
        intro="Builds person and company intelligence profiles — a quick briefing on who you are about to talk to."
      />
    </section>
  )
}

function Info() {
  return (
    <section id="info" className="scroll-mt-28 mb-24">
      <Eyebrow>09 — Modules</Eyebrow>
      <SectionHeading>Weather, news &amp; info</SectionHeading>
      <Lead>
        Quick informational lookups and uptime checks — useful on their own and as building blocks
        for routines.
      </Lead>

      <ModuleBlock
        title="Weather & News"
        intro="Current conditions and the day's top headlines."
        rows={[
          { cmd: 'weather', desc: 'Current weather conditions.' },
          { cmd: 'news', desc: 'Top news headlines.' },
        ]}
      />

      <ModuleBlock
        title="Site Monitor"
        intro="Check whether websites and services are online, with optional recurring monitoring."
        rows={[
          { cmd: 'check if google.com is up', desc: 'One-off uptime check with status and latency.' },
          { cmd: 'monitor mysite.com every 5 min', desc: 'Watch a site on a recurring schedule.' },
        ]}
      />

      <ModuleBlock
        title="Personality"
        intro="Time-aware greetings, tech jokes, system-aware mood, and a little existential philosophy."
        rows={[
          { cmd: 'hello', desc: 'A greeting tuned to the time of day.' },
          { cmd: 'tell me a joke', desc: 'A programmer joke.' },
          { cmd: 'who are you', desc: 'JARVIS introduces itself and its modules.' },
        ]}
      />
    </section>
  )
}

function Automation() {
  return (
    <section id="automation" className="scroll-mt-28 mb-24">
      <Eyebrow>10 — Modules</Eyebrow>
      <SectionHeading>Automation</SectionHeading>
      <Lead>
        Save multi-step workflows, schedule recurring tasks, and trigger whole routines with a
        single phrase.
      </Lead>

      <ModuleBlock
        title="Smart Routines"
        intro="Voice-triggered routines that chain many actions together."
        rows={[
          { cmd: 'good morning', desc: 'Set volume, read the weather, and the day’s headlines.' },
          { cmd: 'good night', desc: 'Enable Do Not Disturb, lower volume, and lock the screen.' },
        ]}
      />

      <ModuleBlock
        title="Workflows & Scheduling"
        intro="Build named workflows from chained steps, replay them anytime, and schedule recurring commands."
        rows={[
          { cmd: 'create workflow <name>: step1 && step2', desc: 'Create a workflow from chained steps.' },
          { cmd: 'workflow <name>', desc: 'Run a saved workflow.' },
          { cmd: 'workflows  /  delete workflow <name>', desc: 'List or delete workflows.' },
          { cmd: 'every <interval> run <cmd>', desc: 'Schedule a recurring command.' },
          { cmd: 'scheduled  /  cron', desc: 'List scheduled tasks.' },
          { cmd: 'cancel scheduled <#>', desc: 'Cancel a scheduled task.' },
        ]}
      />

      <ModuleBlock
        title="Coding & Dev Agents"
        intro="Autonomous development helpers."
        rows={[
          { cmd: 'coding agent', desc: 'Autonomous code generation and git operations.' },
          { cmd: 'dev agent', desc: 'Development workflow automation.' },
          { cmd: 'sandbox run <code>', desc: 'Execute code inside a Docker sandbox.' },
        ]}
      />

      <ModuleBlock
        title="Multi-Agent & Orchestration"
        intro="Run work in parallel and call any API in plain language."
        rows={[
          { cmd: 'multi-agent <tasks>', desc: 'Parallel task execution via Promise.allSettled.' },
          { cmd: 'call <api> ...', desc: 'API orchestrator — hit any API by natural language.' },
        ]}
      />
    </section>
  )
}

function AIResearch() {
  return (
    <section id="ai-research" className="scroll-mt-28 mb-24">
      <Eyebrow>11 — Modules</Eyebrow>
      <SectionHeading>AI &amp; research</SectionHeading>
      <Lead>
        Chat with Claude, get smart suggestions, and run academic-grade research — all from the
        prompt. If the AI is unavailable, every other JARVIS feature keeps working.
      </Lead>

      <ModuleBlock
        title="AI Chat"
        intro="Chat, summarize, and explain using the Claude API."
        rows={[
          { cmd: 'ask <question>  /  ai <prompt>', desc: 'Chat with the AI.' },
          { cmd: 'summarize <file or topic>', desc: 'Summarize a file or a topic.' },
          { cmd: 'explain <file or topic>', desc: 'Explain code or a concept.' },
          { cmd: 'clear chat  /  new conversation', desc: 'Reset the conversation.' },
          { cmd: 'ai status', desc: 'Check the LLM connection.' },
        ]}
      />

      <ModuleBlock
        title="Smart Assist"
        intro="Maps natural language onto real commands, suggests new things to try, and surfaces your usage analytics."
        rows={[
          { cmd: 'show me heaviest processes', desc: 'NLU maps this to "top cpu" automatically.' },
          { cmd: 'what can I do', desc: 'Suggests commands you might not know.' },
          { cmd: 'top commands', desc: 'Your most-used commands, ranked.' },
        ]}
      />

      <ModuleBlock
        title="Research"
        intro="Academic and web research across arXiv, Semantic Scholar, and DuckDuckGo, with saved reports."
        rows={[
          { cmd: 'research <topic>', desc: 'Academic + web research with a saved report.' },
          { cmd: 'deep research <topic>', desc: 'Multi-hop investigation with follow-up rounds.' },
          { cmd: 'quick research <topic>', desc: 'Fast, web-only lookup.' },
          { cmd: 'compare X vs Y', desc: 'Side-by-side comparison with a recommendation.' },
          { cmd: 'search docs for <topic>', desc: 'Search your local files only.' },
          { cmd: 'research status', desc: 'Check the research module status.' },
        ]}
      />

      <ModuleBlock
        title="More AI modules"
        intro="The wider AI surface area."
        rows={[
          { cmd: 'morning digest', desc: 'Daily briefing — weather, calendar, email, and news.' },
          { cmd: 'file intelligence', desc: 'Advanced file analysis and search.' },
          { cmd: 'data connectors', desc: 'Slack, Notion, Apple Health, and Strava.' },
          { cmd: 'energy monitor', desc: 'Track operation energy and LLM costs.' },
          { cmd: 'self-improve: <description>', desc: 'Generate and hot-reload a brand-new module.' },
        ]}
      />
    </section>
  )
}

function Productivity() {
  return (
    <section id="productivity" className="scroll-mt-28 mb-24">
      <Eyebrow>12 — Modules</Eyebrow>
      <SectionHeading>Email &amp; calendar</SectionHeading>
      <Lead>
        Connect Gmail and Google Calendar through the Google API for inbox triage and scheduling
        from the prompt.
      </Lead>

      <ModuleBlock
        title="Email"
        intro="Gmail via the Google API."
        rows={[
          { cmd: 'check email', desc: 'Read your recent inbox.' },
          { cmd: 'send email to <person> ...', desc: 'Compose and send a message.' },
        ]}
      />

      <ModuleBlock
        title="Calendar"
        intro="Google Calendar integration."
        rows={[
          { cmd: 'what’s on my calendar', desc: 'See upcoming events.' },
          { cmd: 'add event <details>', desc: 'Create a calendar event.' },
        ]}
      />
    </section>
  )
}

function SmartHome() {
  return (
    <section id="smart-home" className="scroll-mt-28 mb-24">
      <Eyebrow>13 — Modules</Eyebrow>
      <SectionHeading>Smart home</SectionHeading>
      <Lead>
        Control HomeKit accessories through macOS Shortcuts — lights, scenes, and devices, all by
        voice or prompt.
      </Lead>

      <ModuleBlock
        title="Smart Home"
        intro="HomeKit control via macOS Shortcuts."
        rows={[
          { cmd: 'turn off living room lights', desc: 'Control an accessory by name.' },
          { cmd: 'run scene <name>', desc: 'Activate a HomeKit scene.' },
        ]}
      />
    </section>
  )
}

function Intelligence() {
  return (
    <section id="intelligence" className="scroll-mt-28 mb-24">
      <Eyebrow>14 — Under the hood</Eyebrow>
      <SectionHeading>Intelligence layer</SectionHeading>
      <Lead>
        JARVIS learns from how you use it. Every command is recorded as a trace with timing and
        context — time of day, active app, voice mode, and result — and the learning engine mines
        those traces to get sharper over time.
      </Lead>

      <Bullets
        items={[
          <><strong className="text-ink">Trace recording</strong> — every command logged with timing and context (capped at the last 5,000).</>,
          <><strong className="text-ink">Route prediction</strong> — suggests likely modules from your usage patterns.</>,
          <><strong className="text-ink">Habit detection</strong> — identifies daily routines worth automating.</>,
          <><strong className="text-ink">Memory search</strong> — hybrid TF-IDF plus Rust vector search over stored facts.</>,
          <><strong className="text-ink">Context injection</strong> — relevant context is fed into LLM prompts automatically.</>,
        ]}
      />

      <SubHeading>Rust sidecar</SubHeading>
      <Prose>
        A compiled Rust binary in <Code>rust-sidecar/</Code> accelerates the performance-critical
        paths and starts automatically on boot. It speaks JSON to the TypeScript host and falls
        back gracefully to TypeScript whenever it is unavailable.
      </Prose>
      <CommandList
        rows={[
          { cmd: 'Vector search', desc: 'Sub-millisecond semantic memory retrieval via cosine similarity.' },
          { cmd: 'Fuzzy matching', desc: 'Rust Levenshtein for typo correction across the command registry.' },
          { cmd: 'Trace analytics', desc: 'Single-pass usage statistics over 5,000+ traces.' },
          { cmd: 'Habit detection', desc: 'Pattern recognition across the full trace history.' },
        ]}
      />

      <SubHeading>Security monitoring</SubHeading>
      <Prose>
        An always-on layer watches for trouble in the background — a{' '}
        <strong className="text-ink">breach monitor</strong>, a{' '}
        <strong className="text-ink">network guardian</strong> that tracks devices on your network,
        and a <strong className="text-ink">threat detector</strong>.
      </Prose>
    </section>
  )
}

function MultiDevice() {
  return (
    <section id="multi-device" className="scroll-mt-28 mb-24">
      <Eyebrow>15 — Reach</Eyebrow>
      <SectionHeading>Multi-device</SectionHeading>
      <Lead>
        JARVIS reaches across your devices through an{' '}
        <strong className="text-ink">AIM (Advanced Idea Mechanics) WebSocket relay</strong>. Send
        commands from your wrist or phone and get responses back anywhere.
      </Lead>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { name: 'Mac', desc: 'The full experience — CLI, voice, menubar, and screen awareness.' },
          { name: 'iPhone', desc: 'Send commands and receive responses through the companion app.' },
          { name: 'Apple Watch', desc: 'Quick commands from your wrist with haptic feedback.' },
        ].map((d) => (
          <div key={d.name} className="card p-5">
            <div className="mono text-sm font-bold text-accent mb-1.5">{d.name}</div>
            <div className="text-ink-2 text-sm leading-relaxed">{d.desc}</div>
          </div>
        ))}
      </div>

      <Prose>
        A native macOS <strong className="text-ink">menubar app</strong> shows JARVIS status, voice
        state, and the last command at a glance. The Watch and iPhone apps connect over the AIM
        relay, so a command issued on one device is handled by your Mac and the result is pushed
        straight back.
      </Prose>
    </section>
  )
}

function Plugins() {
  return (
    <section id="plugins" className="scroll-mt-28 mb-12">
      <Eyebrow>16 — Extend</Eyebrow>
      <SectionHeading>Plugins</SectionHeading>
      <Lead>
        JARVIS uses a decorator-based module system. Every module is a class decorated with{' '}
        <Code>@RegisterModule()</Code> that declares its commands, patterns, and handlers — and
        modules are <strong className="text-ink">hot-reloadable</strong>, so you drop a file in
        with no restart.
      </Lead>

      <SubHeading>Write a module</SubHeading>
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

      <SubHeading>Or have JARVIS write it</SubHeading>
      <Prose>
        The self-improve module turns a natural-language description into a working module — it
        generates TypeScript, validates it, and hot-loads it into the running system. External
        plugin packages load through the same registry, parser, and intelligence layer as the
        built-ins.
      </Prose>
      <CodeBlock label="jarvis">
{`jarvis> self-improve: create a pomodoro timer module
  Analyzing request...
  Generating module: pomodoro-timer
  Validating TypeScript...
  Module registered: pomodoro-timer (3 commands)
  ✓ Ready: "pomodoro start", "pomodoro stop", "pomodoro status"`}
      </CodeBlock>
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
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
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
              Setup
            </a>
            <a href="#system" className="hidden sm:inline text-ink-2 hover:text-accent transition-colors">
              Modules
            </a>
            <a href="#core-concepts" className="hidden sm:inline text-ink-2 hover:text-accent transition-colors">
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

      {/* Layout */}
      <div className="max-w-6xl mx-auto px-6 flex gap-12 pt-36">
        {/* Sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div className="sticky top-28">
            <nav className="space-y-1 border-l border-line max-h-[calc(100vh-9rem)] overflow-y-auto">
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
          <CoreConcepts />
          <hr className="rule mb-24" />
          <VoiceConversation />
          <hr className="rule mb-24" />
          <SystemApps />
          <hr className="rule mb-24" />
          <FilesControl />
          <hr className="rule mb-24" />
          <MediaBrowser />
          <hr className="rule mb-24" />
          <Screen />
          <hr className="rule mb-24" />
          <Comms />
          <hr className="rule mb-24" />
          <Info />
          <hr className="rule mb-24" />
          <Automation />
          <hr className="rule mb-24" />
          <AIResearch />
          <hr className="rule mb-24" />
          <Productivity />
          <hr className="rule mb-24" />
          <SmartHome />
          <hr className="rule mb-24" />
          <Intelligence />
          <hr className="rule mb-24" />
          <MultiDevice />
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
