---
title: Comidas rápidas — gestión de pedidos en tiempo real
summary: Sistema para restaurantes donde el mesero toma los pedidos en el celular, la cocina los recibe al instante y los despacha plato por plato, con alertas sonoras de pedidos nuevos, listos o retrasados.
stack:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Zustand
  - Node.js
  - Express
  - Socket.IO
  - PostgreSQL (Neon)
  - Prisma
  - Zod
  - JWT + bcrypt
  - Web Audio API
  - Códigos QR
  - Claude Code
role: Product owner y desarrollador (con Claude Code)
year: 2026
featured: true
order: 2
links:
  demo: ""
  repo: ""
---

## El problema

En un restaurante de comidas rápidas, la comunicación entre meseros y cocina se hace de voz o en papel. Los pedidos se pierden, nadie sabe qué plato está retrasado y dos meseros pueden terminar atendiendo la misma mesa.

## La solución

Un sistema interno con tres roles. El **mesero** registra todo desde su celular, la **cocina** ve los pedidos en vivo en una pantalla y el **administrador** gestiona la carta, las mesas y el personal. Usa la misma arquitectura base que mi tienda virtual (Next.js + Express + Prisma + PostgreSQL), más **Socket.IO** para la comunicación en tiempo real.

- **Despacho plato por plato**: cada ítem tiene su propio estado (recibido, en preparación, listo) y su historial. El pedido solo aparece como "listo" cuando todos sus platos lo están.
- **Tablero de cocina en vivo**: tarjetas por plato en tres columnas, con el mesero que lo registró. Si un plato supera su tiempo de preparación, su borde parpadea en rojo.
- **Notificaciones con sonido**: suenan al entrar un pedido nuevo, cuando un plato está listo y cuando un plato se retrasa. Los tonos se generan con la Web Audio API, sin archivos externos. Una tarea en el servidor revisa los retrasos cada 30 segundos.
- **Reglas de negocio en el servidor**: dos meseros nunca manejan la misma mesa. Abrir una mesa con más comensales que su capacidad exige confirmar una silla adicional.
- **Cuenta y cierre de mesa**: la factura se genera para pago presencial y, al pagarse, libera la mesa.
- **Carta pública con código QR** y **reportes** de tiempo estimado frente a tiempo real de preparación.

## Resultado

La cocina y los meseros trabajan sobre la misma información en tiempo real. Lo verifiqué con varios clientes de Socket.IO conectados a la vez (mesero y cocina), incluida la detección automática de retrasos.
