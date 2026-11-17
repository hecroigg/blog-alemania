# GermanyBase — fase 1: enfoque editorial español y preservación SEO

Fecha: 17 de noviembre de 2026  
Estado: primera implementación propuesta en rama, pendiente de validar y publicar.

## Objetivo

Concentrar **las nuevas mejoras editoriales** en lectores hispanohablantes que quieren vivir, estudiar o trabajar en Alemania. No eliminar de golpe las versiones alemana e inglesa, que ya generan algunas impresiones y clics.

La primera entrega consiste en:
- Nueva portada española renderizada por el servidor: `/es`.
- Tres bloques de navegación: trámites, trabajo y vida diaria.
- Enlaces a guías españolas existentes mediante `exactGuidePath("es", ...)`, para no inventar ni duplicar URLs.
- Navegación contextual para `/es` y sus guías.
- El selector permite cambiar entre `/` y `/es`.
- `/es` tiene metadatos, URL canónica, schema.org CollectionPage y entrada en el sitemap.
- Ninguna redirección permanente, eliminación, `noindex` o alteración de guías existentes.

## Línea base (capturas proporcionadas de Search Console y AdSense)

| Indicador | Valor |
| --- | ---: |
| Clics orgánicos — tres meses | 23 |
| Impresiones — tres meses | 5.460 |
| CTR — tres meses | 0,4 % |
| Posición media — tres meses | 26,2 |
| URLs indexadas | 89 |
| URLs no indexadas | 142 |
| Sitemap | Correcto; 147 URLs descubiertas |
| AdSense | Rechazo: “Contenido de poco valor” |

Razones visibles de no indexación: 42 noindex, 19 redirecciones, 1 soft 404, 58 descubiertas sin indexar y 22 errores 404. **No todos esos estados implican un error**: se debe comprobar la función de cada URL.

La captura identifica clics en `/tools/compare-cities`, `/de/guides/grundfreibetrag-deutschland-2026`, `/en/guides/deutschlandticket-price-rules-2026`, además de algunas guías de empleo, seguro y burocracia. Esto es un motivo para **no borrarlas ni desindexarlas sin evidencia**.

## Fase 2 — auditoría previa a la migración editorial

1. Exportar desde Search Console → Rendimiento → Páginas y Consultas (3 meses y 28 días) en CSV.
2. Exportar desde Indexación → Páginas los grupos noindex, 404, redirecciones y descubiertas sin indexar, con **URLs concretas**.
3. Para cada URL, anotar: idioma, intención, impresiones, clics, enlaces internos, canonical, indexabilidad, calidad, fuentes y fecha de revisión.
4. Clasificar en `conservar`, `mejorar`, `consolidar/301`, `mantener 404`, o `excluir deliberadamente`. Nunca redirigir un 404 genéricamente a la home.
5. Revisar el contenido editorial en español: actualizaciones legales, fuentes oficiales, originalidad y experiencia del lector. Evitar afirmar experiencia personal que no haya sido documentada.
6. Medir consultas que reciben impresiones sin clics antes de editar títulos y descripciones.

## Fase 3 — reducción progresiva del alcance

- Publicar **solo nuevo contenido en español** durante el experimento inicial.
- Mantener las páginas en alemán e inglés que estén indexadas y tengan señales hasta evaluar su valor individual.
- No suprimir `/de` ni `/en` ni idiomas mediante redirecciones generales.
- En función de las exportaciones, consolidar páginas muy similares con equivalencias reales y redirecciones permanentes únicamente a destinos útiles.
- Si se cambian canónicas o hreflang, exigir pruebas de respuesta HTTP 200, canonical autorreferente e idiomas equivalentes.
- Mejorar los contenidos de más demanda con listas accionables, límites claros, autoridades y ejemplos verificables.
- Medir 7/28 días: impresiones, clics, CTR por consulta, posición y URLs indexadas. No interpretar un 0,4 % global sin segmentación.

## AdSense: criterio para volver a solicitar revisión

No reenviar una solicitud solo por añadir `/es`. Antes:
- Comprobar contenido original y útil en varias guías principales.
- Auditar páginas legales, navegación, accesibilidad, consentimiento publicitario y enlaces rotos.
- Comprobar que las páginas principales devuelven HTML rastreable y que Cloudflare no bloquea rastreadores legítimos.
- Evitar inflar el sitio con contenido automático de escaso valor.

## Verificaciones antes de publicar

- CI: typecheck, lint, build Cloudflare, pruebas existentes.
- Comprobar `/es`: HTTP 200, título/description en español, canonical `https://germanybase.de/es` y enlaces válidos.
- Comprobar `/sitemap.xml` y presencia de `/es`.
- Probar en escritorio y móvil: menú y selector idioma.
- Confirmar que `/`, las rutas `/de/guides/...`, `/en/guides/...` y `/es/guides/...` siguen funcionando.
- Tras publicar, validar el contenido HTML y el panel Search Console; no hay garantía de indexación inmediata.

## Nota de posicionamiento

Esta fase mejora la organización del contenido y la indexabilidad de una nueva entrada española, **no garantiza** más tráfico ni aprobación de AdSense. La posible expansión internacional se evaluará con datos reales, no por traducir automáticamente decenas de páginas.
