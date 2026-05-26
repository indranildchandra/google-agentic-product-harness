<#
.SYNOPSIS
    Node.js 24.x setup script for Antigravity teacher session (Windows).

.DESCRIPTION
    Checks for an existing Node.js installation. If Node.js is missing or is
    not on the 24.x major line, this script downloads and installs the
    official Node.js 24 LTS MSI for Windows, refreshes environment variables
    in the current PowerShell session, and verifies that `node` and `npm`
    are both accessible.

.NOTES
    Run from PowerShell. If you see a script execution error, run:
        Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    and then re-run this script.
#>

# ------------------------------------------------------------------
# Pretty printing helpers
# ------------------------------------------------------------------
function Write-Section($text) {
    Write-Host ""
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host " $text" -ForegroundColor Cyan
    Write-Host "==================================================" -ForegroundColor Cyan
}
function Write-Ok($text)   { Write-Host "[OK]   $text" -ForegroundColor Green }
function Write-Info($text) { Write-Host "[INFO] $text" -ForegroundColor Yellow }
function Write-ErrMsg($text) { Write-Host "[ERR]  $text" -ForegroundColor Red }

# ------------------------------------------------------------------
# Ensure script halts on errors
# ------------------------------------------------------------------
$ErrorActionPreference = "Stop"

Write-Section "Antigravity Session - Node.js 24.x Setup (Windows)"

# ------------------------------------------------------------------
# Admin check (we need admin to run MSI installers cleanly)
# ------------------------------------------------------------------
$currentUser   = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal     = New-Object Security.Principal.WindowsPrincipal($currentUser)
$isAdmin       = $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-ErrMsg "This script needs to be run as Administrator to install Node.js."
    Write-Info  "Close this window, right-click PowerShell, choose 'Run as Administrator', and run the script again."
    exit 1
}
Write-Ok "Running with Administrator privileges."

# ------------------------------------------------------------------
# Helper: refresh PATH from registry into current session
# ------------------------------------------------------------------
function Refresh-EnvPath {
    $machinePath = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
    $userPath    = [System.Environment]::GetEnvironmentVariable("Path", "User")
    $env:Path    = "$machinePath;$userPath"
}

# ------------------------------------------------------------------
# Helper: get major version from a node version string like "v24.3.0"
# ------------------------------------------------------------------
function Get-NodeMajor($versionString) {
    if ($versionString -match "v?(\d+)\.") { return [int]$Matches[1] }
    return 0
}

# ------------------------------------------------------------------
# Step 1: Detect existing Node.js
# ------------------------------------------------------------------
Write-Section "Step 1: Checking for existing Node.js installation"

$needsInstall = $true
$existingNode = Get-Command node -ErrorAction SilentlyContinue

if ($existingNode) {
    try {
        $nodeVersion = & node -v 2>$null
        $major       = Get-NodeMajor $nodeVersion
        Write-Info "Found Node.js $nodeVersion (major: $major) at $($existingNode.Source)"
        if ($major -eq 24) {
            Write-Ok "Node.js 24.x is already installed. Skipping download."
            $needsInstall = $false
        }
        else {
            Write-Info "Detected Node.js $major.x. This session requires the 24.x line."
            Write-Info "The installer will upgrade your Node.js to 24.x."
        }
    }
    catch {
        Write-Info "Node.js is on PATH but did not respond to 'node -v'. Will reinstall."
    }
}
else {
    Write-Info "Node.js is not installed."
}

