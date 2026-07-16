# validate-refs.ps1
# Cross-reference validator for Xha'Ruun encyclopedia
# Usage: .\scripts\validate-refs.ps1

[CmdletBinding()]
param (
    [string]$ProjectRoot = (Get-Location).Path
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  XHA'RUUN CROSS-REFERENCE VALIDATOR" -ForegroundColor Cyan
Write-Host "  Project: $ProjectRoot" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# --- 1. Collect .md files (skip templates, README, MAP, registry) ---
$files = Get-ChildItem -Path $ProjectRoot -Recurse -Filter "*.md" | Where-Object {
    $_.FullName -notmatch '\\templates\\' -and
    $_.Name -notin @('README.md', 'MAP.md', 'cross-ref-registry.md')
}

Write-Host "Found .md files: $($files.Count)" -ForegroundColor Yellow

# --- 2. Valid reference patterns ---
$validPatterns = @(
    '^Гл\.\d{2}',       # Chapter refs: Гл.01, Гл.10
    '^ТАБ:',             # Table refs: ТАБ:name
    '^ПРИЛ:',            # Appendix refs: ПРИЛ:name
    '^СЛ:',              # Glossary refs: СЛ:term
    '^CANON',            # Canon refs: CANON
    '^CAN'               # Short canon refs: CAN
)

# --- 3. Extract cross-refs from all files ---
$allLinks = @()
$brokenLinks = @()
$linkCount = 0

foreach ($file in $files) {
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    } catch {
        Write-Host "  Warning: cannot read $($file.Name)" -ForegroundColor Yellow
        continue
    }

    $relPath = $file.FullName.Substring($ProjectRoot.Length).TrimStart('\')
    $matches = [regex]::Matches($content, '→ см\. \[([^\]]+)\]')

    foreach ($m in $matches) {
        $linkCount++
        $ref = $m.Groups[1].Value

        # Check if it matches any valid pattern
        $isValid = $false
        foreach ($vp in $validPatterns) {
            if ($ref -match $vp) {
                $isValid = $true
                break
            }
        }

        if (-not $isValid) {
            $brokenLinks += [PSCustomObject]@{
                File = $relPath
                Reference = $ref
            }
        }
    }
}

# --- 4. Results ---
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESULTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Total cross-references: $linkCount" -ForegroundColor White

if ($brokenLinks.Count -eq 0) {
    Write-Host "Broken references:  0 (ALL OK!)" -ForegroundColor Green
} else {
    Write-Host "Broken references:  $($brokenLinks.Count)" -ForegroundColor Red
    Write-Host ""
    Write-Host "--- BROKEN REFS ---" -ForegroundColor Red
    $brokenLinks | Group-Object File | ForEach-Object {
        Write-Host "  $($_.Name):" -ForegroundColor Yellow
        foreach ($r in $_.Group) {
            Write-Host "    -> $($r.Reference)" -ForegroundColor Red
        }
    }
    Write-Host ""
    Write-Host "Note: refs may look broken if the target ID is not yet registered." -ForegroundColor Yellow
    Write-Host "Check cross-ref-registry.md for valid IDs." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DONE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($brokenLinks.Count -gt 0) { exit 1 }
exit 0
