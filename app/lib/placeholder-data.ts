import { List, Item } from '@/lib/definitions';

export const lists: List[] = [
  {
    id: '0',
    title: 'Prague',
    description: 'Things to do while visiting...',
    items: ['0', '1'],
  },
  {
    id: '1',
    title: 'Vienna',
    description: 'Things to do while visiting...',
    items: ['2', '3'],
  },
];

export const items: Item[] = [
  {
    id: '0',
    text: 'Museum!',
    done: false,
  },
  {
    id: '1',
    text: 'Food!',
    done: false,
  },
  {
    id: '2',
    text: 'Music!',
    done: false,
  },
  {
    id: '3',
    text: 'Pasties!',
    done: false,
  },
];
