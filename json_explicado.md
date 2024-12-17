
# **JSON (JavaScript Object Notation)**

**JSON** es un formato para **almacenar y transmitir datos**. Es fácil de leer para humanos y máquinas, y se utiliza comúnmente en aplicaciones web para enviar datos entre el cliente (navegador) y el servidor.

---

## **1. Estructura básica de JSON**

Un JSON está formado por:
- **Claves**: Siempre deben ir entre comillas dobles (`"`).  
- **Valores**: Pueden ser de diferentes tipos:
  - Texto (string): `"valor"`
  - Números: `123` o `45.67`
  - Booleanos: `true` o `false`
  - Arreglos: `[1, 2, 3]`
  - Objetos: `{ "clave": "valor" }`
  - Null: `null`

### **Ejemplo completo de JSON**:
```json
{
    "nombre": "Juan",
    "edad": 30,
    "esEstudiante": false,
    "hobbies": ["leer", "fútbol", "cocinar"],
    "direccion": {
        "ciudad": "Madrid",
        "pais": "España"
    }
}
```

### Explicación:
1. `"nombre"`: Es una **clave** con un valor tipo **string** `"Juan"`.
2. `"edad"`: Es un **número**.
3. `"esEstudiante"`: Es un **booleano** (`false`).
4. `"hobbies"`: Es un **arreglo** de strings.
5. `"direccion"`: Es un **objeto** anidado dentro del JSON.

---

## **2. Diferencias entre JSON y objetos JavaScript**

Aunque JSON y los objetos de JavaScript son similares, hay algunas diferencias importantes:

| **JSON**                        | **Objeto en JavaScript**             |
|----------------------------------|--------------------------------------|
| Es texto plano (string).         | Es una estructura de datos en memoria. |
| Claves con comillas dobles (`"`). | Claves pueden no llevar comillas.   |
| No soporta funciones.            | Puede incluir métodos (funciones).  |

### Ejemplo comparativo:

#### **JSON** (Texto plano):
```json
{
    "nombre": "Juan",
    "edad": 30
}
```

#### **Objeto en JavaScript**:
```javascript
const persona = {
    nombre: "Juan",
    edad: 30,
    saludar: function () {
        return `Hola, mi nombre es ${this.nombre}`;
    }
};
```

---

## **3. Convertir entre JSON y objetos JavaScript**

Node.js y el navegador tienen métodos para manejar JSON:  
- **`JSON.stringify()`**: Convierte un objeto JavaScript en un JSON (texto).  
- **`JSON.parse()`**: Convierte un JSON (texto) en un objeto JavaScript.

### **Ejemplo: JSON.stringify()**
```javascript
const persona = {
    nombre: "Juan",
    edad: 30,
    hobbies: ["leer", "fútbol", "cocinar"]
};

// Convertir el objeto en JSON
const personaJSON = JSON.stringify(persona);

console.log(personaJSON);
// Salida: {"nombre":"Juan","edad":30,"hobbies":["leer","fútbol","cocinar"]}
```

- **Nota**: El resultado es una cadena de texto, no un objeto.

---

### **Ejemplo: JSON.parse()**
```javascript
const personaJSON = '{"nombre":"Juan","edad":30,"hobbies":["leer","fútbol","cocinar"]}';

// Convertir el JSON en un objeto JavaScript
const personaObjeto = JSON.parse(personaJSON);

console.log(personaObjeto.nombre); // Salida: "Juan"
console.log(personaObjeto.hobbies); // Salida: ["leer", "fútbol", "cocinar"]
```

- **Nota**: Ahora `personaObjeto` es un objeto de JavaScript que puedes manipular.

---

## **4. Usar JSON con APIs**

JSON se usa mucho en APIs para enviar y recibir datos. Vamos a ver un ejemplo práctico de cómo trabajar con JSON al consumir una API.

### **Ejemplo: Obtener datos desde una API**
Supongamos que tienes una API que devuelve información en formato JSON.

#### API ficticia:
```json
{
    "nombre": "Juan",
    "edad": 30,
    "profesion": "Ingeniero"
}
```

#### Código para consumir esta API:
```javascript
// Usar fetch para obtener los datos
fetch('https://api.ejemplo.com/usuario')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        console.log(`Nombre: ${data.nombre}`); // Salida: "Nombre: Juan"
        console.log(`Edad: ${data.edad}`);     // Salida: "Edad: 30"
        console.log(`Profesión: ${data.profesion}`); // Salida: "Profesión: Ingeniero"
    })
    .catch(error => console.error('Error:', error));
```

---

## **5. Buenas prácticas con JSON**

1. **Validar siempre el JSON recibido**:
   - Asegúrate de que los datos sean válidos antes de usarlos.
   - Ejemplo:
     ```javascript
     try {
         const data = JSON.parse(jsonString);
         console.log(data);
     } catch (error) {
         console.error("JSON inválido:", error);
     }
     ```

2. **No mezcles lógica con datos**:
   - Mantén los datos JSON separados del código.

3. **Usa herramientas para trabajar con JSON**:
   - Herramientas como **Postman** o **Insomnia** son útiles para probar APIs.

4. **Comprime JSON para mejorar el rendimiento**:
   - Si trabajas con grandes cantidades de datos, considera usar compresión como **gzip**.

---

## **6. Resumen práctico**

1. **JSON.stringify(objeto)** → Convierte un objeto JavaScript en JSON.  
2. **JSON.parse(json)** → Convierte un JSON en un objeto JavaScript.  
3. **Usos comunes**:
   - Enviar datos entre cliente y servidor.
   - Almacenar configuraciones en archivos `.json`.
   - Manipular datos en APIs.

---

### **Ejemplo completo**

#### Archivo `config.json`:
```json
{
    "puerto": 8080,
    "baseDeDatos": {
        "host": "localhost",
        "usuario": "admin",
        "clave": "12345"
    }
}
```

#### Código para usar este JSON:
```javascript
const fs = require('fs');

// Leer el archivo JSON
const data = fs.readFileSync('config.json', 'utf-8');
const config = JSON.parse(data);

console.log(`Servidor corriendo en el puerto: ${config.puerto}`);
// Salida: "Servidor corriendo en el puerto: 8080"

console.log(`Base de datos: ${config.baseDeDatos.host}`);
// Salida: "Base de datos: localhost"
```