// ===== Lab page JS =====
// Two toys: a typing terminal and a pixel clock.
// Runs on DOMContentLoaded so ../script.js typing intro doesn't conflict.

document.addEventListener("DOMContentLoaded", function () {
  initTerminal();
  initClock();
});

/* ============================================================
   TYPING TERMINAL
   ============================================================ */
function initTerminal() {
  const term = document.getElementById("term");
  const out = document.getElementById("term-out");
  const inputEl = document.getElementById("term-input");
  if (!term || !out || !inputEl) return;

  let buffer = "";
  const history = [];
  let histIdx = -1;

  const BANNER =
    "fallentheDev labs — fake shell v1.0\n" +
    "type 'help' for a list of commands. tab to autocomplete.\n";

  function print(text, cls) {
    const line = document.createElement("div");
    line.className = "out-line" + (cls ? " " + cls : "");
    line.textContent = text;
    out.appendChild(line);
    term.scrollTop = term.scrollHeight;
  }

  function printCmd(cmd) {
    const line = document.createElement("div");
    line.className = "out-line out-cmd";
    line.textContent = cmd;
    out.appendChild(line);
    term.scrollTop = term.scrollHeight;
  }

  function clearInput() {
    buffer = "";
    inputEl.textContent = "";
  }

  function run(cmd) {
    const trimmed = cmd.trim();
    printCmd(trimmed);
    if (!trimmed) return;
    history.unshift(trimmed);
    if (history.length > 50) history.pop();
    histIdx = -1;

    const [name, ...args] = trimmed.split(/\s+/);
    const arg = args.join(" ");

    switch (name.toLowerCase()) {
      case "help":
        print("available commands:", "out-dim");
        print("  help        show this message");
        print("  about       who is fallentheDev");
        print("  whoami      prints your identity (allegedly)");
        print("  echo <txt>  prints text back at you");
        print("  date        current date + time");
        print("  ls          list fake files");
        print("  cat <file>  read a fake file");
        print("  projects    jump to /projects");
        print("  now         jump to /now");
        print("  uses        jump to /uses");
        print("  support     see how to support me");
        print("  sudo        nice try");
        print("  clear       wipe the screen");
        print("  exit        reload the page (it's a fake shell)");
        break;
      case "about":
        print("𝔣𝔞𝔩𝔩𝔢𝔫 ♤ — 9th grade hobbyist dev in minnesota, usa.", "out-ok");
        print("likes python, web stuff, and fake systems that feel real.", "out-dim");
        break;
      case "whoami":
        print("you are: a curious visitor. hi.", "out-ok");
        break;
      case "echo":
        print(arg || "", "out-dim");
        break;
      case "date":
        print(new Date().toString(), "out-dim");
        break;
      case "ls":
        print("about.md   projects/   now.txt   uses.conf   secrets/", "out-ok");
        break;
      case "cat":
        if (!arg) { print("usage: cat <file>", "out-err"); break; }
        if (arg === "about.md") print("hey, i'm fallentheDev. see the homepage for the long version.", "out-dim");
        else if (arg === "now.txt") print("building auroraos. learning python. reading nothing :/", "out-dim");
        else if (arg === "uses.conf") print("editor=vs_code\nbrowser=ecosia\nmusic=youtube|spotify", "out-dim");
        else if (arg === "secrets/") print("cat: secrets/: is a directory", "out-err");
        else if (arg === "secrets/flag.txt") print("nice try. but okay: flag{you_read_the_source}.", "out-ok");
        else print("cat: " + arg + ": no such file", "out-err");
        break;
      case "projects":
        print("opening /projects ...", "out-ok");
        setTimeout(() => (window.location.href = "../projects/"), 500);
        break;
      case "now":
        print("opening /now ...", "out-ok");
        setTimeout(() => (window.location.href = "../now/"), 500);
        break;
      case "uses":
        print("opening /uses ...", "out-ok");
        setTimeout(() => (window.location.href = "../uses/"), 500);
        break;
      case "support":
        print("support 𝔣𝔞𝔩𝔩𝔢𝔫 ♤ — totally optional, always appreciated.", "out-ok");
        print("  patreon: https://patreon.fallens.me", "out-dim");
        print("  venmo:   https://venmo.com/FallenTheDev  (@FallenTheDev)", "out-dim");
        break;
      case "patreon":
        print("opening patreon ...", "out-ok");
        setTimeout(() => window.open("https://patreon.fallens.me", "_blank"), 500);
        break;
      case "venmo":
        print("opening venmo ...", "out-ok");
        setTimeout(() => window.open("https://venmo.com/FallenTheDev", "_blank"), 500);
        break;
      case "sudo":
        print("we don't do sudo here. this is a friendly shell.", "out-err");
        break;
      case "clear":
        out.innerHTML = "";
        break;
      case "exit":
        print("logout. reloading...", "out-dim");
        setTimeout(() => window.location.reload(), 600);
        break;
      default:
        print(name + ": command not found. try 'help'.", "out-err");
    }
  }

  // Tab autocomplete
  const COMMANDS = ["help","about","whoami","echo","date","ls","cat","projects","now","uses","support","patreon","venmo","sudo","clear","exit"];
  function autocomplete() {
    if (!buffer) return;
    const matches = COMMANDS.filter(c => c.startsWith(buffer.toLowerCase()));
    if (matches.length === 1) {
      buffer = matches[0];
      inputEl.textContent = buffer;
    } else if (matches.length > 1) {
      print(matches.join("   "), "out-dim");
    }
  }

  function handleKey(e) {
    // Don't intercept modifier combos (ctrl+c copy, etc.) except Ctrl+L for clear
    if (e.ctrlKey) {
      if (e.key === "l" || e.key === "L") { e.preventDefault(); out.innerHTML = ""; }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      run(buffer);
      clearInput();
    } else if (e.key === "Backspace") {
      e.preventDefault();
      buffer = buffer.slice(0, -1);
      inputEl.textContent = buffer;
    } else if (e.key === "Tab") {
      e.preventDefault();
      autocomplete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx < history.length - 1) { histIdx++; buffer = history[histIdx]; inputEl.textContent = buffer; }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; buffer = history[histIdx]; inputEl.textContent = buffer; }
      else { histIdx = -1; buffer = ""; inputEl.textContent = ""; }
    } else if (e.key.length === 1) {
      e.preventDefault();
      buffer += e.key;
      inputEl.textContent = buffer;
    }
  }

  term.addEventListener("click", function () { term.focus(); });
  term.addEventListener("keydown", handleKey);

  // Boot banner
  print(BANNER, "out-dim");
  term.focus();
}

