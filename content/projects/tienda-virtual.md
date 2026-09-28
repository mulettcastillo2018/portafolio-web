---
title: Tienda virtual — e-commerce colombiano
summary: Tienda en línea completa con catálogo, carrito, checkout con Wompi, descuentos con trazabilidad, sistema PQRS según la Ley 1480 y panel de administración, en modo oscuro y bilingüe.
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
  - Wompi
  - Resend
  - Claude Code
role: Product owner y desarrollador (con Claude Code)
year: 2026
featured: true
order: 1
links:
  demo: ""
  repo: ""
---

## El problema

Construir una tienda en línea real para el mercado colombiano. No bastaba con un catálogo: debía cobrar en línea, manejar descuentos sin perder el control de precios y cumplir con el Estatuto del Consumidor (Ley 1480 de 2011) en la atención de peticiones, quejas y reclamos.

## La solución

Una aplicación separada en **frontend** (Next.js + React + Tailwind + Zustand) y **backend** (API REST con Express y TypeScript sobre PostgreSQL en Neon, usando Prisma como ORM).

- **Catálogo y carrito**: categorías con íconos, productos con galería de 4 imágenes y vista previa al pasar el mouse, filtros por precio y marca, y carrito persistente.
- **Checkout por pasos**: dirección, resumen, pago con el widget de **Wompi** (firma de integridad y webhooks de aprobación y rechazo, probado en sandbox) y página de confirmación.
- **Roles y seguridad**: autenticación con JWT y contraseñas cifradas con bcrypt. Tres roles: administrador, jurídico y cliente. El login social (Google/Facebook) usa OAuth2 manual.
- **Descuentos con trazabilidad**: porcentaje y duración en días, con vencimiento automático. Cada pedido guarda la campaña de descuento exacta que estaba activa al comprar.
- **PQRS**: radicación, flujo de estados con historial (quién, cuándo, comentario y adjunto), plazo de 15 días hábiles y un rol jurídico dedicado a responder.
- **Ofertas relámpago y reseñas**: solo los clientes con una compra completada pueden calificar la tienda.
- **Modo oscuro y bilingüe (ES/EN)** en toda la aplicación, incluido el panel de administración.

## Un reto técnico

Una revisión encontró una **condición de carrera en el stock**: dos compras simultáneas podían vender la misma última unidad. La corregí con un descuento atómico dentro de la transacción de checkout (`updateMany ... WHERE stock >= cantidad`). Lo verifiqué con peticiones concurrentes reales, no solo leyendo el código.

## Resultado

Una tienda con todo el flujo comercial resuelto de punta a punta, lista para conectar una cuenta real de Wompi y salir a producción.
