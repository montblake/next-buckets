import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/components/ui/card';
import { Input } from '@/ui/components/ui/input';
import Items from '@/ui/components/items';
import AddItem from '@/ui/components/add-item';
import { LucideTrash, Pencil, Save, Ban } from 'lucide-react';
import { List, Item } from '@/lib/definitions';
import ControlButton from '@/ui/components/control-button';

interface BucketProps {
  list: List;
  items: Item[];
  handleDeleteList: (id: string) => void;
  handleUpdateList: (updatedList: List) => void;
  handleCreateItem: (text: string, listId: string) => void;
  handleDeleteItem: (itemId: string, listId: string) => void;
  handleUpdateItem: (item: Item) => void;
}

export default function BucketCard({
  list,
  items,
  handleDeleteList,
  handleUpdateList,
  handleCreateItem,
  handleDeleteItem,
  handleUpdateItem,
}: BucketProps) {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);
  const [newDescription, setNewDescription] = useState(list.description);

  function handleAddItem(text: string) {
    handleCreateItem(text, list.id);
  }

  function handleEditItem(item: Item) {
    handleUpdateItem(item);
  }

  function onDeleteItem(itemId: string) {
    handleDeleteItem(itemId, list.id);
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value);
  };

  const handleCancelEdit = () => {
    setNewTitle(list.title);
    setNewDescription(list.description);
    setEdit(false);
  };

  const handleSaveList = () => {
    handleUpdateList({ ...list, title: newTitle, description: newDescription });
    setEdit(false);
  };

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="flex flex-row items-baseline justify-between">
        <div>
          {edit ? (
            <>
              <Input
                type="text"
                name="title-input"
                value={newTitle}
                onChange={handleTitleChange}
              />
              <Input
                type="text"
                name="description-input"
                value={newDescription}
                onChange={handleDescriptionChange}
              />
            </>
          ) : (
            <>
              <CardTitle>{list.title}</CardTitle>
              <CardDescription>{list.description}</CardDescription>
            </>
          )}
        </div>

        <div className="flex flex-row items-center space-x-2">
          {edit ? (
            <>
              <ControlButton type="save" onClick={handleSaveList} />
              <ControlButton type="cancel" onClick={handleCancelEdit} />
            </>
          ) : (
            <>
              <ControlButton type="edit" onClick={() => setEdit(true)} />
              <ControlButton
                type="delete"
                onClick={() => handleDeleteList(list.id)}
              />
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Items
          items={items}
          onChangeItem={handleEditItem}
          onDeleteItem={onDeleteItem}
        />
      </CardContent>
      <CardFooter>
        <AddItem onAddItem={handleAddItem} />
      </CardFooter>
    </Card>
  );
}