# ------------------------------------------------------------------
# Step 2: Download and install Node.js 24 LTS (if needed)
# ------------------------------------------------------------------
if ($needsInstall) {
    Write-Section "Step 2: Downloading Node.js 24 LTS installer"

    # Pick architecture
    $arch = if ([Environment]::Is64BitOperatingSystem) {
        if ($env:PROCESSOR_ARCHITECTURE -eq "ARM64") { "arm64" } else { "x64" }
    } else { "x86" }

    Write-Info "Detected architecture: $arch"

    # Resolve the latest 24.x version dynamically from the Node.js dist index
    Write-Info "Resolving latest Node.js 24.x version..."
    try {
        $indexUrl   = "https://nodejs.org/dist/index.json"
        $allVersions = Invoke-RestMethod -Uri $indexUrl -UseBasicParsing
        $latest24   = $allVersions | Where-Object { $_.version -like "v24.*" } | Select-Object -First 1
        if (-not $latest24) { throw "No 24.x version found in Node.js dist index." }
        $nodeVer    = $latest24.version
        Write-Ok "Latest 24.x release: $nodeVer"
    }
    catch {
        Write-ErrMsg "Could not query nodejs.org for the latest 24.x version. Check your internet connection."
        Write-ErrMsg $_.Exception.Message
        exit 1
    }

    $msiName    = "node-$nodeVer-$arch.msi"
    $downloadUrl = "https://nodejs.org/dist/$nodeVer/$msiName"
    $msiPath    = Join-Path $env:TEMP $msiName

    Write-Info "Downloading from: $downloadUrl"
    Write-Info "Saving to:        $msiPath"

    try {
        # Use TLS 1.2 for compatibility
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Invoke-WebRequest -Uri $downloadUrl -OutFile $msiPath -UseBasicParsing
        Write-Ok "Download complete."
    }
    catch {
        Write-ErrMsg "Download failed: $($_.Exception.Message)"
        exit 1
    }

    # ------------------------------------------------------------------
    # Step 3: Run the MSI silently
    # ------------------------------------------------------------------
    Write-Section "Step 3: Installing Node.js (silent)"
    Write-Info "Running: msiexec /i `"$msiPath`" /qn /norestart"

    $proc = Start-Process -FilePath "msiexec.exe" `
        -ArgumentList "/i", "`"$msiPath`"", "/qn", "/norestart" `
        -Wait -PassThru

    if ($proc.ExitCode -ne 0) {
        Write-ErrMsg "Installer exited with code $($proc.ExitCode)."
        exit 1
    }
    Write-Ok "Node.js installation finished."

    # ------------------------------------------------------------------
    # Step 4: Refresh PATH for the current session
    # ------------------------------------------------------------------
    Write-Section "Step 4: Refreshing environment variables"
    Refresh-EnvPath

    # Default install dir; add it explicitly if not already present
    $nodeDir = "$env:ProgramFiles\nodejs"
    if ((Test-Path $nodeDir) -and ($env:Path -notlike "*$nodeDir*")) {
        $env:Path = "$env:Path;$nodeDir"
        Write-Ok "Added $nodeDir to current session PATH."
    } else {
        Write-Ok "PATH refreshed from registry."
    }
}
else {
    Write-Section "Step 2-4: Skipped (Node.js 24.x already present)"
    Refresh-EnvPath
}

# ------------------------------------------------------------------
# Step 5: Verification
# ------------------------------------------------------------------
Write-Section "Step 5: Verifying installation"

$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
$npmCmd  = Get-Command npm  -ErrorAction SilentlyContinue

if (-not $nodeCmd) {
    Write-ErrMsg "'node' is not accessible from PowerShell."
    Write-Info  "Close PowerShell, open a NEW PowerShell window, and run:  node -v"
    exit 1
}
if (-not $npmCmd) {
    Write-ErrMsg "'npm' is not accessible from PowerShell."
    Write-Info  "Close PowerShell, open a NEW PowerShell window, and run:  npm -v"
    exit 1
}

$nodeVer = & node -v
$npmVer  = & npm  -v
$major   = Get-NodeMajor $nodeVer

Write-Ok "node located at: $($nodeCmd.Source)"
Write-Ok "npm  located at: $($npmCmd.Source)"
Write-Ok "node version:    $nodeVer"
Write-Ok "npm  version:    $npmVer"

if ($major -ne 24) {
    Write-ErrMsg "Expected Node.js 24.x but found $nodeVer."
    Write-Info  "Open a NEW PowerShell window and run 'node -v' again before reporting an issue."
    exit 1
}

Write-Section "All set!"
Write-Host "You're ready for the Antigravity session." -ForegroundColor Green
Write-Host "Next step: open Antigravity and create your React + Vite project." -ForegroundColor Green
Write-Host ""
