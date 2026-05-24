$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$dest = Join-Path $root "android\app\src\main\assets\web"

New-Item -ItemType Directory -Force $dest | Out-Null
Copy-Item (Join-Path $root "index.html"), (Join-Path $root "app.js"), (Join-Path $root "styles.css") -Destination $dest -Force
Copy-Item (Join-Path $root "media") -Destination $dest -Recurse -Force

Write-Host "Android web assets synced."
