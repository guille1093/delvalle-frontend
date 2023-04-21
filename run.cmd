@echo off
REM Comando para abrir una terminal invisible como administrador y ejecutar "npm run dev"
start "" /min /B cmd.exe /c "powershell start-process cmd.exe -ArgumentList '/s,/c,npm run dev' -verb runas"

REM Comando para abrir otra terminal invisible como administrador y ejecutar "pocketbase serve"
start "" /min /B cmd.exe /c "powershell start-process cmd.exe -ArgumentList '/s,/c,pocketbase serve' -verb runas"
