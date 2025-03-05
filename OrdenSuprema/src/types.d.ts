declare global {
  // Definir el tipo de ubicación
  interface UserLocation {
    lat: number;
    lng: number;
  }

  // Definir el tipo de usuario base
  interface BaseUser {
    id: number;
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    type: "assassin" | "order";
  }

  // Definir el tipo de usuario "Assassin"
  interface Assassin extends BaseUser {
    type: "assassin";
    latitude: number; // Obligatorio para "assassin"
    longitude: number; // Obligatorio para "assassin"
    totalCoins: number; // Obligatorio para "assassin"
  }

  // Definir el tipo de usuario "Order"
  interface Order extends BaseUser {
    type: "order";
    position: string; // Obligatorio para "order"
  }

  // Un tipo general que agrupa ambos tipos
  type User = Assassin | Order;

  interface Debt {
    id: number;
    description: string;
    is_completed: boolean;
    proof_image?: string;
    creditorId: number; // Relación con User (assassin)
    debtorId: number; // Relación con User (assassin)
  }

  // Definir el estado de la misión
  type MissionStatus = "unassigned" | "in_progress" | "under_review" | "completed" | "failed";

  interface Mission {
    id: number;
    targetName: string;
    description?: string;
    status: MissionStatus;
    paymentValue: number;
    proofImage?: string;
    assignedToId?: number; // Puede ser nulo si no está asignada
    publishedById: number;
  }

  type TransactionType = "deposit" | "withdrawal" | "payment" | "reward";

  interface Transaction {
    id: number;
    type: TransactionType;
    amount: number;
    userId: number;
  }
}

// Export vacío para que TypeScript no lo trate como un módulo
export {};
