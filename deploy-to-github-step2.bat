@echo off
echo ========================================
echo    CONECTANDO CON GITHUB
echo ========================================
echo.

set /p username="Ingresa tu nombre de usuario de GitHub: "
set /p reponame="Ingresa el nombre del repositorio (ej: portfolio): "

echo.
echo [6/6] Conectando con GitHub y subiendo archivos...
git remote add origin https://github.com/%username%/%reponame%.git
git push -u origin main

echo.
echo ========================================
echo    SUBIDA COMPLETADA!
echo ========================================
echo.
echo Tu portfolio esta disponible en:
echo https://github.com/%username%/%reponame%
echo.
echo Para activar GitHub Pages:
echo 1. Ve a tu repositorio en GitHub
echo 2. Settings ^> Pages
echo 3. Source: Deploy from branch
echo 4. Branch: main, folder: / (root)
echo 5. Save
echo.
echo Tu sitio web estara en:
echo https://%username%.github.io/%reponame%
echo.
pause
