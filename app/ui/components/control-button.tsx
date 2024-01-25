import { LucideTrash, Pencil, Save, Ban } from 'lucide-react';

interface BCBProps {
  type: string;
  onClick: () => void;
  size?: number;
}

function renderButton(type: string, size: number) {
  switch (type) {
    case 'edit': {
      return <Pencil className={`h-${size} w-${size}`} />;
    }

    case 'delete': {
      return <LucideTrash className={`h-${size} w-${size}`} />;
    }

    case 'save': {
      return <Save className={`h-${size} w-${size}`} />;
    }

    case 'cancel': {
      return <Ban className={`h-${size} w-${size}`} />;
    }

    default: {
      throw new Error('Unknown button type: ' + type);
    }
  }
}

export default function ControlButton({ type, onClick, size = 4 }: BCBProps) {
  let bcb = <button onClick={onClick}>{renderButton(type, size)}</button>;
  return bcb;
}
