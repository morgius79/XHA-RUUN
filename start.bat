@echo off
setlocal

title Claude Code + OmniRoute

echo ========================================
echo Запуск OmniRoute...
echo ========================================

REM === Запуск OmniRoute в отдельном окне ===
start "OmniRoute" powershell -ExecutionPolicy Bypass -Command "omniroute"

echo.
echo Ожидание запуска OmniRoute API...

REM === Ждем пока API станет доступен ===
set /a COUNT=0

:WAIT
curl -s http://localhost:20128/v1/models >nul 2>&1

if not errorlevel 1 goto READY

timeout /t 2 >nul

set /a COUNT+=1
if %COUNT% GEQ 30 (
    echo.
    echo Ошибка: OmniRoute не запустился за 60 секунд.
    pause
    exit /b 1
)

goto WAIT


:READY
echo.
echo OmniRoute запущен!
echo.

REM === Настройки Claude Code ===
set ANTHROPIC_BASE_URL=http://localhost:20128/v1
set ANTHROPIC_AUTH_TOKEN=sk-3354b4c6c663474f-0776c7-ee72b4e4
set ANTHROPIC_API_KEY=

REM === Модель OmniRoute ===
set ANTHROPIC_MODEL=auto/best-coding
set ANTHROPIC_DEFAULT_MODEL=auto/best-coding

echo ========================================
echo Запуск Claude Code
echo Модель: auto/best-coding
echo URL: http://localhost:20128/v1
echo ========================================
echo.

claude

endlocal