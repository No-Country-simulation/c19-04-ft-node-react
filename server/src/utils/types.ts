// ENTIDADES DE MONGO => DATOS ESTÁTICOS PERSISTENTES
type MongoAdmin = {
  brandName: string;
  brandLogo: string;
  brandColor?: string; // HEX
  brandColorDark?: string; // HEX
  username: string;
  password: string;
  subscription: "free" | "basic" | "premium";
};
type MongoBar = {
  username: string;
  password: string;
};
type MongoMenu = {
  dishNumber: number;
  title: string;
  description: string;
  category: string[];
  tags: string[];
  imgUrl: string;
  ingredients: string[];
  estimatedTime: number;
  people: number; // Para cuántas personas
  extraInfo: string;
  available: boolean;
  price: number;
  rating: number;
};
type MongoProducts = {
  // Para el stock
  title: string;
  brand?: string;
  category: string;
  quantity: number;
};
type MongoKitchen = {
  username: string;
  password: string;
};
type MongoOrder = {
  orderNumber: number;
  tableNumber: number;
  orderedDishes: MongoMenu[]; //.title o .dishNumber
};
type MongoQR = {
  qrCode: Buffer; // Almacena el link a la mesa ej: https://nuestro-sitio.com/:tableNumber/menu
};
type MongoTable = {
  tableNumber: number;
  qrCode: MongoQR;
  link: string;
};
type MongoWaiter = {
  name: string;
  username: string;
  password: string;
};
type MongoTips = {
  amount: number;
};
// ENTIDADES DE FIREBASE => DATOS DINÁMICOS EN TIEMPO REAL, SE REINICIAN AL FINALIZAR LA JORNADA
/*
    /tables [
        tableNumber: {
            isActive: boolean,
            waiter: `${waiter.name}` || null
            diners: [
                0: {
                    admin: true,
                    name: string,
                    ready: boolean,
                    order: MongoMenu.ObjectId[]
                },
                1: {
                    admin: false,
                    ...
                }
            ]
        }
        tableNumber: {...},
        unassignedTables: {
            0: "Awaiting tables...",
            tableNumber
          }
    ]
    /orders {
          pending: {
              orderID: {
                  orderNumber: number,
                  tableNumber: number,
                  order: MongoMenu.ObjectId[] // dish.title & dish.ingredients
              }
          ],
          inProgress: [
              orderID: {
                  orderNumber: number,
                  tableNumber: number,
                  order: MongoMenu.ObjectId[] // dish.title & dish.ingredients
              }
          ],
          ready: [
              orderID: {
                  orderNumber: number,
                  tableNumber: number,
                  order: MongoMenu.ObjectId[] // dish.title & dish.ingredients
              }
            }
    }
    /waiters [
        username: [
            assignedTables: tableNumber[]
            requestedBy: tableNumber | bar | kitchen | admin(checkout)
        ]
    ]
*/
type FirebaseTable = {
  [tableNumber: number]: {
    isActive: boolean;
    diners: [
      {
        admin: boolean;
        name: string;
        ready: boolean;
        order: MongoMenu[]; //.ObjectId[] // dish.title & dish.ingredients
      }
    ];
  };
};
type FirebaseTablesRoute = {
  unassignedTables: number[];
  assignedTables: number[];
};
type FirebaseOrder = {
  [orderId: string]: {
    orderNumber: number;
    tableNumber: number;
    order: MongoMenu[]; // dish.title & dish.ingredients
  };
};
type FirebaseOrdersRoute = {
  bar: {
    pending: FirebaseOrder[];
    inProgress: FirebaseOrder[];
    ready: FirebaseOrder[];
  };
  kitchen: {
    pending: FirebaseOrder[];
    inProgress: FirebaseOrder[];
    ready: FirebaseOrder[];
  };
};
type FirebaseWaiter = {
  [username: string]: {
    assignedTables: number[]; //tableNumber
    requestedBy: number | string; //tableNumber o sector
  };
};

// Kitchen y Bar

// const entityPendingOrders = [].filter(item => item.to == entity)

// El front llama al mozo cuando el producto está listo
/*
  /orders {
    pending: [],
    inProgress: [],
    ready: []
  }
 */
