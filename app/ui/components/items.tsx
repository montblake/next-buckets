import { useState } from 'react';
import { Checkbox } from '@/ui/components/ui/checkbox';
import { Input } from '@/ui/components/ui/input';
import { LucideTrash, Pencil, Save, Ban } from 'lucide-react';
import { Item } from '@/lib/definitions';
import ControlButton from '@/ui/components/control-button';

interface ItemsProps {
  items: Item[];
  onChangeItem: (item: Item) => void;
  onDeleteItem: (itemId: string) => void;
}
export default function Items({
  items,
  onChangeItem,
  onDeleteItem,
}: ItemsProps) {
  return (
    <div className="flex flex-col space-y-2">
      {items.map((item) => (
        <Item
          item={item}
          onChangeItem={onChangeItem}
          onDeleteItem={onDeleteItem}
          key={item.id}
        />
      ))}
    </div>
  );
}

interface ItemProps {
  item: Item;
  onChangeItem: (item: Item) => void;
  onDeleteItem: (itemId: string) => void;
}

function Item({ item, onChangeItem, onDeleteItem }: ItemProps) {
  const [edit, setEdit] = useState(false);
  const [itemInput, setItemInput] = useState(item.text);

  const onSaveItem = () => {
    setEdit(false);
    onChangeItem({ ...item, text: itemInput });
  };

  const onCancelEdit = () => {
    setEdit(false);
    setItemInput(item.text);
  };

  const onEdit = () => {
    setEdit(true);
  };

  const onDelete = () => {
    onDeleteItem(item.id);
  };

  const handleToggleDone = () => {
    onChangeItem({ ...item, done: !item.done });
  };

  return (
    <div className="flex flex-row items-center justify-between space-x-4 rounded-md border-[1px] p-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`task-${item.id}`}
          name="task"
          checked={item.done}
          onClick={handleToggleDone}
        />
        <div className="grid gap-1.5 leading-none">
          {edit ? (
            <Input
              type="text"
              placeholder="INPUT"
              name="item-text"
              value={itemInput}
              onChange={(e) => setItemInput(e.target.value)}
            />
          ) : (
            <label
              htmlFor={`task-${item.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              onClick={onEdit}
            >
              {item.text}
            </label>
          )}
        </div>
      </div>
      <div className="flex flex-row space-x-2">
        {edit ? (
          <>
            <ControlButton type="save" onClick={onSaveItem} />
            <ControlButton type="cancel" onClick={onCancelEdit} />
          </>
        ) : (
          <>
            <ControlButton type="edit" onClick={() => setEdit(true)} />
            <ControlButton type="delete" onClick={onDelete} />
          </>
        )}
      </div>
    </div>
  );
}
