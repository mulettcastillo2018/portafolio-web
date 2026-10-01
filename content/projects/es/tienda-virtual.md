---
title: Tienda virtual — e-commerce colombiano
summary: Tienda en línea con pagos Wompi, descuentos con trazabilidad, PQRS según la Ley 1480 y panel de administración. Después de construirla pedí una auditoría técnica y dirigí la corrección de sus hallazgos, con pruebas automáticas en integración continua.
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
  - Resend
  - GitHub Actions
  - Claude Code
role: Product owner y dirección técnica, construido con Claude Code
year: 2026
featured: true
order: 1
links:
  demo: ""
  repo: https://github.com/mulettcastillo2018/tienda-virtual
---

## El problema

Una tienda en línea para Colombia necesita más que un catálogo. Tiene que cobrar con los medios que usa la gente (tarjeta, PSE, Nequi), controlar los descuentos sin perder el rastro de los precios y responder peticiones, quejas y reclamos dentro del plazo que exige el Estatuto del Consumidor (Ley 1480 de 2011).

## La solución

Un frontend en Next.js y una API REST en Express con TypeScript sobre PostgreSQL, con Prisma como ORM.

- **Catálogo y compra**: filtros por precio y marca, galería de 4 imágenes por producto, carrito y checkout por pasos con el widget de **Wompi**.
- **Pagos que no se pierden**: si un pago se rechaza, el cliente puede reintentar con otro medio. Si no paga a tiempo, el pedido vence solo, los productos vuelven a su carrito y el inventario se libera.
- **Descuentos con trazabilidad**: cada venta queda enlazada a la campaña de descuento que estaba vigente, para poder explicar cualquier precio pasado.
- **PQRS con área jurídica**: radicación, línea de tiempo, adjuntos privados y plazo de 15 días hábiles. Las responde un rol jurídico, no el administrador.
- **Cuentas**: correo y contraseña, o Google y Facebook con OAuth 2.0, y recuperación de contraseña.
- **Extras**: ofertas relámpago, reseñas solo de compradores reales, español e inglés y modo oscuro en toda la aplicación, incluido el panel de administración.

## Mi rol frente a la IA

Construí la tienda dirigiendo a Claude Code, un agente de programación. El agente propuso la arquitectura y escribió el código y las pruebas. Mi trabajo fue otro:

- **Definí el producto y las reglas del negocio colombiano.** El área jurídica para las PQRS, la trazabilidad de descuentos, exactamente 4 imágenes por producto y las reseñas solo de quien compró fueron decisiones mías.
- **Pedí una auditoría antes de seguir agregando funciones.** El agente revisó el código completo y entregó un [informe técnico y de negocio](https://github.com/mulettcastillo2018/tienda-virtual/blob/main/docs/analisis-2026-09-28.pdf) con hallazgos y una hoja de ruta por fases. Yo decidí el orden: primero versionar, luego pagos, cuentas y archivos.
- **Contrasté con otra IA.** Una revisión externa encontró una condición de carrera: dos compras simultáneas podían vender la misma última unidad. Se corrigió con un descuento atómico dentro de la transacción (`updateMany ... WHERE stock >= cantidad`) y se comprobó con compras simultáneas reales.
- **Exigí evidencia.** Cada fase se cerró con pruebas que crean sus propios datos y los borran al terminar.

## Qué se corrigió después de la auditoría

- **Pagos**: webhook de Wompi idempotente y con validación del monto. Un rechazo ya no cancela el pedido, y la tienda consulta directamente la API de Wompi para no depender solo del webhook.
- **Cuentas**: sesiones que se revocan al instante al desactivar un usuario o cambiar su rol, límites de intentos, OAuth con `state` y sin vinculación automática de cuentas, y cabeceras de seguridad.
- **Archivos**: el tipo de cada archivo se valida por su contenido real, no por su extensión. Los adjuntos de las PQRS son privados y se entregan con enlaces firmados.
- **Calidad**: integración continua en GitHub Actions, con una base de datos nueva en cada cambio.

## En cifras

- 22 modelos de datos, 19 migraciones y 72 rutas de API.
- 24 pantallas, en dos idiomas y con modo oscuro.
- 94 comprobaciones automáticas que corren en cada cambio.
- Construida del 24 al 26 de septiembre de 2026. La auditoría y las fases de corrección, el 28 y el 29.

## Lo que aprendí

- **Una auditoría a mitad de camino vale más que otra función nueva.** La tienda "funcionaba", pero fallaba en casos reales: un pago rechazado cancelaba el pedido aunque el cliente quisiera reintentar con otro medio.
- **La revisión cruzada entre modelos funciona.** Un segundo modelo vio un error de concurrencia que el primero no había considerado.
- **Las limitaciones del entorno también se diseñan.** Los webhooks no llegan a un equipo de desarrollo local. Consultar directamente la API de Wompi resolvió eso y, de paso, encontró un pago del ambiente de pruebas que nunca se había registrado.

## Estado

Lista para publicar: el repositorio incluye la guía de despliegue. Los pagos están probados en el ambiente de pruebas de Wompi; falta una cuenta de comercio real. El inicio con Google y Facebook está programado, pero aún no se ha probado con credenciales reales. Siguen los estados de pedido completos, el SEO y la facturación electrónica.
