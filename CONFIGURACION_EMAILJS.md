# 📧 Configuración de EmailJS para el Formulario de Contacto

## Paso 1: Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign Up" y crea una cuenta gratuita
3. Confirma tu email

## Paso 2: Conectar tu cuenta de Gmail

1. En el dashboard de EmailJS, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **"Gmail"**
4. Haz clic en **"Connect Account"** y autoriza EmailJS
5. Copia el **Service ID** que aparece (ejemplo: `service_abc123`)

## Paso 3: Crear un Template de Email

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura el template así:

### Configuración del Template:

**Subject (Asunto):**
```
Nuevo mensaje de contacto: {{subject}}
```

**Content (Contenido):**
```
Has recibido un nuevo mensaje desde tu portfolio:

Nombre: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu portfolio web.
```

4. En **"Settings"**:
   - **From Name:** Portfolio Juan Belich
   - **From Email:** tu-email@gmail.com (usa tu Gmail)
   - **To Email:** {{to_email}}

5. Guarda el template y copia el **Template ID** (ejemplo: `template_xyz789`)

## Paso 4: Obtener tu Public Key

1. Ve a **"Account"** → **"General"**
2. Copia tu **Public Key** (ejemplo: `abc123def456`)

## Paso 5: Configurar el código

En el archivo `script.js`, reemplaza estas líneas:

```javascript
// Línea 160: Reemplaza TU_PUBLIC_KEY_AQUI
emailjs.init("abc123def456"); // Tu Public Key real

// Línea 203: Reemplaza TU_SERVICE_ID y TU_TEMPLATE_ID
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

### Ejemplo completo:
```javascript
// Configuración EmailJS
emailjs.init("abc123def456");

// En la función de envío
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## Paso 6: Probar el formulario

1. Abre tu portfolio en el navegador
2. Llena el formulario de contacto
3. Envía un mensaje de prueba
4. Revisa tu Gmail - debería llegar el email

## 🔧 Solución de Problemas

### Si no llegan los emails:
1. Revisa la consola del navegador (F12) por errores
2. Verifica que los IDs sean correctos
3. Asegúrate de que el servicio Gmail esté conectado
4. Revisa la carpeta de spam en Gmail

### Si aparece error CORS:
- EmailJS funciona desde cualquier dominio, incluyendo GitHub Pages

### Límites gratuitos:
- 200 emails por mes
- Suficiente para un portfolio personal

## 📝 Notas Importantes

- **Nunca subas las claves privadas a GitHub**
- La Public Key es segura para usar en el frontend
- Los emails llegarán desde tu propia cuenta de Gmail
- Puedes personalizar el template como quieras

## 🎯 Resultado Final

Una vez configurado, cuando alguien envíe el formulario:
1. ✅ Recibirás un email en `juanbelich@gmail.com`
2. ✅ El email incluirá toda la información del formulario
3. ✅ Podrás responder directamente desde Gmail
4. ✅ Funciona perfectamente con GitHub Pages

¡Listo! Tu formulario de contacto estará completamente funcional.
