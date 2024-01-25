import { List, Item, State, Action } from '@/lib/definitions';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CREATE_LIST':
      const newList = {
        id: self.crypto.randomUUID(),
        title: 'New List',
        description: 'Additional info here...',
        items: [],
      };
      return {
        ...state,
        lists: [...state.lists, newList],
      };
    case 'DELETE_LIST':
      return {
        ...state,
        lists: state.lists.filter((list: List) => list.id !== action.listId),
      };
    case 'UPDATE_LIST':
      return {
        ...state,
        lists: state.lists.map((list: List) =>
          list.id === action.list?.id ? action.list : list,
        ),
      };
    case 'CREATE_ITEM':
      const newItem = {
        id: self.crypto.randomUUID(),
        text: action.text,
        done: false,
      };
      return {
        ...state,
        items: [...state.items, newItem],
        lists: state.lists.map((list: List) =>
          list.id === action.listId
            ? { ...list, items: [...list.items, newItem.id] }
            : list,
        ),
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter((item: Item) => item.id !== action.itemId),
        lists: state.lists.map((list: List) =>
          list.id === action.listId
            ? {
                ...list,
                items: list.items.filter((id) => id !== action.itemId),
              }
            : list,
        ),
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item: Item) =>
          item.id === action.item?.id ? action.item : item,
        ),
      };
    default:
      return state;
  }
}

export default reducer;
