A&S CONTRACTING — WEB RESPONSIVE
================================

ARCHIVOS
- index.html       Página principal de una sola página (secciones conectadas por el menú).
- styles.css       Todos los estilos, colores, disposición y animaciones.
- script.js        Menú móvil, efectos de aparición, navegación activa y comportamiento del formulario.
- contact.php      Procesamiento del formulario mediante PHP mail().
- assets/          Logo y recursos gráficos locales de la web.

PARA VER LA WEB
1. Descomprime la carpeta completa.
2. Abre index.html en tu navegador. La apariencia y las animaciones se verán; el envío real del formulario requiere los pasos de abajo.

PARA PUBLICAR Y ACTIVAR EL FORMULARIO
1. Sube la carpeta completa a un alojamiento web que soporte PHP.
2. El formulario ya está configurado para enviar las solicitudes a albertosonllc@gmail.com.
3. Confirma con el proveedor de hosting que PHP mail() esté habilitado/configurado. Si el hosting no permite mail(), habrá que conectar el formulario con el servicio de correo que uses.
4. Publica en un alojamiento con PHP, envía una solicitud de prueba y revisa también la carpeta de spam. Abrir el HTML directamente en tu computadora no envía correos.

PERSONALIZAR ANTES DE PUBLICAR
- MÉTRICAS: en index.html, reemplaza los ejemplos 10+ años y 50+ proyectos por cifras reales.
- PORTAFOLIO: los seis títulos, fechas y gráficos project-01.svg a project-06.svg son ejemplos de diseño, no fotografías ni datos reales. Sustituye las imágenes SVG por fotos de proyectos reales y actualiza sus nombres y fechas en index.html. Mantén los nombres de archivo o actualiza el src de cada imagen.
- REDES: en index.html, sustituye las direcciones de Facebook, Instagram y TikTok por los perfiles reales de A&S.
- INFORMACIÓN: ajusta los textos de misión, visión, servicios y datos de contacto a la información real de la empresa.
- LOGO: ya se usa el logo proporcionado en assets/logo.png.

ESTRUCTURA
La página usa anclas internas (#inicio, #empresa, #servicios, #proyectos y #contacto); no depende de páginas HTML adicionales. El botón “Solicitar cotización”, los botones de proyectos y las llamadas a la acción llevan al área de contacto.
