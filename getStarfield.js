/**
 * Esta función genera un campo de estrellas (Starfield) en 3D usando Three.js.
 * Las estrellas están distribuidas aleatoriamente alrededor de una esfera.
 *
 * @param {Object} options - Opciones para personalizar el campo de estrellas.
 * @param {number} options.numStars - Cantidad de estrellas a generar (por defecto 500).
 * @returns {THREE.Points} Objeto de puntos representando las estrellas.
 */

import * as THREE from "three";

export default function getStarfield({ numStars = 500 } = {}) {
  /**
   * Genera una posición aleatoria sobre una esfera para colocar una estrella.
   * @returns {Object} Objeto con la posición, color y distancia mínima.
   */
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25; // Distancia aleatoria desde el centro
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    // Conversión de coordenadas esféricas a cartesianas
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);

    return {
      pos: new THREE.Vector3(x, y, z),
      hue: 0.6, // Color base (azul-violeta)
      minDist: radius, // Distancia desde el centro
    };
  }

  const verts = [];  // Posiciones de las estrellas
  const colors = []; // Colores de las estrellas
  const positions = []; // Para guardar datos adicionales si se desea

  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint();
    const { pos, hue } = p;
    positions.push(p);

    // Generamos un color con tono fijo, saturación baja y luminosidad aleatoria
    const col = new THREE.Color().setHSL(hue, 0.2, Math.random());

    // Guardamos la posición y el color
    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
  }

  // Creamos la geometría del sistema de puntos (estrellas)
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  // Creamos el material para las estrellas
  const mat = new THREE.PointsMaterial({
    size: 0.2, // Tamaño de cada estrella
    vertexColors: true, // Activamos los colores individuales
    map: new THREE.TextureLoader().load("./assets/stars/circle.png"), // Textura circular para simular estrellas
  });

  // Creamos y retornamos el objeto de puntos
  const points = new THREE.Points(geo, mat);
  return points;
}