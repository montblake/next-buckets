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
import { Suspense } from 'react';

interface BucketProps {
  bucket: List;

}

export default function BucketCard({
  bucket,
}: BucketProps) {

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="flex flex-row items-baseline justify-between">
        <div>
          <CardTitle>{bucket.title}</CardTitle>
          <CardDescription>{bucket.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense >

          <Items
            bucketId={bucket.id}
          />
        </Suspense>
      </CardContent>
      {/* // <CardFooter> */}
      {/* //   <AddItem onAddItem={handleAddItem} /> */}
      {/* // </CardFooter> */}
    </Card >
  );
}
