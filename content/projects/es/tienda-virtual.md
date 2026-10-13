---
title: Tienda virtual — e-commerce colombiano
summary: Tienda en línea con pagos Wompi, contra entrega, factura electrónica de la DIAN y lo que exigen las leyes 1480 y 1581. Después de construirla pedí una auditoría técnica y dirigí, por fases, la corrección de sus hallazgos y todo lo que faltaba para vender en Colombia, con 309 comprobaciones automáticas en integración continua.
stack:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Zustand
  - Node.js
  - Express
  - PostgreSQL (Neon)
  - Prisma
  - Zod
  - JWT + bcrypt
  - OAuth 2.0
  - Wompi
  - Alanube (DIAN)
  - Resend
  - GitHub Actions
  - Claude Code
role: Product owner y dirección técnica, construido con Claude Code
year: 2026
image: /images/projects/tienda-virtual.jpg
featured: true
order: 1
links:
  demo: https://tienda-mulett.vercel.app
  repo: https://github.com/mulettcastillo2018/tienda-virtual
---

## El problema

Una tienda en línea para Colombia necesita más que un catálogo. Tiene que cobrar con los medios que usa la gente (tarjeta, PSE, Nequi o efectivo al recibir), controlar los descuentos sin perder el rastro de los precios, responder peticiones, quejas y reclamos dentro del plazo que exige el Estatuto del Consumidor (Ley 1480 de 2011), emitir factura electrónica ante la DIAN y tratar los datos personales con autorización (Ley 1581 de 2012).

## La solución

Un frontend en Next.js y una API REST en Express con TypeScript sobre PostgreSQL, con Prisma como ORM.

- **Catálogo y compra**: filtros por precio y marca, galería de 4 imágenes por producto y checkout por pasos. Se puede comprar sin crear cuenta (el pedido se sigue con un enlace firmado) y pagar con **Wompi** o contra entrega en las ciudades que defina la tienda.
- **Pagos que no se pierden**: si un pago se rechaza, el cliente puede reintentar con otro medio. Si no paga a tiempo, el pedido vence solo, los productos vuelven a su carrito y el inventario se libera.
- **Operación diaria**: pedidos por estado (pagado, en preparación, enviado, entregado) con bitácora, la dirección copiada al pedido y un tablero de ventas de 7, 30 o 90 días.
- **Descuentos con trazabilidad**: cada venta queda enlazada a la campaña de descuento que estaba vigente, para poder explicar cualquier precio pasado.
- **Posventa según la ley**: PQRS con área jurídica y plazo de 15 días hábiles; retracto y reversión del pago con plazos en días hábiles que descuentan los festivos de Colombia.
- **Factura electrónica**: por medio de Alanube, con IVA por producto (19 %, 5 % o excluido) y nota crédito automática al reembolsar.
- **Datos personales**: autorización con constancia y versión de la política, ofertas aparte con baja desde cualquier correo, descarga de los datos y eliminación de la cuenta.
- **Crecimiento**: páginas renderizadas en el servidor para Google (metadatos, sitemap y datos estructurados), reseñas solo de quien compró y recibió el producto, y recordatorio de carrito abandonado solo a quien autorizó las ofertas.
- **Extras**: ofertas relámpago, inicio de sesión con Google y Facebook (OAuth 2.0), español e inglés y modo oscuro en toda la aplicación, incluido el panel de administración.

## Mi rol frente a la IA

Construí la tienda dirigiendo a Claude Code, un agente de programación. El agente propuso la arquitectura y escribió el código y las pruebas. Mi trabajo fue otro:

- **Definí el producto y las reglas del negocio colombiano.** El área jurídica para las PQRS, la trazabilidad de descuentos, exactamente 4 imágenes por producto y las reseñas solo de quien compró fueron decisiones mías.
- **Pedí una auditoría antes de seguir agregando funciones.** El agente revisó el código completo y entregó un [informe técnico y de negocio](https://github.com/mulettcastillo2018/tienda-virtual/blob/main/docs/analisis-2026-09-28.pdf) con hallazgos y una hoja de ruta por fases. Yo decidí el orden: primero versionar, luego pagos, cuentas y archivos.
- **Contrasté con otra IA.** Una revisión externa encontró una condición de carrera: dos compras simultáneas podían vender la misma última unidad. Se corrigió con un descuento atómico dentro de la transacción (`updateMany ... WHERE stock >= cantidad`) y se comprobó con compras simultáneas reales.
- **Seguí la hoja de ruta hasta el final.** Aprobé fase por fase la operación diaria, el crecimiento y la formalización legal; cada una se publicó en la demo solo con la integración continua en verde.
- **Exigí evidencia.** Cada fase se cerró con pruebas que crean sus propios datos y los borran al terminar.

## Qué se corrigió después de la auditoría

- **Pagos**: webhook de Wompi idempotente y con validación del monto. Un rechazo ya no cancela el pedido, y la tienda consulta directamente la API de Wompi para no depender solo del webhook.
- **Cuentas**: sesiones que se revocan al instante al desactivar un usuario o cambiar su rol, límites de intentos, OAuth con `state` y sin vinculación automática de cuentas, y cabeceras de seguridad.
- **Archivos**: el tipo de cada archivo se valida por su contenido real, no por su extensión. Los adjuntos de las PQRS son privados y se entregan con enlaces firmados.
- **Calidad**: integración continua en GitHub Actions, con una base de datos nueva en cada cambio.

## En cifras

- 28 modelos de datos, 24 migraciones y 110 rutas de API.
- 32 pantallas, en dos idiomas y con modo oscuro.
- 309 comprobaciones automáticas en 15 grupos, que corren en cada cambio.
- Construida del 24 al 26 de septiembre de 2026. La auditoría y las correcciones, el 28 y el 29. La operación, el crecimiento y la formalización legal, del 11 al 13 de octubre.

## Lo que aprendí

- **Una auditoría a mitad de camino vale más que otra función nueva.** La tienda "funcionaba", pero fallaba en casos reales: un pago rechazado cancelaba el pedido aunque el cliente quisiera reintentar con otro medio.
- **La revisión cruzada entre modelos funciona.** Un segundo modelo vio un error de concurrencia que el primero no había considerado.
- **Las limitaciones del entorno también se diseñan.** Los webhooks no llegan a un equipo de desarrollo local. Consultar directamente la API de Wompi resolvió eso y, de paso, encontró un pago del ambiente de pruebas que nunca se había registrado.
- **La ley también es un requisito de producto.** Un recordatorio de carrito parece una función de marketing más, pero es una comunicación comercial: necesita autorización previa, una política que lo mencione y una baja que funcione sin iniciar sesión.

## Estado

Publicada como demo en [tienda-mulett.vercel.app](https://tienda-mulett.vercel.app) (Vercel, Render y Neon), con pagos en el ambiente de pruebas de Wompi: se puede comprar con la tarjeta de prueba `4242 4242 4242 4242` o el Nequi `3991111111`. La API usa un plan gratuito, así que la primera visita puede tardar cerca de un minuto. Todos los puntos del informe técnico están hechos. Para vender de verdad faltan decisiones del dueño, no código: razón social y NIT reales, revisión de los textos legales por un abogado, la habilitación de la DIAN con Alanube, una cuenta de comercio de Wompi y un dominio propio para los correos. El inicio con Google y Facebook está programado, pero aún no se ha probado con credenciales reales.
