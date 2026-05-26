@echo off
chcp 65001 > nul
title Khởi động TheoDoiTienDo Desktop
cd /d "%~dp0"
echo [INFO] Đang khởi động ứng dụng dạng phần mềm...
npm start
