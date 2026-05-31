; Custom NSIS script for electron-builder
; Handles cleaning up crash dumps, app cache, and Windows prefetch files during install & uninstall

!macro customInit
  ; Runs before the installer initializes (to ensure clean installation)
  
  ; Delete old crash dumps
  Delete "$LOCALAPPDATA\CrashDumps\TheoDoiTienDo.exe.*.dmp"
  Delete "$LOCALAPPDATA\CrashDumps\start_app.exe.*.dmp"
  
  ; Delete old Windows prefetch files (if installer is run as Admin)
  Delete "$WINDIR\Prefetch\THEODOITIENDO*.pf"
  Delete "$WINDIR\Prefetch\START_APP*.pf"
!macroend

!macro customUnInstall
  ; Runs during uninstallation
  
  ; Delete user AppData Roaming folder (contains cache, localStorage, indexedDB, and backend.log)
  RMDir /r "$APPDATA\theodoitiendo-desktop"
  
  ; Delete AppData Local updater cache folder
  RMDir /r "$LOCALAPPDATA\theodoitiendo-desktop-updater"
  
  ; Delete crash dumps
  Delete "$LOCALAPPDATA\CrashDumps\TheoDoiTienDo.exe.*.dmp"
  Delete "$LOCALAPPDATA\CrashDumps\start_app.exe.*.dmp"
  
  ; Delete Windows prefetch files
  Delete "$WINDIR\Prefetch\THEODOITIENDO*.pf"
  Delete "$WINDIR\Prefetch\START_APP*.pf"
!macroend
