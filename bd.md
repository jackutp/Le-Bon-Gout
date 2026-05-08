# Arquitectura Backend - Le Bon Goût (Microservicios)

Esta propuesta técnica detalla la estructura del Backend para el sistema ERP de **Le Bon Goût**, organizada bajo una arquitectura de microservicios para garantizar la escalabilidad de las operaciones y el desacoplamiento de dominios.

---

## 1. Auth Microservice (Gestión de Identidad)
Responsable de la seguridad, autenticación (JWT) y el control de acceso basado en roles (RBAC).

- **config**: `SecurityConfig.java`, `JwtUtils.java`, `CorsConfig.java`.
- **controller**: `AuthController.java` (Login/Registro), `UserController.java` (Gestión de perfiles).
- **dto**: `AuthRequest.java`, `AuthResponse.java`, `UserDTO.java`, `RegisterRequest.java`.
- **exception**: `InvalidCredentialsException.java`, `EmailAlreadyExistsException.java`.
- **mapper**: `UserMapper.java`.
- **model**: `User.java`, `Role.java` (ADMIN, MESERO, COCINERO).
- **repository**: `UserRepository.java`, `RoleRepository.java`.
- **service**: `AuthService.java`, `UserService.java`.

---

## 2. Inventory Microservice (Logística y Almacén)
Gestiona el stock de insumos primarios y el registro de mermas (pérdidas).

- **config**: `DatabaseConfig.java`, `RabbitMQConfig.java` (Para recibir eventos de reducción de stock).
- **controller**: `InventoryController.java`, `WasteController.java`.
- **dto**: `InventoryItemDTO.java`, `StockAdjustmentDTO.java`, `WasteRequest.java`.
- **exception**: `InsufficientStockException.java`, `ItemNotFoundException.java`.
- **mapper**: `InventoryMapper.java`, `WasteMapper.java`.
- **model**: `InventoryItem.java` (Insumos), `Waste.java` (Mermas).
- **repository**: `InventoryRepository.java`, `WasteRepository.java`.
- **service**: `InventoryService.java`, `WasteService.java`.

---

## 3. Menu Microservice (Catálogo y Carta)
Administra la oferta gastronómica disponible para los clientes y meseros.

- **config**: `CloudinaryConfig.java` (Gestión de imágenes), `CacheConfig.java`.
- **controller**: `MenuController.java`, `CategoryController.java`.
- **dto**: `MenuItemDTO.java`, `CategoryDTO.java`.
- **exception**: `MenuItemNotFoundException.java`.
- **mapper**: `MenuMapper.java`.
- **model**: `MenuItem.java`, `Category.java`.
- **repository**: `MenuRepository.java`, `CategoryRepository.java`.
- **service**: `MenuService.java`, `CategoryService.java`.

---

## 4. Order Microservice (Ventas y Operaciones)
Domino principal que gestiona el ciclo de vida de los pedidos (Pendiente -> Cocina -> Servido -> Pagado).

- **config**: `FeignClientConfig.java` (Comunicación con Menu/Inventory), `WebSocketConfig.java` (KDS en tiempo real).
- **controller**: `OrderController.java`, `KitchenController.java`.
- **dto**: `OrderRequest.java`, `OrderResponse.java`, `OrderItemDTO.java`, `StatusUpdateDTO.java`.
- **exception**: `OrderNotFoundException.java`, `InvalidStatusException.java`.
- **mapper**: `OrderMapper.java`.
- **model**: `Order.java`, `OrderItem.java`.
- **repository**: `OrderRepository.java`.
- **service**: `OrderService.java`, `OrderEventPublisher.java` (Notifica a Inventory para descontar stock).

---

## 5. Reservation Microservice (Reservas y Experiencias)
Gestiona el flujo de reservas externas, asignación de mesas y preferencias del cliente.

- **config**: `MailConfig.java` (Confirmaciones por correo).
- **controller**: `ReservationController.java`, `TableController.java`.
- **dto**: `ReservationRequest.java`, `ReservationResponse.java`, `TableAssignmentDTO.java`.
- **exception**: `TableUnavailableException.java`, `ReservationNotFoundException.java`.
- **mapper**: `ReservationMapper.java`.
- **model**: `Reservation.java`, `DiningTable.java`, `CustomerData.java`.
- **repository**: `ReservationRepository.java`, `TableRepository.java`.
- **service**: `ReservationService.java`, `TableService.java`, `NotificationService.java`.

---

## 6. Supplier Microservice (Compras y Facturación)
Administra la relación con proveedores externos y el reabastecimiento del inventario.

- **config**: `MultipartConfig.java` (Para carga de archivos XML/PDF).
- **controller**: `SupplierController.java`, `PurchaseOrderController.java`.
- **dto**: `SupplierDTO.java`, `PurchaseOrderRequest.java`, `InvoiceDTO.java`.
- **exception**: `SupplierNotFoundException.java`.
- **mapper**: `SupplierMapper.java`, `PurchaseOrderMapper.java`.
- **model**: `Supplier.java`, `PurchaseOrder.java`, `Invoice.java`.
- **repository**: `SupplierRepository.java`, `PurchaseOrderRepository.java`.
- **service**: `SupplierService.java`, `PurchaseOrderService.java`.

---

## Estrategia de Comunicación e Integración
- **API Gateway**: Punto de entrada único para el Front-end.
- **Event-Driven**: Comunicación asíncrona mediante un Message Broker (RabbitMQ/Kafka) para procesos como la actualización de stock tras una venta o la generación de reportes.
- **Base de Datos**: Base de datos por microservicio (Database-per-service) para asegurar el aislamiento de datos.
