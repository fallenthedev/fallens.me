# fallens.me

> the personal corner of the internet for **𝔣𝔞𝔩𝔩𝔢𝔫 ♤** (she/they)

Hi — I'm a 9th grade hobbyist developer based in Minnesota, USA. This repo is
the source for my personal website: a small, hand-built, terminal-flavored
place where I keep track of what I'm making, what I'm learning, and what I'm
into right now. No frameworks, no build step, no tracking — just HTML, CSS,
and JavaScript the way the web was meant to be.

---

## about me

I'm **𝔣𝔞𝔩𝔩𝔢𝔫 ♤** (she/they). I'm not a professional developer and I'm not
trying to be one yet — I'm a student who genuinely enjoys the puzzle of turning
an idea into something that runs on a screen. Most of what I build is for fun,
for practice, or because I thought "what if a browser could do *that*?" and
wanted to find out.

I work mostly in **Python** and the web trio (**HTML**, **CSS**, **JavaScript**).
I like clean UI, fake "systems" that feel real, and projects that are a little
too ambitious for a weekend. When I'm not breaking my own code, I'm probably
reading about something new to try.

### pronouns

**she/they** — either is fine.

### location

Minnesota, USA (Central Time).

---

## origin story

I got into coding the way a lot of people do: by poking at something, breaking
it, and wanting to understand why it broke. What started as curiosity about how
websites actually worked turned into tinkering with HTML, then CSS, then
JavaScript, then Python. Somewhere along the way I realized I wasn't just
*reading* about code anymore — I was *writing* it, and I wanted a place to put
the things I made.

That's what this site is. It's not a portfolio meant to impress anyone, and it's
not a resume. It's a home base — somewhere my projects can live, my "now" can
stay current, and anyone curious about what I'm up to can find out without
digging through a dozen scattered links.

---

## coding philosophy

A few things I've figured out so far, mostly by doing them wrong first:

- **Build the thing before you build the *perfect* thing.** A working prototype
  teaches you more than a flawless plan. Ship the janky version, then make it
  less janky.
- **Fake it until it feels real.** Some of my favorite projects are "fake"
  systems — a web OS, a terminal — that mimic something real. The fun is in the
  details that make it *feel* like it belongs.
- **Read the source.** The fastest way to learn how something works is to go
  look at how someone else already did it. Then try to do it differently.
- **Break it on purpose.** If you've never made it fail, you don't actually
  know where the edges are.
- **No frameworks is a feature.** This site is hand-written HTML, CSS, and JS.
  It's small, it's readable, and I understand every line of it. That matters to
  me right now more than shipping fast does.

---

## the site

The website lives at the root of this repo. It's a multi-page static site with
a terminal retro aesthetic — purple on black, scanlines, monospace, blinking
cursors. Every page shares the same header, footer, and stylesheet.

### pages

| page     | path         | what's there                                              |
| -------- | ------------ | --------------------------------------------------------- |
| home     | `/`          | about, fun facts, skills, contact, support links          |
| projects | `/projects/` | things I've built or am building                          |
| now      | `/now/`      | what I'm up to right now (inspired by nownownow.com)      |
| uses     | `/uses/`     | the gear and tools I actually use                         |
| lab      | `/lab/`      | interactive JS toys: a typing terminal and a pixel clock  |

### file structure

```
fallens.me/
├── index.html          # home — about, fun facts, skills, contact, support
├── style.css           # shared styles (theme, layout, components)
├── script.js           # shared typing-intro script
├── README.md           # this file
├── projects/
│   └── index.html      # project showcase (AuroraOS + placeholders)
├── now/
│   └── index.html      # /now — what i'm up to right now
├── uses/
│   └── index.html      # /uses — gear & tools
└── lab/
    ├── index.html      # /lab — interactive toys
    ├── lab.css         # lab-specific styles (terminal, clock)
    └── lab.js          # typing terminal + pixel clock
```

### spotlight: AuroraOS *(deprecated)*

The big one. AuroraOS is a fake web-based operating system that runs entirely
in the browser. It features custom websites, custom apps, a working file
system, and much more — all built to feel like a real desktop environment.
It's the project that taught me the most about JavaScript, UI, and how much
detail goes into making something *feel* like a system rather than just a
webpage. It's no longer in active development, but it still holds a special
place as the project that taught me the most.

### spotlight: Horizon Wallpapers

A free digital wallpaper and customization storefront at
[hw.fallens.me](https://hw.fallens.me). It offers wallpaper packs, app icons,
folder icons, widgets, and themes — all browsable with subcategory filtering
and downloadable as direct ZIP files. The kind of project that turns "I want
to customize my desktop" into a few clicks instead of a deep dive through
scattered forum posts.

### the lab terminal

The `/lab` page has a fake shell you can type into. Try:

- `help` — list all commands
- `about` — who I am
- `ls` / `cat <file>` — fake files (try `cat secrets/flag.txt` for an easter egg)
- `support` — patreon & venmo links
- `clear` — wipe the screen
- **tab** autocompletes, **up/down** arrows browse history

---

## tech

- **HTML, CSS, JavaScript** — no frameworks, no bundler, no dependencies
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) via Google Fonts
- Scanline + vignette overlays via CSS `::before` / `::after`
- Typing intros and the lab toys are vanilla JS

## run it locally

It's static — you can just open `index.html` in a browser. For clean directory
URLs (`/projects/`, `/lab/`, etc.), serve it:

```bash
# python
python -m http.server 8000

# or node
npx serve
```

Then visit `http://localhost:8000`.

## editing

Everything is hand-written, so changing things is straightforward:

- **Content** — edit the `.html` files directly
- **Look & feel** — edit `style.css` (theme variables are at the top under `:root`)
- **Typing intro** — edit `script.js`, or the inline `<script>` block on each subpage
- **Lab toys** — edit `lab/lab.js`

---

## contact

| where    | link / handle                                              |
| -------- | ---------------------------------------------------------- |
| github   | [github.com/FallenTheDev](https://github.com/FallenTheDev) |
| discord  | FallenTheDev                                               |
| email    | [fallenontiktok@gmail.com](mailto:fallenontiktok@gmail.com) |
| patreon  | [patreon.fallens.me](https://patreon.fallens.me) |
| venmo    | [@FallenTheDev](https://venmo.com/FallenTheDev)            |

If you'd like to support what I make, Patreon and Venmo are both appreciated —
and totally optional. It helps keep the hobbies funded.

---

## license

The content of this site is mine. The code is free to read, learn from, and
borrow — just give credit if you lift recognizable chunks of it. Don't pass
the whole thing off as your own. That's the whole license.

---

built with html, css & js — no frameworks, no tracking.
