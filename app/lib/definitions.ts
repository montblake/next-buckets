export interface List {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export interface Item {
  id: string;
  text: string;
  done: boolean;
}

export interface State {
  lists: List[];
  items: Item[];
}

export type Action =
  | { type: 'CREATE_LIST' /* other payload properties if needed */ }
  | { type: 'DELETE_LIST'; listId: string }
  | { type: 'UPDATE_LIST'; list: List }
  | { type: 'CREATE_ITEM'; text: string; listId: string }
  | { type: 'DELETE_ITEM'; itemId: string; listId: string }
  | { type: 'UPDATE_ITEM'; item: Item };
