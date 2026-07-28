# build-encyclopedia.ps1
# Build the full compiled encyclopedia from all chapters and appendices

[CmdletBinding()]
param (
    [string]$ProjectRoot = (Get-Location).Path,
    [string]$OutputFile = "$ProjectRoot\build\full-encyclopedia.md"
)

$ErrorActionPreference = "Continue"
$XharuunDir = Join-Path $ProjectRoot "xharuun"
$OutputFile = Join-Path $XharuunDir "build\full-encyclopedia.md"
$script:fileCount = 0
$script:totalLines = 0

function Add-Content {
    param([string]$Text)
    $script:lines += $Text
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  XHA'RUUN ENCYCLOPEDIA BUILDER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$script:lines = @()
$script:lines += "# Энциклопедия цивилизации Xha-Ruun"
$script:lines += ""
$script:lines += "**Полная компиляция** | Версия 1.0.0 | $(Get-Date -Format 'dd.MM.yyyy')"
$script:lines += ""
$script:lines += "---"
$script:lines += ""

$fileOrder = @(
    "CANON.md",
    "01-universe-spec\index.md",
    "02-star-system\index.md",
    "03-planet-thexar\index.md",
    "04-biochemistry\index.md",
    "05-species-xharuun\index.md",
    "06-language\index.md",
    "07-history\index.md",
    "08-culture\index.md",
    "09-technology\index.md",
    "10-mythology\index.md",
    "11-ecology\index.md",
    "12-geological-evolution\index.md",
    "13-continents\index.md",
    "14-hydrosphere\index.md",
    "15-atmosphere-climate\index.md",
    "16-magnetosphere\index.md",
    "17-flora\index.md",
    "18-fauna\index.md",
    "19-resources\index.md",
    "20-origin-of-life\index.md",
    "21-ecosystems\index.md",
    "22-hydrology\index.md",
    "23-cryosphere\index.md",
    "24-satellites\index.md",
    "25-night-sky\index.md",
    "26-conclusion\index.md",
    "27-geodesy\index.md",
    "28-exploration-history\index.md",
    "29-climate-history\index.md",
    "30-planet-in-numbers\index.md",
    "31-future\index.md",
    "32-kharvex-system\index.md",
    "33-fusion-energy\index.md",
    "34-measurement\index.md",
    "35-index\index.md",
    "36-geochemistry\index.md",
    "37-ecological-zones\index.md",
    "38-kelvash-species\index.md",
    "39-moryn-species\index.md",
    "40-three-species-accord\index.md",
    "appendices\timeline.md",
    "appendices\glossary.md",
    "appendices\names.md",
    "appendices\physical-reference.md",
    "appendices\biological-reference.md",
    "appendices\index.md"
)

foreach ($relativePath in $fileOrder) {
    $fullPath = Join-Path $XharuunDir $relativePath

    if (-not (Test-Path $fullPath)) {
        Write-Host "     NOT FOUND: $relativePath" -ForegroundColor Yellow
        $script:lines += "<!-- MISSING: $relativePath -->"
        continue
    }

    try {
        $fileContent = [System.IO.File]::ReadAllText($fullPath, [System.Text.Encoding]::UTF8)
        $lineCount = ($fileContent -split "`r`n|`n" | Measure-Object).Count
        $script:fileCount++
        $script:totalLines += $lineCount
        $script:lines += $fileContent
        $script:lines += ""
        $script:lines += "<div style='page-break-before: always;'></div>"
        $script:lines += ""
        Write-Host "  + $relativePath ($lineCount lines)" -ForegroundColor Green
    } catch {
        Write-Host "  ERROR reading $relativePath : $_" -ForegroundColor Red
    }
}

# Write output
$contentStr = $script:lines -join "`r`n"
[System.IO.File]::WriteAllText($OutputFile, $contentStr, [System.Text.Encoding]::UTF8)

$fileInfo = Get-Item $OutputFile
$sizeKB = [math]::Round($fileInfo.Length / 1KB, 0)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BUILD COMPLETE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Files compiled: $($script:fileCount)" -ForegroundColor White
Write-Host "  Total lines: $($script:totalLines)" -ForegroundColor White
Write-Host "  Output file: $OutputFile" -ForegroundColor Green
Write-Host "  Size: $sizeKB KB" -ForegroundColor White

if ($script:fileCount -gt 0) {
    Write-Host "  Status: SUCCESS" -ForegroundColor Green
} else {
    Write-Host "  Status: FAILED - no files compiled" -ForegroundColor Red
}