/* ============================================================
   PIXEL CLOCK
   ============================================================ */
function initClock() {
  const grid = document.getElementById("clock-grid");
  const text = document.getElementById("clock-text");
  if (!grid || !text) return;

  // 7-segment digits. each digit = 7 cells (top, tl, tr, mid, bl, br, bot)
  // We render HH:MM:SS = 6 digits + 2 separator columns = 6*7 + 2 = 44 cells.
  // Grid is 6 columns wide (one per digit position). Each digit is 2 wide x 4 tall.
  // Simpler approach: render each digit as a 4x3 mini-grid of cells, separators as 1 col.
  // To keep it clean, we use a fixed 6-segment layout: H H : M M : S
  // Each digit uses a 3x5 pixel font. Separator ':' uses 1 column.

  // 3x5 pixel font for 0-9
  const DIGITS = {
    "0": ["111","101","101","101","111"],
    "1": ["010","110","010","010","111"],
    "2": ["111","001","111","100","111"],
    "3": ["111","001","111","001","111"],
    "4": ["101","101","111","001","001"],
    "5": ["111","100","111","001","111"],
    "6": ["111","100","111","101","111"],
    "7": ["111","001","010","010","010"],
    "8": ["111","101","111","101","111"],
    "9": ["111","101","111","001","111"],
  };
  const COLON = ["0","1","0","1","0"];

  // Build a grid of cells. Layout: 5 rows.
  // Columns: d1(3) + gap + d2(3) + gap + colon(1) + gap + d3(3) + gap + d4(3) + gap + colon(1) + gap + d5(3) + gap + d6(3)
  // To keep it simple, use a flat row-by-row render into a fixed-width grid.

  const ROWS = 5;
  // Build column plan: each digit = 3 cols, colon = 1 col, gaps handled by CSS gap.
  // We'll render into a CSS grid with auto columns and just stack cells row by row.
  // Easier: build an array of rows, each row is array of {on} booleans, then flatten into grid items.

  function buildRows(str) {
    // str like "12:34:56"
    const rows = [[], [], [], [], []];
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === ":") {
        for (let r = 0; r < ROWS; r++) rows[r].push(COLON[r] === "1");
      } else {
        const glyph = DIGITS[ch] || DIGITS["0"];
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < 3; c++) {
            rows[r].push(glyph[r][c] === "1");
          }
        }
      }
      // gap column between every character
      for (let r = 0; r < ROWS; r++) rows[r].push(false);
    }
    // trim trailing gap
    for (let r = 0; r < ROWS; r++) rows[r].pop();
    return rows;
  }

  const totalCols = buildRows("00:00:00")[0].length;
  grid.style.gridTemplateColumns = `repeat(${totalCols}, 1fr)`;

  // Create cells once
  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < totalCols; c++) {
      const cell = document.createElement("div");
      cell.className = "clock-cell";
      grid.appendChild(cell);
      cells.push(cell);
    }
  }

  function tick() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const str = `${hh}:${mm}:${ss}`;
    const rows = buildRows(str);
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < totalCols; c++) {
        const idx = r * totalCols + c;
        const on = rows[r][c];
        cells[idx].className = "clock-cell" + (on ? " on" : "");
      }
    }
    text.textContent = `> ${str} — system time`;
  }

  tick();
  setInterval(tick, 1000);
}
