import * as React from "react";
import { Transition } from "../utils/Transitions";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";

import Swal from "sweetalert2";
import { deleteGroup } from "../api/Group";
import { useGroupContext } from "../hooks/useGroupContext";

export function DeleteGroup({ show, close, groupId, userId }) {
  const { deleteGroupInContext } = useGroupContext();

  const handleDeleteGroup = async () => {
    const response = await deleteGroup(groupId, userId);
    close();
    if (response.success) {
      deleteGroupInContext(groupId);
      Swal.fire("Exito", "El grupo ha sido borrado exitosamente", "success");
    } else {
      Swal.fire("Error", response.error?.response?.data?.message, "error");
    }
  };

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        open={show}
        onClose={close}
        maxWidth="lg"
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Borrar grupo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography marginBottom={1}>
              ¿Estás seguro de que deseas borrar el grupo? Esta acción es
              permanente.
            </Typography>
          </DialogContentText>
          <DialogActions>
            <Button color="error" onClick={handleDeleteGroup}>
              CONFIRMAR
            </Button>
            <Button onClick={close}>CANCELAR</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
