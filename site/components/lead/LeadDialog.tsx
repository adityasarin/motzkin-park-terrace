"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { LeadForm } from "./LeadForm";
import { intents, type Intent } from "./intents";

export default function LeadDialog({
  open,
  onOpenChange,
  intent,
  source,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  intent: Intent;
  source?: string;
}) {
  const meta = intents[intent];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lead-dialog">
        <div className="lead-dialog__body">
          <DialogTitle asChild>
            <h2>{meta.title}</h2>
          </DialogTitle>
          <DialogDescription className="lead-dialog__desc">{meta.desc}</DialogDescription>
          <LeadForm intent={intent} source={source} onDone={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
