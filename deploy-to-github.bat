@echo off
echo ========================================
echo    SUBIENDO PORTFOLIO A GITHUB
echo ========================================
echo.

echo [1/6] Inicializando repositorio Git...
git init

echo [2/6] Configurando Git (si es necesario)...
git config user.name "Juan Belich"
git config user.email "jbelich89@gmail.com"

echo [3/6] Agregando archivos al staging...
git add .

echo [4/6] Haciendo commit inicial...
git commit -m "Initial commit: Portfolio with EmailJS contact form integration"

echo [5/6] Configurando branch main...
git branch -M main

echo.
echo ========================================
echo    CONFIGURACION COMPLETADA
echo ========================================
echo.
echo SIGUIENTE PASO:
echo 1. Ve a https://github.com/new
echo 2. Crea un repositorio llamado "portfolio"
echo 3. NO marques "Initialize with README"
echo 4. Copia el nombre de usuario y repositorio
echo 5. Ejecuta: deploy-to-github-step2.bat
echo.
pause
