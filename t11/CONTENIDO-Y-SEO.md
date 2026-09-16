# TÁCTICA 11 — Contenido y SEO

## Secciones incorporadas

Presentación, nosotros, servicios, clientes, experiencia de Montevideo City Torque, galería, proceso, guía de planificación, preguntas frecuentes y contacto por WhatsApp.

## Experiencia confirmada por el propietario

Cliente: Montevideo City Torque. Visita al Perú para el encuentro ante Cienciano en Cusco. Apoyo logístico desde la llegada al Perú, recorrido Lima–Cusco–Lima y retorno a su país. No se han añadido fechas, resultados deportivos, testimonios ni cifras sin confirmar. Cienciano se menciona como rival, no como cliente.

## Galería

La galería muestra un estado de espera hasta contar con fotografías reales de esta visita. No se presentan imágenes de archivo como si fueran clientes. Al agregar fotografías a `public/galeria`, completar `galleryPhotos` en `src/content.ts` con la ruta, descripción, pie de foto y categoría. La galería incluye filtros y ampliación. Publicar solo imágenes cuyo uso esté autorizado. El monograma MCT es una identificación tipográfica, no el escudo oficial del club.

## SEO implementado

- Contenido prerenderizado dentro del HTML, sin depender de JavaScript para leer los servicios o la experiencia.
- Título y descripción específicos; un solo H1 y encabezados por sección.
- Navegación mediante enlaces reales y contenido accesible.
- URL canónica, metadatos para compartir y datos estructurados Organization y WebSite.
- Archivo robots.txt y sitemap.xml.
- Nombre y teléfono comercial consistentes.
- Preguntas frecuentes visibles, sin promesas de resultados enriquecidos ni posicionamiento garantizado.

## Para aparecer en Google

La versión alojada permanece privada para revisión. Un buscador no puede indexar contenido que requiere iniciar sesión. Cuando el propietario decida hacerla pública, confirmar el dominio definitivo, actualizar las URLs de index.html, src/content.ts, robots.txt y sitemap.xml si cambia el dominio, y verificar el sitio en Google Search Console para enviar el sitemap. No se ha cambiado la visibilidad ni creado una cuenta de Search Console.

Conviene añadir fotografías propias, fecha del caso, descripción de los servicios efectivamente prestados, ciudad base, cobertura confirmada y testimonios auténticos autorizados. Estos datos permiten desarrollar páginas útiles por servicio y experiencias reales, sin repetir palabras clave artificialmente.

Referencia: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
Prerenderizado: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

## Archivos y compilación

El código editable está en src y los recursos públicos en public. `pnpm run build` genera dist e incluye el prerenderizado. `pnpm run dev` abre el entorno de edición local. El video del estadio está guardado en public/pitch.mp4 y se incluye en dist/pitch.mp4. Se sirve desde la propia web y también funciona al ejecutar la web en un servidor local sin depender de Pexels. La imagen local sirve de respaldo. Las fuentes de Google y WhatsApp siguen requiriendo conexión. El formulario abre WhatsApp con el resumen para +51 954 708 174; no envía mensajes automáticamente ni almacena los datos.
