'use client';

import { useReducer, useState } from 'react';
import { List, Item, State, Action } from '@/lib/definitions';
import {
  lists as initialLists,
  items as initialItems,
} from '@/lib/placeholder-data';
import BucketsHeader from '@/ui/components/buckets-header';
import BucketsFooter from '@/ui/components/buckets-footer';
import { ScrollArea } from '@/ui/components/ui/scroll-area';
import BucketCard from '@/ui/components/bucket-card';
import { ModeToggle } from '@/ui/components/mode-toggle';

import reducer from '@/lib/reducer';

const initialState: State = {
  lists: initialLists,
  items: initialItems,
};

export default function BucketsApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { lists, items } = state;
  const [filterTerm, setFilterTerm] = useState('');

  const filteredLists = lists.filter(filterLists);

  const handleCreateList = () => {
    dispatch({
      type: 'CREATE_LIST',
    });
  };

  const handleDeleteList = (listId: string) => {
    dispatch({
      type: 'DELETE_LIST',
      listId: listId,
    });
  };

  const handleUpdateList = (updatedList: List) => {
    dispatch({
      type: 'UPDATE_LIST',
      list: updatedList,
    });
  };

  const handleCreateItem = (text: string, listId: string) => {
    dispatch({
      type: 'CREATE_ITEM',
      text: text,
      listId: listId,
    });
  };

  const handleDeleteItem = (itemId: string, listId: string) => {
    dispatch({
      type: 'DELETE_ITEM',
      itemId: itemId,
      listId: listId,
    });
  };

  const handleUpdateItem = (item: Item) => {
    dispatch({
      type: 'UPDATE_ITEM',
      item: item,
    });
  };

  function filterLists(list: List) {
    // normalize both to Uppercase before comparing
    const termInTitle = list.title
      .toUpperCase()
      .includes(filterTerm.toUpperCase());
    const termInDescription = list.description
      .toUpperCase()
      .includes(filterTerm.toUpperCase());
    // filterTerm in
    const listItems = list.items.map((itemId: string) =>
      items.find((item: Item) => item.id === itemId),
    );
    const termInItems = listItems.some((item: Item | undefined) =>
      item?.text.toUpperCase().includes(filterTerm.toUpperCase()),
    );
    return termInTitle || termInDescription || termInItems;
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start space-y-4 text-foreground">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <BucketsHeader
        onCreateList={handleCreateList}
        filterTerm={filterTerm}
        setFilterTerm={setFilterTerm}
      />

      <ScrollArea>
        <div className="flex flex-col items-center justify-start space-y-6 pb-24">
          {filteredLists.map((list: List) => (
            <BucketCard
              key={list.id}
              list={list}
              items={
                list.items
                  .map((itemId) =>
                    items.find((item: Item) => item.id === itemId),
                  )
                  // the following solves a typescript warning but confuses the code...
                  // TODO: find cleaner way to achieve this
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
