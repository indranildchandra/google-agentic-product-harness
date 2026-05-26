#!/usr/bin/env bash
# =====================================================================
#  Antigravity Session - Node.js 24.x Setup (macOS / Linux)
#
#  - Detects existing Node.js installation
#  - Installs nvm (Node Version Manager) if missing
#  - Installs Node.js 24 (latest) via nvm
#  - Sets up PATH for current AND future shells (~/.bashrc, ~/.zshrc)
#  - Verifies node + npm are accessible
# =====================================================================

set -u   # treat unset variables as errors
# NOTE: we do NOT set -e because we want graceful messages on each step

# ---------------------- pretty printing -----------------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

section() {
  echo ""
  echo -e "${CYAN}==================================================${NC}"
  echo -e "${CYAN} $1${NC}"
  echo -e "${CYAN}==================================================${NC}"
}
ok()    { echo -e "${GREEN}[OK]${NC}   $1"; }
info()  { echo -e "${YELLOW}[INFO]${NC} $1"; }
err()   { echo -e "${RED}[ERR]${NC}  $1"; }

section "Antigravity Session - Node.js 24.x Setup (macOS / Linux)"

# ---------------------- OS detection --------------------------------
OS="$(uname -s)"
case "$OS" in
  Darwin*) PLATFORM="macOS" ;;
  Linux*)  PLATFORM="Linux" ;;
  *)       err "Unsupported OS: $OS"; exit 1 ;;
esac
info "Detected platform: $PLATFORM"

# ---------------------- helpers -------------------------------------
get_node_major() {
  # Strips leading 'v' then takes the first dotted segment
  local v="${1#v}"
  echo "${v%%.*}"
}

# Source nvm into the current shell if it's installed
load_nvm_if_present() {
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  if [ -s "$NVM_DIR/nvm.sh" ]; then
    # shellcheck disable=SC1091
    \. "$NVM_DIR/nvm.sh"
    return 0
  fi
  return 1
}

# ---------------------- Step 1: detect existing Node ----------------
section "Step 1: Checking for existing Node.js installation"

NEEDS_INSTALL=1

if command -v node >/dev/null 2>&1; then
  EXISTING_VER="$(node -v 2>/dev/null || echo "unknown")"
  EXISTING_MAJOR="$(get_node_major "$EXISTING_VER")"
  info "Found Node.js $EXISTING_VER at $(command -v node)"
  if [ "$EXISTING_MAJOR" = "24" ]; then
    ok "Node.js 24.x is already installed. Skipping install."
    NEEDS_INSTALL=0
  else
    info "Detected Node.js $EXISTING_MAJOR.x. This session requires the 24.x line."
    info "Will install Node.js 24 via nvm (your existing Node will remain available)."
  fi
else
  info "Node.js is not installed."
fi

# ---------------------- Step 2: ensure nvm --------------------------
if [ "$NEEDS_INSTALL" -eq 1 ]; then
  section "Step 2: Installing nvm (Node Version Manager) if missing"

  if load_nvm_if_present; then
    ok "nvm is already installed."
  else
    info "Downloading and running the official nvm install script..."
    if command -v curl >/dev/null 2>&1; then
      curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
    elif command -v wget >/dev/null 2>&1; then
      wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
    else
      err "Neither curl nor wget is available. Please install one and re-run."
      exit 1
    fi

    if ! load_nvm_if_present; then
      err "nvm install completed but nvm.sh could not be sourced. Open a new terminal and re-run."
      exit 1
    fi
    ok "nvm installed and loaded into this session."
  fi

  # ------------------ Step 3: install Node 24 -----------------------
  section "Step 3: Installing Node.js 24 via nvm"
  info "Running: nvm install 24"
  if ! nvm install 24; then
    err "nvm install 24 failed."
    exit 1
  fi
  nvm use 24 >/dev/null
  nvm alias default 24 >/dev/null
  ok "Node.js 24 installed and set as default."

  # ------------------ Step 4: persist env vars ----------------------
  section "Step 4: Persisting environment for future shells"

  NVM_BLOCK='
# >>> Antigravity session: nvm setup >>>
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
# <<< Antigravity session: nvm setup <<<'

  add_block_if_missing() {
    local file="$1"
    [ -f "$file" ] || touch "$file"
    if ! grep -q "Antigravity session: nvm setup" "$file" 2>/dev/null; then
      printf "%s\n" "$NVM_BLOCK" >> "$file"
      ok "Added nvm setup to $file"
    else
      info "$file already contains the nvm setup block. Skipping."
    fi
  }

  # Update the rc files the user is likely to use
  add_block_if_missing "$HOME/.bashrc"
  add_block_if_missing "$HOME/.zshrc"
  # macOS Terminal uses .bash_profile for login shells
  if [ "$PLATFORM" = "macOS" ]; then
    add_block_if_missing "$HOME/.bash_profile"
  fi

  # ------------------ Step 5: permissions ---------------------------
  section "Step 5: Fixing permissions on ~/.nvm"
  if [ -d "$HOME/.nvm" ]; then
    chmod -R u+rwX "$HOME/.nvm" 2>/dev/null || true
    ok "Permissions on ~/.nvm look good."
  fi
else
  section "Step 2-5: Skipped (Node.js 24.x already present)"
  load_nvm_if_present || true
fi

# ---------------------- Step 6: verification ------------------------
section "Step 6: Verifying installation"

if ! command -v node >/dev/null 2>&1; then
  err "'node' is not accessible from this shell."
  info "Open a NEW terminal window and run:  node -v"
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  err "'npm' is not accessible from this shell."
  info "Open a NEW terminal window and run:  npm -v"
  exit 1
fi

FINAL_NODE="$(node -v)"
FINAL_NPM="$(npm -v)"
FINAL_MAJOR="$(get_node_major "$FINAL_NODE")"

ok "node located at: $(command -v node)"
ok "npm  located at: $(command -v npm)"
ok "node version:    $FINAL_NODE"
ok "npm  version:    $FINAL_NPM"

if [ "$FINAL_MAJOR" != "24" ]; then
  err "Expected Node.js 24.x but found $FINAL_NODE."
  info "Open a new terminal and run 'node -v' again. If it still shows the wrong version, run: nvm use 24"
  exit 1
fi

section "All set!"
echo -e "${GREEN}${BOLD}You're ready for the Antigravity session.${NC}"
echo -e "${GREEN}Next step: open Antigravity and create your React + Vite project.${NC}"
echo ""
