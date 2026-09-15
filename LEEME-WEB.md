# PERUGO.PE — Carpeta `web\`

Punto de entrada: **`index.html`**. Ese archivo lista las ocho propuestas y
enlaza a cada una. Cada propuesta vive en su propia subcarpeta con su
`index.html` y es independiente de las demás.

| Carpeta | Nombre | Dirección visual |
|---|---|---|
| `o1` | El viaje apenas comienza | Editorial cinematográfico · crema, verde bosque, naranja |
| `o2` | Tu propio Perú — identidad andina | Color vivo · azul, fucsia, amarillo, textil andino |
| `o3` | Perú se vive. Y se queda contigo. | Logotipo vectorial · turquesa, coral, verde profundo |
| `o4` | Tu propio Perú — firma editorial | Arena, coral y lima · logotipo cursivo |
| `o5` | Vive Perú como nunca antes | Premium dorado · crema, petróleo, dorado |
| `o6` | Arcilla | Layout de la referencia, piel cálida · hueso, tinta café, arcilla |
| `o7` | Altura | Editorial nocturna · azul profundo, lima ácido, lila |
| `o8` | Nada librado al azar | **Papel, tinta y ocre · bilingüe ES/EN. La propuesta de referencia.** |

Nota de numeración: las etiquetas internas de `o3` y `o5` dicen "Propuesta 3" y
"Propuesta 2" por el orden en que se hicieron. El índice y este documento usan
siempre el nombre de la carpeta (`o1` … `o8`) para evitar confusiones.

---

## Decisiones de diseño ya tomadas

Estas decisiones aplican a todas las propuestas y no hace falta volver a
consultarlas.

**Negocio y contenido**
- **Sin precios en la web.** Cada ruta se cotiza por conversación. Donde una
  plantilla de referencia mostraba precio, va "Cotizar esta ruta".
- **Dos únicos objetivos de conversión:** WhatsApp y el formulario de
  planificación. Ningún otro CTA compite con ellos.
- **La promesa central es el recojo en el aeropuerto**, no el "punto de
  encuentro". Nace de una frase real de una clienta y es el diferencial que se
  comunica antes que cualquier otro.
- **Sin cifras inventadas.** No se publican métricas de viajeros, destinos ni
  calificaciones que no estén verificadas. Lo que sí se puede afirmar: cinco
  años operando, atención 1 a 1, transporte privado, guías locales.
- **Todo el contenido de relleno va rotulado** como testimonio ilustrativo,
  artículo de muestra o fotografía de referencia.
- Público objetivo 70% español / 30% inglés. Las maquetas están en español.

**Técnico**
- Cada propuesta es HTML + CSS + JS plano, sin librerías ni build. Se abre con
  doble clic sobre su `index.html`.
- Ningún formulario envía datos a un servidor: arman un mensaje de WhatsApp
  prellenado y lo abren.
- Todas comparten el mismo video de portada (Vimeo 797801183), en bucle y
  silenciado, con control de sonido y pausa.
- Fuentes (Google Fonts), fotografías y video requieren conexión a internet.
- Se respeta `prefers-reduced-motion`: con esa preferencia activa el movimiento
  se apaga.
- En `o6` y `o7`, toda fotografía que no cargue se reemplaza automáticamente por
  un fondo generado con el nombre del destino y el aviso "fotografía pendiente
  del cliente". Nunca aparece un icono de imagen rota.

**Color: qué camino ocupa cada propuesta**
- `o1` a `o5` se mueven en la misma familia: cremas, verdes, dorados y corales.
- `o6` conserva ese layout pero en clave cálida y sobria (hueso y arcilla).
- `o7` va a azul profundo con lima ácido.
- `o8` deja el color donde importa: las fotografías van a todo color y la
  interfaz se sostiene en papel, tinta y un único acento ocre (#B0762A).
  La primera versión era monocroma y el color solo aparecía al pasar el
  cursor; se descartó porque escondía justamente lo que vende un viaje.

---

## Por qué existe `o8` y qué aprendimos de las siete anteriores

Las propuestas `o1` a `o7` comparten el mismo esqueleto — portada con video,
buscador o CTA, grilla de destinos, "por qué elegirnos" con iconos, rutas,
testimonios, formulario. Ese es el esqueleto de una agencia de volumen, y
cambiarle la paleta no lo convierte en premium.

Referencias revisadas: Aracari (Lima, desde 1996), Jacada Travel y Black
Tomato. Lo que las hace caras no es el diseño:

- **Nombran cosas.** Hoteles, trenes y restaurantes con nombre propio, no
  "alojamiento seleccionado". La especificidad es lo que sube el precio.
- **Ponen la cara.** Equipo con nombre y fotografía; se compra a una persona.
- **Muestran sellos de terceros.** Condé Nast, Travel + Leisure, Trustpilot.
- **Su llamado a la acción es empezar una conversación**, no "explorar".
- **Dicen su antigüedad como número.**
- No publican precios en la portada (Aracari), pero sí un "desde" por
  itinerario (Jacada).

**Lo que más mueve la aguja, en orden:** fotografía propia · nombres propios ·
caras del equipo · el protocolo escrito · versión en inglés · menos densidad.

**Tratamiento de portada** (revisado sobre la web de Aracari, 15/09/2026):
la portada de referencia abre con un primer plano humano a todo color, no un
paisaje; titular en cursiva serif de tamaño moderado, velo ligero y un botón
de acento cálido. `o8` replica ese tratamiento con el video propio de PERUGO.
No se usa material de Aracari en ninguna maqueta: es su web, no la nuestra.

**Decisiones tomadas en esta ronda** (15/09/2026):
- Fotografía: por ahora solo stock. Por eso `o8` es monocroma: el blanco y
  negro unifica material de terceros y le quita el aire de postal repetida.
- Pruebas disponibles hoy: reseñas reales. Van en los tres espacios
  reservados de `o8`; no se inventa ninguna mientras tanto.
- Precios: no se muestran, en ninguna propuesta.
- Idioma: `o8` es bilingüe español/inglés con selector.

---

## Pendientes antes de publicar cualquiera de ellas

1. **Confirmar el WhatsApp.** En todas las maquetas está `+51 954 708 174`;
   el número quedó incompleto en las notas del proyecto y hay que verificarlo.
2. Reemplazar las fotografías de referencia por material propio del cliente.
3. Reemplazar testimonios y artículos de muestra por reseñas reales.
4. Elegir dirección de marca y logotipo. Eso desbloquea el prototipo navegable
   en el stack definitivo (Next.js + TailwindCSS + Vercel).
