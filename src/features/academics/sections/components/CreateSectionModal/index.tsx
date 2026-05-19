import { JSX, memo } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";
import Button from "@components/ui/Button";
import Loading from "@components/Loading";
import useCreateSectionModal from "./hooks/useCreateSectionModal";
import SectionModalContent from "./SectionModalContent";

/**
 * A modal dialog component responsible for creating a new section.
 * Displays a loading indicator while data is being processed or if the submission 
 * was not yet successful. Once ready, it renders a form with a title, content, 
 * and action buttons to either cancel the operation or submit the new section.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Controls whether the dialog is visible or not.
 * @param {number | null} props.id - The identifier for the section being created, 
 *                                   or null if not applicable. Determines loading state.
 * @param {() => void} props.handleClose - Callback function triggered when the dialog 
 *                                         requests to be closed (e.g., clicking the cancel button).
 * @returns {JSX.Element} The rendered CreateSectionModal component.
 */
function CreateSectionModal({
  open,
  id,
  handleClose,
}: {
  open: boolean;
  id: number | null;
  handleClose: () => void;
}): JSX.Element {
  const { isLoading, isSuccess, form } = useCreateSectionModal(id);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      {id && (isLoading || !isSuccess) ? (
        <Loading />
      ) : (
        <form.AppForm>
          <DialogTitle>Create Section</DialogTitle>

          <Divider />

          <SectionModalContent />

          <Divider />
          
          <DialogActions>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ color: "black" }}
              onClick={handleClose}
            >
              cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={form.handleSubmit}
            >
              create section
            </Button>
          </DialogActions>
        </form.AppForm>
      )}
    </Dialog>
  );
}

export default memo(CreateSectionModal);
