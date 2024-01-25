import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/ui/components/ui/collapsible';

import { Button } from '@/ui/components/ui/button';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/components/ui/accordion';

export default function BucketsFooter() {
  return (
    <Accordion
      type="single"
      collapsible
      className="text-special-foreground fixed bottom-0 flex w-full flex-col items-start justify-start"
    >
      <AccordionItem value="item-1" className={`bg-stone200 w-full px-12 py-2`}>
        <AccordionTrigger>
          <p className={`text-stone500 whitespace-nowrap text-sm font-bold`}>
            buckets | blake montgomery
          </p>
        </AccordionTrigger>

        <AccordionContent className={`flex flex-row gap-6`}>
          <p className="w-1/3 text-sm">
            The key to a peaceful, production mind is to get unresolved thoughts
            out of your head. Put them somewhere you trust, some external bucket
            where you know you can find them later.And then go about your day.
          </p>
          <p className="w-1/3 text-sm">
            Buckets is a simple app for creating, reading, updating, and
            deleting both lists and their corresponding list items. Created with
            React, Next.js, Typescript, Tailwind, components from shadcn-ui.
          </p>
          <p className="w-1/3 text-sm">
            Coming updates include adding filtering, database, users and auth.
            Coming updates include adding filtering, database, users and auth.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
