@echo off
chcp 65001 > nul
title Đóng gói ứng dụng desktop
cd /d "%~dp0"
echo [INFO] Đang đóng gói ứng dụng bằng electron-builder...
call npm run dist
echo.
echo ==================================================
echo Đóng gói hoàn tất! Kiểm tra thư mục "desktop-app/dist"
echo ==================================================
pause
