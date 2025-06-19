import { createContext, useContext, useState } from "react";
import Modal from "react-modal";
import { Button } from "@/components/ui/button";

const ConfirmDialogContext = createContext(null);

export function ConfirmDialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogProps, setDialogProps] = useState({
    title: "",
    description: "",
    confirmText: "Xoá",
    cancelText: "Huỷ",
    onConfirm: () => {},
  });

  const showConfirm = ({
    title,
    description,
    onConfirm,
    confirmText = "Xoá",
    cancelText = "Huỷ",
  }) => {
    setDialogProps({ title, description, onConfirm, confirmText, cancelText });
    setOpen(true);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await dialogProps.onConfirm?.();
      setOpen(false);
    } catch (error) {
      console.error("Lỗi trong onConfirm:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) setOpen(false);
  };

  return (
    <ConfirmDialogContext.Provider value={{ showConfirm }}>
      {children}

      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        contentLabel="Xác nhận xoá"
        overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"
        className="w-full max-w-md bg-white rounded-lg p-6 shadow-xl mx-auto outline-none z-[10000]"
      >
        <h2 className="text-[16px] font-bold mb-2">{dialogProps.title}</h2>
        <p className="text-sm text-gray-600 mb-6">{dialogProps.description}</p>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            {dialogProps.cancelText}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : dialogProps.confirmText}
          </Button>
        </div>
      </Modal>
    </ConfirmDialogContext.Provider>
  );
}

export function useConfirmDialog() {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error(
      "useConfirmDialog must be used inside ConfirmDialogProvider"
    );
  }
  return context;
}
