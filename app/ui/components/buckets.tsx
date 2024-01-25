import { useState } from 'react';
import { List, Item } from '@/lib/definitions';
import {
  lists as initialLists,
  items as initialItems,
} from '@/data/buckets-initial-data';
import BucketsHeader from '@/components/buckets-header';
import BucketsFooter from '@/components/buckets-footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import BucketCard from '@/components/bucket-card';
import { ModeToggle } from '@/components/mode-toggle';

export default function BucketsApp() {
  const [lists, setLists] = useState<List[]>(initialLists);
  const [items, setItems] = useState<Item[]>(initialItems);

  const handleCreateList = () => {
    setLists([
      ...lists,
      {
        id: self.crypto.randomUUID(),
        title: 'New List',
        description: 'Additional information here...',
        items: [],
      },
    ]);
  };

  const handleDeleteList = (id: string) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  const handleUpdateList = (updatedList: List) => {
    setLists(
      lists.map((list) => {
        if (list.id === updatedList.id) {
          return updatedList;
        } else {
          return list;
        }
      }),
    );
  };

  const handleCreateItem = (text: string, listId: string) => {
    const generatedId = self.crypto.randomUUID();

    setItems([
      ...items,
      {
        id: generatedId,
        text: text,
        done: false,
      },
    ]);
    setLists(
      lists.map((list) => {
        if (list.id === listId) {
          const newList = {
            ...list,
            items: [...list.items, generatedId],
          };
          return newList;
        } else {
          return list;
        }
      }),
    );
  };

  const handleDeleteItem = (itemId: string, listId: string) => {
    setLists(
      lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            tasks: list.items.filter((item) => item !== itemId),
          };
        } else {
          return list;
        }
      }),
    );
    setItems(items.filter((item) => item.id !== itemId));
  };

  const handleUpdateItem = (item: Item) => {
    setItems(
      items.map((i) => {
        if (i.id === item.id) {
          return item;
        } else {
          return i;
        }
      }),
    );
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start space-y-4 text-foreground">

      <BucketsHeader onCreateList={handleCreateList} />

      <ScrollArea>
        <div className="flex flex-col items-center justify-start space-y-6 pb-24">
          {lists.map((list) => (
            <BucketCard
              key={list.id}
              list={list}
              items={
                list.items
                  .map((itemId) => items.find((item) => item.id === itemId))
                  .filter((item) => item !== undefined) as Item[]
              }
              handleDeleteList={handleDeleteList}
              handleUpdateList={handleUpdateList}
              handleCreateItem={handleCreateItem}
              handleDeleteItem={handleDeleteItem}
              handleUpdateItem={handleUpdateItem}
            />
          ))}
        </div>
      </ScrollArea>
      <BucketsFooter />
    </div>
  );
}
