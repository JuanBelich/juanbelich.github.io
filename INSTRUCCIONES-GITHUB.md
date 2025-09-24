# 🚀 Instrucciones para subir tu Portfolio a GitHub

## 📋 **Proceso Automatizado - Solo 2 pasos**

### **Paso 1: Ejecutar el primer script**
1. Abre **PowerShell** o **Command Prompt** en tu carpeta del proyecto
2. Ejecuta: `deploy-to-github.bat`
3. Espera a que termine (configurará Git localmente)

### **Paso 2: Crear repositorio en GitHub**
1. Ve a [https://github.com/new](https://github.com/new)
2. **Repository name:** `portfolio` (o el nombre que prefieras)
3. **Description:** `Mi portafolio personal con formulario de contacto`
4. **🚨 IMPORTANTE:** NO marques "Initialize this repository with a README"
5. Haz clic en **"Create repository"**

### **Paso 3: Ejecutar el segundo script**
1. Ejecuta: `deploy-to-github-step2.bat`
2. Ingresa tu nombre de usuario de GitHub
3. Ingresa el nombre del repositorio (ejemplo: `portfolio`)
4. ¡Listo! Tu código se subirá automáticamente

## 🌐 **Activar GitHub Pages (Hosting gratuito)**

Después de subir tu código:

1. Ve a tu repositorio en GitHub
2. Haz clic en **"Settings"**
3. Scroll down hasta **"Pages"**
4. En **"Source"**, selecciona **"Deploy from a branch"**
5. Selecciona **"main"** y **"/ (root)"**
6. Haz clic en **"Save"**

### **Tu sitio estará disponible en:**
`https://tu-usuario.github.io/portfolio`

## 🔧 **Si algo sale mal**

### **Error: Git no reconocido**
- Instala Git desde: [https://git-scm.com/download/win](https://git-scm.com/download/win)

### **Error de autenticación**
- GitHub te pedirá autenticarte la primera vez
- Usa tu usuario y contraseña de GitHub

### **Error: Repository already exists**
- Cambia el nombre del repositorio en GitHub
- O usa un nombre diferente en el script

## 📁 **Archivos incluidos en tu repositorio**
- ✅ `index.html` - Página principal
- ✅ `styles.css` - Estilos
- ✅ `script.js` - JavaScript con EmailJS configurado
- ✅ `README.md` - Documentación del proyecto
- ✅ `CONFIGURACION_EMAILJS.md` - Guía de EmailJS
- ✅ `.gitignore` - Archivos a ignorar

## 🎯 **Resultado final**
Tu portafolio estará:
- 📱 Disponible online 24/7
- 🔗 Con URL pública para compartir
- 📧 Con formulario de contacto funcional
- 🎨 Con diseño responsive y profesional

¡Tu portafolio estará listo para mostrar al mundo! 🌟
