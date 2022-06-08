export interface AccountInterface {
  userId: number;
  id: string;
  transactions: Transaction[];

}

export enum MovementType {
  entry = 'Ingreso',
  spent = 'Gasto'
}

export interface NewTransaction {
  accountId: string;
  date: string,
  type: MovementType,
  description: string;
  total: number;
}

export interface Transaction extends NewTransaction {
  id: number;
}
