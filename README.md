<div align="middle"><b>USER STORIES DEL PROYECTO</b></div>

---
 
  - Como usuario quiero poder escanear un qr que identifique la mesa para consultar carta o llamar al mozo.
  - Como usuario quiero poder ver la carta para consultar los productos disponibles
  - Como usuario quiero poder llamar al mozo para establecer mi pedido
  - Como mozo quiero poder recibir notificaciones para saber que mesa requiere de mi atención
  - Como mozo quiero establecer el pedido de la mesa para establecer el pedido a la cocina.
  - Como cocina quiero recibir notificaciones acerca de los pedidos que vayan produciendose para poder gestionar mejor los tiempos
  - Como cocina quiero tener un boton para solicitar un mozo para avisarle que ya puede llevar el pedido a la mesa correspondiente.
  - Como administrador quiero poder registrar mozos para establecer una nueva persona en la sucursal que elija.
  - Como administrador quiero poder registrar cocinas para gestionar mis sucursales.
  - Como administrador quiero tener un apartado de analiticas para saber diferentes estadisticas del negocio.

---

 <div align="middle"><b>DESCRIPCION DEL PROYECTO</b></div>

---
 
Este proyecto se enfoca en facilitar la interaccion entre clientes y la cocina, le saca carga de trabajo a los mozos, los chefs disponen de la facilidad de deshabilitar menus y los administradores podrán crear cocina y mozos a placer.

Cual es la necesidad principal que queremos resolver: Es comun que a la hora de atender a un restaurant los mozos nos ignoren de manera indirecta ya que hay varias mesas que deben atender, y al mismo tiempo tienen que prestarle atencion a los clientes, por lo que los clientes (comensales) tienden a llamarle mas la atencion que de cierta manera puede incomodar.
Nuestra primera versión consiste en:
QR en la mesa identificandola por su numero
Los usuarios escanearan el QR con su celular, el cual llamara a un mozo encargado de esa mesa
El mozo recibirá un mensaje en su pantalla de celular el cual para esto debera loguearse como mozo.

<div style="display: flex;">
  <img src="https://i.imgur.com/Whgs2yK.png" alt="Imagen 1">
  <img src="https://i.imgur.com/0W15Sax.png" alt="Imagen 2">
</div>



para el resto del proceso, la toma del pedido, la cuenta y demás se manejaran como manera tradicional hasta la finalizacion de la 2da version.
Para la segunda version se planteó incorporar:
QR en la mesa que identifique su numero, y le de al usuario la opcion de llamar al mozo o consultar la carta.
El mozo atenderá a la mesa solo cuando el usuario lo requiera, y posteriormente realizar su pedido segun lo consultado en la carta
El mozo tambien gozara de una interfaz para establecer el pedido directamente a la cocina
La cocina recibira una notificacion sobre el pedido de la mesa identificandola por numero, el pedido y un boton para que cuando la cocina lo aprete le avise al mozo que ya esta listo
El mozo al recibir la notificacion, se dirijira a la cocina a buscar el pedido, al usuario se le informará con una notificacion que el pedido ya esta en camino.
El administrador podrá crear mozos y cocinas a gusto a través de un panel propio para ellos.

<div style="display: flex;">
  <img src="https://i.imgur.com/xTbmBGN.png" alt="QR Scan Cliente">
  <img src="https://i.imgur.com/yDFZxRW.png" alt="Web Push Notificacion Mozo">
  <img src="https://i.imgur.com/Iuo4FiI.png" alt="Web Push Notificacion Cocina">
</div>

una vez entregado esta segunda versión se procederá a evaluar que features podemos agregar de la lista de backlog necesarias, se plantearon las siguientes:
-
 - Analytics para el administrador (Cuanto recaudo cada mozo, cuanto gasto cada mesa, edad promedio de las mesas, etc)
 - Pedido directamente desde el cliente a la cocina, dejando al mozo solamente para entregar el pedido.
 - Cocina con disponibilidad para habilitar o deshabilitar menu segun lo consideren necesario
 - Sistema de inventario de ingredientes
 - Pasarela de pagos digitales
 - Recibo de pago a whatsapp o a un correo (a decision del comensal)
 - Cuantificacion de los comensales con sus respectivas edades por mesa

