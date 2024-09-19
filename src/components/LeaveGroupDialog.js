import { Transition } from "../utils/Transitions";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import Swal from "sweetalert2";

import { leaveGroup } from "../api/Group";
import { useGroupContext } from "../hooks/useGroupContext";

export function LeaveGroupDialog({ show, close, groupId, userId }) {
  const { deleteGroupInContext } = useGroupContext();
  
  const handleLeaveGroup = async () => {
    const response = await leaveGroup(groupId, userId);
    close();
    if (response.success) {
      deleteGroupInContext(groupId);
      Swal.fire("Exito", "Has salido del grupo exitosamente", "success");
    } else {
      Swal.fire("Error", response.error?.response?.data?.message, "error");
    }
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      open={show}
      onClose={close}
      maxWidth="lg"
      keepMounted
      aria-describedby="alert-dialog-slide-leave"
    >
      <DialogTitle>{"Salir del grupo"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-leave">
          <Typography marginBottom={1}>
            ¿Estás seguro de que deseas salir del grupo? Esta acción es
            permanente. Se borrarrán las tareas que hayas creado dentro del
            grupo.
          </Typography>
        </DialogContentText>
        <DialogActions>
          <Button color="error" onClick={handleLeaveGroup}>
            ABANDONAR
          </Button>
          <Button onClick={close}>CANCELAR</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
