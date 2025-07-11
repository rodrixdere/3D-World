# 3D-World

Este proyecto es una visualización interactiva de la Tierra en 3D construida con [Three.js](https://threejs.org/). Muestra un globo terrestre con textura detallada, nubes, iluminación nocturna y un resplandor atmosférico personalizado (efecto Fresnel), todo rodeado de un campo estelar animado.

---

## Características

- Esfera terrestre con mapa detallado de la superficie.
- Capa de nubes con rotación independiente.
- Iluminación nocturna con mapa de luces urbanas.
- Efecto glow atmosférico usando sombreadores personalizados (Fresnel Shader).
- Campo estelar 3D con distribución esférica aleatoria.
- Controles de cámara con **OrbitControls**.
- Responsive al redimensionar la ventana.

---

## Tecnologías usadas

- **Three.js**
- Sombreador personalizado (GLSL)
- HTML5 + JavaScript ES Modules
- Texturas externas (mapas de la Tierra, nubes y luces)

---

## Estructura de archivos
├── index.html
├── index.js
├── getFresnelMat.js # ShaderMaterial con efecto Fresnel
├── getStarfield.js # Generador de estrellas en una esfera 3D
├── assets/
│ ├── 00_earthmap1k.jpg # Textura del mapa de la Tierra
│ ├── 03_earthlights1k.jpg # Mapa de luces nocturnas
│ ├── 06_earthcloudmaptrans4k.jpg# Textura de nubes con transparencia
│ └── stars/circle.png # Textura circular para las estrellas

---

## Cómo ejecutarlo

1. Clona este repositorio:
   ```bash
   git clone https://github.com/rodrixdere/3D-World.git
   cd 3D-World
