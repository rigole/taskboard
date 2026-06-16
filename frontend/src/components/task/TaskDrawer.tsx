import { Dialog, DialogPanel } from "@headlessui/react";

interface TaskDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function TaskDrawer({
  open,
  onClose,
  children,
}: TaskDrawerProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40 transition-opacity" />

      <div className="fixed inset-0 flex justify-end overflow-hidden">
        <DialogPanel
          className="
            h-full
            w-full
            max-w-xl
            bg-white
            dark:bg-gray-900
            shadow-2xl
            overflow-y-auto
            p-6
          "
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}