Bajo ninguna de las circunstancia este sistema requiere prescindir de ninguna de las partes involucradas, ya que recomendamos mantener las estructuras mas tradicionales para las personas que no son tech-friendly (amigables con la tecnologia) o que prefieren una experiencia mas tradicional

IMAGENES A REALIZAR A FUTURO.

---

<div align="middle">
 ENDPOINTS
</div>

---

## Auth

### Register
Registrar un usuario. (Solo es posible acceder al register si eres admin)

- **Method:** POST
- **Endpoint:** `http://localhost:${PORT}/api/admin/register`
- **Body:**
  ```json
  {
    "username": "Example1",
    "password": "Asd123"
    "role": "admin" (es opcional, luego se eliminara)
  }
  ```

### Login
Iniciar sesión.

- **Method:** POST
- **Endpoint:** `http://localhost:${PORT}/api/auth/login`
- **Body:**
  ```json
  {
   "username": "Example1",
   "password": "Asd123"
  }
  ``` 

### Logout
Cerrar sesión.

- **Method:** POST
- **Endpoint:** `http://localhost:${PORT}/api/auth/logout`


## Table

### TableQR
Crear un QR para la mesa.

- **Method:** POST
- **Endpoint:** `http://localhost:${PORT}/api/table/tableQR`
- **Body:**
  ```json
  {
    "tableNumber": 1,
    "link": "https://tu-web.com/api/table/..." (link para ver la mesa, carta, llamado, etc)
    "products:": []
  }
  ```

### QR
Traer mesa mediante el QR (Numero de mesa).

- **Method:** GET
- **Endpoint:** `http://localhost:${PORT}/api/table/tableQR/:numberTable`


## Admin

### Menu
Crear menu.

- **Method:** POST
- **Endpoint:** `http://localhost:${PORT}/api/admin/menu`
- **Body:**
  ```json
   "title": "Pizza",
   "description": "Aca no le ponemos Ananá 🚩",
   "imgUrl": "https://tu-web.com/img.png",
   "estimatedTimeToDeliver": 20,
   "price": 9,
   "available": true
  ```

### Menu
Traer los menus.

- **Method:** GET
- **Endpoint:** `http://localhost:${PORT}/api/admin/menu`

### Menu
Editar menu. (Se puede pasar solo el campo que desea editar, no hacen falta todos)

- **Method:** PATCH
- **Endpoint:** `http://localhost:${PORT}/api/admin/menu/:id`
- **Body:**
  ```json
   "price": 14,
  ```

### Card
Traer la carta para los comensales.

- **Method:** GET
- **Endpoint:** `http://localhost:${PORT}/api/card-menu/`

## Orders

### New order
Crear una nueva orden.

- **Method:** POST
- **Endpoint:** `http://localhost:{PORT}/api/orders/create`
- **Body:**
  ```json
   "table": "table._id"
  ```

### All Orders
Traer todas las ordenes.

- **Method:** GET
- **Endpoint:** `http://localhost:${PORT}/api/orders/all`

### Pending
Traer ordenes pendientes.

- **Method:** GET
- **Endpoint:** `http://localhost:{PORT}/api/orders/pending`

### Update Status
Actualizar el estado de la orden.

- **Method:** PATCH
- **Endpoint:** `http://localhost:{PORT}/api/orders/update/:orderId`
- **Body:**
  ```json
   "status": 'ready'
  ```

### Ready
Traer ordenes listas

- **Method:** GET
- **Endpoint:** `http://localhost:{PORT}/api/orders/ready`

### Delete Orders
Eliminar ordenes.

- **Method:** DELETE
- **Endpoint:** `http://localhost:{PORT}/api/orders/delete/:orderId`
