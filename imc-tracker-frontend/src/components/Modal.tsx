import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  useDialog,
} from "@chakra-ui/react";

export default function Modal({
  btnTitle,
  modalTitle,
  modalDescription,
  cancelBtnTitle,
  confirmBtnTitle,
  confirmFunc,
  btnColorPalette,
}: {
  btnTitle: string;
  modalTitle?: string;
  modalDescription?: string;
  cancelBtnTitle?: string;
  confirmBtnTitle?: string;
  confirmFunc?: () => void;
  btnColorPalette?: string;
}) {
  const dialog = useDialog();

  const handleOnConfirm = () => {
    if (confirmFunc) {
      confirmFunc();
    }

    dialog.setOpen(false);
  };

  return (
    <>
      <Dialog.RootProvider value={dialog}>
        <Dialog.Trigger asChild>
          <Button
            variant="outline"
            size="sm"
            colorPalette={btnColorPalette || ""}
          >
            {btnTitle}
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{modalTitle || ""}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>{modalDescription || ""}</p>
              </Dialog.Body>
              <Dialog.Footer>
                {cancelBtnTitle && (
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">
                      {cancelBtnTitle || "Cancelar"}
                    </Button>
                  </Dialog.ActionTrigger>
                )}
                {confirmBtnTitle && (
                  <Button onClick={handleOnConfirm} colorPalette={"red"}>
                    {confirmBtnTitle || "Confirm"}
                  </Button>
                )}
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
    </>
  );
}
