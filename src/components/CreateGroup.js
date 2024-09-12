import { useState } from "react";
import {
  Zoom,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Stack,
  Divider,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useGroupContext } from "../hooks/useGroupContext";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";

import { createGroup } from "../api/Group";

import AddIcon from "@mui/icons-material/Add";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

export function CreateGroup() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { getUserId } = useAuth();
  const { addGroupInContext } = useGroupContext();
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const onClickFab = () => {
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  const handeSubmitForm = async (formData) => {
    const response = await createGroup(
      getUserId(),
      formData.groupName,
      formData.groupDescription,
      formData.groupCategory
    );
    handleCloseFormDialog();
    if (response.success) {
      addGroupInContext(response.group);
      Swal.fire("Exito", "El grupo ha sido creado exitosamente", "success");
    } else {
      Swal.fire("Error", response.error?.response?.data?.message, "error");
    }
  };

  const groupCategoryItems = [
    { name: "AMIGOS", icon: <Diversity1Icon /> },
    { name: "TRABAJO", icon: <Diversity3Icon /> },
    { name: "PAREJA", icon: <FavoriteBorderIcon /> },
    { name: "UNIVERSIDAD", icon: <SchoolIcon /> },
    { name: "FAMILIA", icon: <FamilyRestroomIcon /> },
    { name: "OTRO", icon: <WorkspacesIcon /> },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <Zoom in={true} timeout={800}>
        <Fab color="secondary" aria-label="add" onClick={onClickFab}>
          <AddIcon />
        </Fab>
      </Zoom>
      <Dialog
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>CREAR GRUPO</DialogTitle>
        <form onSubmit={handleSubmit(handeSubmitForm)}>
          <DialogContent>
            <DialogContentText sx={{ marginBottom: 2 }}>
              Complete los siguientes campos para crear un nuevo grupo:
            </DialogContentText>
            <Stack direction="column" spacing={2}>
              <Stack
                direction="row"
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <TextField
                  {...register("groupName", {
                    required: "Debe indicar un título",
                    maxLength: {
                      value: 50,
                      message:
                        "La máxima cantidad de caracteres permitida es 50",
                    },
                  })}
                  error={errors.groupName !== undefined}
                  helperText={errors.groupName?.message}
                  placeholder="Máximo de 50 caracteres"
                  id="groupName"
                  label="Nombre del grupo"
                  type="text"
                  variant="outlined"
                  sx={{ width: "50%" }}
                />
                <TextField
                  select
                  label="Categoría del Grupo"
                  variant="outlined"
                  sx={{ width: "50%" }}
                  defaultValue=""
                  inputProps={register("groupCategory", {
                    required: "Debe seleccionar una categoría de grupo",
                  })}
                  error={errors.groupCategory !== undefined}
                  helperText={errors.groupCategory?.message}
                >
                  {groupCategoryItems.map((option) => (
                    <MenuItem key={option.name} value={option.name}>
                      <ListItemIcon>{option.icon}</ListItemIcon>
                      <ListItemText primary={option.name} />
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <TextField
                {...register("groupDescription", {
                  required: "Debe indicar una descripción",
                  maxLength: {
                    value: 250,
                    message:
                      "La máxima cantidad de caracteres permitida es 250",
                  },
                })}
                error={errors.groupDescription !== undefined}
                helperText={errors.groupDescription?.message}
                placeholder="Máximo de 250 caracteres"
                id="groupDescription"
                label="Descripción del grupo"
                variant="outlined"
                multiline
                rows={3}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFormDialog}>Cancelar</Button>
            <Button type="submit">Crear</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
