import { useState } from 'react';
import { Button } from '@/ui/components/ui/button';
import { Input } from '@/ui/components/ui/input';
import { Plus } from 'lucide-react';

interface AddItemProps {
  onAddItem: (text: string) => void;
}

export default function AddItem({ onAddItem }: AddItemProps) {
  const [newItem, setNewItem] = useState('');

  const onAdd = () => {
    onAddItem(newItem);
    setNewItem('');
  };

  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        type="text"
        name="task-input"
        placeholder="Add Task Here"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      {newItem !== '' && (
        <Button variant="outline" size="icon" onClick={onAdd}>
          <Plus className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
