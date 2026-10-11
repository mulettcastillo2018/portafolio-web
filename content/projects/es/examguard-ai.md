---
title: ExamGuard AI — exámenes en línea con supervisión responsable
summary: Plataforma de exámenes en línea para colegios y universidades con supervisión asistida. Detecta hechos en el navegador, los interpreta con reglas transparentes y deja la decisión a una persona. Claude redacta un resumen que cita cada señal y nunca afirma que alguien hizo trampa.
stack:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - next-intl
  - PostgreSQL (Neon)
  - Prisma
  - Better Auth
  - Zod
  - Claude API
  - MediaPipe
  - Vitest
  - Playwright
  - GitHub Actions
  - Docker
  - Vercel
  - Claude Code
role: Product owner y dirección técnica, construido con Claude Code
year: 2026
image: /images/projects/examguard-ai.jpg
featured: true
order: 0
links:
  demo: ""
  repo: https://github.com/mulettcastillo2018/examguard-ai
---

## El problema

Los exámenes en línea necesitan supervisión, pero muchas herramientas graban cámara y micrófono, usan reconocimiento facial y terminan señalando a un estudiante por una mirada o por una conexión inestable. En los colegios, además, hay menores de edad, cuyos datos exigen la autorización del acudiente (Ley 1581 de 2012).

## La solución

Una plataforma completa de exámenes con una regla que guía todo el diseño: **detección → interpretación → decisión humana**. El sistema nunca dice "hizo trampa"; como máximo dice "revisión recomendada", con hechos que se pueden verificar.

- **Exámenes**: banco de preguntas de cinco tipos, constructor de exámenes con ajustes por estudiante, ventana y duración controladas por el servidor, guardado automático con versiones (sigue funcionando sin conexión) y un solo dispositivo activo por intento.
- **Calificación y resultados**: calificación automática y manual, cuenta la mejor nota cuando hay varios intentos y las notas se publican con el examen cerrado, sin revelar las respuestas correctas.
- **Supervisión en vivo**: el navegador registra hechos (cambios de pestaña, pérdida de foco, inactividad, salida de pantalla completa, desconexiones y, del texto pegado, solo cuántos caracteres) y el docente los ve en un monitoreo que se actualiza cada 5 segundos. Un simulador permite demostrarlo sin cámara.
- **Interpretación transparente**: agentes deterministas por dominio y un motor de reglas con los umbrales de cada institución convierten los eventos en señales con explicaciones claras, por ejemplo: "Se registraron 3 salidas de la pestaña o pérdidas de foco de la ventana en menos de 10 minutos, entre las 08:10 y las 08:14".
- **IA con barandas**: Claude redacta un resumen para quien revisa a partir de las señales, sin nombres ni datos personales. El texto debe citar cada señal ([S1], [S2]…) y se rechaza si atribuye intenciones, culpa o emociones. En ese caso, o si la API falla, se usa una plantilla con los hechos.
- **Revisión humana**: una cola de sesiones por revisar y, en cada una, la línea de tiempo filtrable donde cada evento muestra la señal que lo cita. Quien revisa decide entre "sin irregularidad" y "requiere investigación" (que exige explicar por qué), y todo queda en la auditoría. El estudiante ve sus propios hechos en "Mis datos de supervisión", sin las señales ni el resultado.
- **Cámara y audio en el navegador**: MediaPipe cuenta rostros dos veces por segundo y Web Audio mide el nivel de sonido; la imagen y el audio nunca salen del equipo. El estudiante prueba sus dispositivos antes de empezar y ve en todo momento lo mismo que se mide.
- **Menores de edad**: la institución registra la autorización del acudiente, con la versión del aviso y dónde está el soporte firmado. El menor solo puede activar lo autorizado, y aun así decide.
- **Producción**: política de contenido con nonce, límites de uso, borrado automático de la evidencia según la retención de cada institución, métricas para la administración, imagen de Docker validada en CI y un modo demostración para la demo pública.

## Mi rol frente a la IA

Partí de una especificación de producto de 31 secciones y dirigí a Claude Code fase por fase: primero el análisis y la arquitectura, después cinco fases de construcción, cada una cerrada con pruebas y una revisión en el navegador.

Las decisiones de producto y de ética fueron mías:

- **Sin grabación de audio ni video** en esta versión: la cámara y el micrófono se procesan en el navegador y solo viajan eventos.
- **Negarse a la cámara nunca genera una señal.** No se puede condicionar un examen a entregar datos sensibles.
- **Las señales salen de reglas deterministas y auditables.** La IA solo redacta, y su texto pasa por barandas antes de mostrarse.
- **Los menores sin autorización registrada del acudiente** presentan sin cámara ni micrófono.
- **La evidencia se borra sola** al cumplirse la retención prometida en el aviso de consentimiento, aunque haya sesiones sin revisar: lo prometido al estudiante va primero, y la plataforma avisa antes de que venza.

Cada decisión técnica quedó documentada con su motivo y su alternativa: 50 decisiones en el repositorio.

## En cifras

- 24 modelos de datos y 34 pantallas.
- 140 pruebas unitarias, 77 de integración contra la base de datos real y 18 de extremo a extremo con Playwright, algunas con dos navegadores a la vez (estudiante y docente) y con cámara simulada.
- Integración continua en GitHub Actions: tipos, lint, integración, extremo a extremo y la imagen de Docker en cada cambio.
- Construido del 1 al 11 de octubre de 2026, en 36 commits y 8 fases.

## Lo que aprendí

- **La IA responsable es un diseño, no un filtro.** Separar detección, interpretación y decisión hizo que cada pieza fuera verificable y que la IA no pudiera acusar a nadie.
- **Las barandas se prueban como cualquier otra regla.** Las palabras prohibidas, la obligación de citar señales y el respaldo con plantilla tienen pruebas propias, incluido un proveedor falso que intenta acusar.
- **Medir antes de optimizar.** Un retraso de varios segundos en cada lote de eventos venía de las idas y vueltas a la base de datos. El análisis pasó a ejecutarse después de responder.
- **Una promesa de privacidad se verifica en la red.** Al activar la política de contenido apareció que MediaPipe intenta enviar estadísticas de uso a un servidor de Google; la política lo bloquea. "La imagen no sale del equipo" no depende de la buena voluntad de una librería.
- **Diagnosticar con datos, no con suposiciones.** Una cámara que "desaparecía" en las pruebas resultó ser el servicio de captura del navegador reiniciándose; registrar cada pedido y cada proceso lo mostró, y de ahí salió la reconexión automática.

## Estado

Las ocho fases están terminadas y en GitHub, con la integración continua en verde (incluida la imagen de Docker). La demo pública, con cuentas de ejemplo que se restablecen cada noche, está lista para publicarse en Vercel con Neon. El resumen con IA funciona con una clave de la API de Anthropic; sin ella, el sistema usa la plantilla.
