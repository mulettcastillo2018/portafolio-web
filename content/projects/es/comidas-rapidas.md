---
title: Comidas rápidas — pedidos en tiempo real para restaurantes
summary: Sistema completo para restaurantes. El mesero toma los pedidos en el celular, la cocina despacha plato por plato en tiempo real y el cliente pide desde el QR de su mesa. La administración maneja caja, inventario, costos, facturación electrónica DIAN y varias sedes.
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
  - Alanube (DIAN)
  - Web Audio API
  - Códigos QR
  - Claude Code
role: Product owner y dirección técnica, construido con Claude Code
year: 2026
featured: true
order: 2
links:
  demo: ""
  repo: https://github.com/mulettcastillo2018/comidas-rapidas
---

## El problema

En un restaurante de comidas rápidas, meseros y cocina se comunican de voz o en papel. Los pedidos se pierden, nadie sabe qué plato va retrasado y dos meseros pueden terminar atendiendo la misma mesa. Además, detrás del servicio hay una operación completa (caja, inventario, costos, propinas y facturación) que suele vivir en cuadernos y hojas de cálculo.

## La solución

Un sistema con roles para mesero, cocina, pantalla pública y administración, conectados en tiempo real con Socket.IO.

- **Servicio en tiempo real**: el mesero abre la mesa con sus comensales y toma el pedido de cada persona. La cocina recibe y despacha **plato por plato**, con alertas sonoras de pedidos nuevos, listos y retrasados.
- **El cliente participa**: con el QR de su mesa ve la carta, deja armado su pedido para que el mesero lo confirme o llama al mesero. Con el QR de mostrador pide para recoger y sigue su pedido con hora estimada.
- **Caja**: precuenta por persona, propina voluntaria, pago dividido (efectivo, tarjeta, Nequi, Daviplata, transferencia), cierres con cuadre por mesero y clave de supervisor para pérdidas y cancelaciones.
- **Negocio**: costos y ganancia por producto, inventario por ingrediente con recetas, combos y promociones, domicilios propios y de apps, gastos, estado de resultados, punto de equilibrio, turnos, reparto de propinas y clientes frecuentes con puntos.
- **Facturación electrónica DIAN** y documento POS mediante Alanube.
- **Varias sedes**: cada una con sus mesas, personal, cocina, inventario y caja. Un administrador general las ve todas.

## Mi rol frente a la IA

Dirigí a Claude Code fase por fase: primero un producto mínimo completo, luego una hoja de ruta propia de integridad y seguridad, y después tres fases de negocio. El agente escribió el código, las migraciones y las pruebas.

Las decisiones que cambiaron el diseño fueron mías, porque salen de cómo trabaja un restaurante de verdad:

- La cocina despacha **plato por plato**, no el pedido completo. Eso cambió todo el modelo de estados.
- **Dos meseros nunca atienden la misma mesa**, y el administrador puede reasignarla si un mesero se enferma.
- El primer comensal **es** el responsable de la mesa. Contarlo aparte dejaba mal el cupo de la mesa.
- Un cliente que se va sin pagar queda como **pérdida autorizada con clave**, no como una venta falsa.
- **Varias sedes**, con un administrador general y administradores por sede.

También exigí evidencia. Cada fase se cerró con pruebas de extremo a extremo contra la API real, incluidas operaciones simultáneas (dos meseros abriendo la misma mesa, dos cobros a la vez), permisos por rol y por sede, y eventos en tiempo real.

## En cifras

- 40 modelos de datos, 27 migraciones y 126 rutas de API.
- 26 pantallas.
- Más de 400 comprobaciones automáticas de extremo a extremo en 18 suites, más pruebas unitarias. Las pruebas crean sus propios datos y los borran al terminar, aunque fallen.
- Construido el 27 y el 28 de septiembre de 2026, en 20 commits.

## Lo que aprendí

- **El conocimiento del negocio no se delega.** El agente propone diseños razonables, pero reglas como "plato por plato" o "un mesero por mesa" solo salen de conocer la operación.
- **Hay que probar con concurrencia real.** Los errores más serios aparecían cuando dos personas hacían lo mismo al tiempo, no en el flujo normal.
- **Conviene priorizar por valor de negocio.** Después del producto mínimo, el reporte de ventas y el cierre de caja valían más que cualquier mejora visual.

## Estado

Funciona de punta a punta en local. La facturación electrónica se probó contra un simulador de la API de Alanube; falta conectarla a su ambiente de pruebas con credenciales reales. Pendientes: una demo pública y la integración continua.
