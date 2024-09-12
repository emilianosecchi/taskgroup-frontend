import { React, useContext, useState } from "react";
import {
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { PostContext } from "../context/PostContext";
import { useForm } from "react-hook-form";

export function AddPost() {
  const { setActionMsgSnackbar, setOpenSnackbar, createPost } =
    useContext(PostContext);

  // Manejo y validación del formulario
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const [openFormDialogCreate, setOpenFormDialogCreate] = useState(false);

  const handleClickCreatePost = () => {
    setOpenFormDialogCreate(true);
  };

  const handleSubmitCreatePost = (data) => {
    createPost({
      title: data.titulo,
      body: data.descripcion
    });
    setActionMsgSnackbar("El post ha sido creado exitosamente");
    setOpenSnackbar(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialogCreate(false);
  };

  return (
    <div style={{ padding: 10, display: "flex", justifyContent: "center" }}>
      <Fab variant="extended" color="primary" onClick={handleClickCreatePost}>
        <AddIcon sx={{ mr: 1 }} />
        Crear
      </Fab>
      <Dialog
        open={openFormDialogCreate}
        onClose={handleCloseFormDialog}
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogTitle>Crear Post</DialogTitle>
        <form onSubmit={handleSubmit(handleSubmitCreatePost)}>
          <DialogContent>
            <DialogContentText>
              Complete los siguientes campos para crear el post
            </DialogContentText>
            <TextField
              {...register("titulo", {
                required: "Debe indicar un título",
                maxLength: {
                  value: 50,
                  message: "La máxima cantidad de caracteres permitida es 50",
                },
              })}
              error={errors.titulo !== undefined}
              helperText={errors.titulo?.message}
              placeholder="Máximo de 50 caracteres"
              margin="dense"
              id="titulo"
              label="Titulo"
              type="text"
              variant="outlined"
              style={{ marginBottom: "10px", width: "50%" }}
              autoFocus
            />
            <TextField
              {...register("descripcion", {
                required: "Debe indicar una descripción",
                maxLength: {
                  value: 250,
                  message: "La máxima cantidad de caracteres permitida es 250",
                },
              })}
              error={errors.descripcion !== undefined}
              helperText={errors.descripcion?.message}
              placeholder="Máximo de 250 caracteres"
              multiline
              id="descripcion"
              label="Descripcion"
              rows={3}
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFormDialog}>Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
