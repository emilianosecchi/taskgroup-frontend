import {
  TextField,
  Button,
  Stack,
  Divider,
  Typography,
  Tooltip,
  Zoom,
  InputAdornment,
  Box,
  Link,
  Container,
  Backdrop,
  CircularProgress,
  Alert,
  AlertTitle,
  LinearProgress,
} from "@mui/material";

import PasswordIcon from "@mui/icons-material/Password";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { textoNoContieneNumeros, contraseñaValida } from "../utils/validators";
import { registerUser } from "../api/User";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [registerErrorMsg, setRegisterErrorMsg] = useState("");
  const [isSuccessfullyRegistered, setIsSuccessfullyRegistered] =
    useState(false);

  const [openBackdrop, setOpenBackdrop] = useState(false);

  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  function cleanErrorMsg() {
    if (registerErrorMsg !== "")
      setRegisterErrorMsg("");
  }

  useEffect(() => {
    if (isSuccessfullyRegistered)
      setTimeout(() => {
        navigate("/login");
      }, 5000);
  }, [isSuccessfullyRegistered]);

  const onSubmitForm = async (data) => {
    console.log(data);
    cleanErrorMsg();
    handleOpenBackdrop();
    const response = await registerUser(data);
    if (response.success) {
      setIsSuccessfullyRegistered(true);
    } else {
      const error = response.error;
      (!error.response)
        ? setRegisterErrorMsg(
            "Hubo un problema de comunicación con el servidor. Intente más tarde."
          )
        : setRegisterErrorMsg(error.response.data.message);
    }
    handleCloseBackdrop();
  };

  const passwordValue = watch("password");

  return (
    <Container maxWidth="xs">
      <Stack direction={"column"} spacing={1} marginBottom={3}>
        <Typography align="center" variant="h4" style={{ fontWeight: "bold" }}>
          Crear cuenta
        </Typography>
        <Typography align="center" variant="subtitle1">
          Crea una cuenta o{" "}
          <Link href="/login" underline="always">
            inicia sesión
          </Link>
        </Typography>
      </Stack>
      {registerErrorMsg !== "" && (
        <Box component="div" marginBottom={3}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {registerErrorMsg}
          </Alert>
        </Box>
      )}
      {isSuccessfullyRegistered && (
        <Box component="div" marginBottom={3}>
          <Alert severity="success">
            <AlertTitle>Éxito</AlertTitle>
            <Typography variant="subtitle2" marginBottom={2}>
              La cuenta se ha creado exitosamente. Será redireccionado a la
              página de inicio de sesión.
            </Typography>
            <LinearProgress color="success" />
          </Alert>
        </Box>
      )}
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
        <Stack direction={"column"} spacing={2} alignItems="center">
          <Stack
            direction={"row"}
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <TextField
              {...register("firstName", {
                required: "Debe indicar su nombre",
                maxLength: {
                  value: 15,
                  message: "La máxima cantidad de caracteres permitida es 15",
                },
                validate: {
                  noContieneNumeros: (v) =>
                    textoNoContieneNumeros(v) ||
                    "No pueden ingresarse números en este campo",
                },
              })}
              error={errors.firstName !== undefined}
              helperText={errors.firstName?.message}
              label="Nombre"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              {...register("lastName", {
                required: "Debe indicar su apellido",
                maxLength: {
                  value: 15,
                  message: "La máxima cantidad de caracteres permitida es 15",
                },
                validate: {
                  noContieneNumeros: (v) =>
                    textoNoContieneNumeros(v) ||
                    "No pueden ingresarse números en este campo",
                },
              })}
              error={errors.lastName !== undefined}
              helperText={errors.lastName?.message}
              label="Apellido"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <TextField
            {...register("email", {
              required: "Debe indicar un email",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "El email no es válido",
              },
            })}
            error={errors.email !== undefined}
            helperText={errors.email?.message}
            label="Email"
            type="email"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            fullWidth={true}
          />
          <Stack
            direction={"row"}
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Tooltip
              TransitionComponent={Zoom}
              title="La contraseña debe ser tener por lo menos 8 caracteres, 1 mayúscula, 1 caracteres especial y 1 número"
              followCursor
            >
              <TextField
                {...register("password", {
                  required: "Debe indicar una contraseña",
                  maxLength: {
                    value: 15,
                    message: "La máxima cantidad de caracteres permitida es 15",
                  },
                  validate: {
                    validarContraseña: (password) =>
                      contraseñaValida(password) ||
                      "La contraseña no cumple las condiciones",
                  },
                })}
                error={errors.password !== undefined}
                helperText={errors.password?.message}
                label="Contraseña"
                type="password"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Tooltip>
            <TextField
              {...register("confirmPwd", {
                required: "Debe indicar una contraseña",
                validate: {
                  validarMatchDeContraseña: (v) =>
                    v === passwordValue || "Las contraseñas no coinciden",
                },
              })}
              error={errors.confirmPwd !== undefined}
              helperText={errors.confirmPwd?.message}
              label="Confirmar contraseña"
              type="password"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Button
            type="submit"
            sx={{ borderRadius: 28, marginTop: "25px" }}
            variant="contained"
            size="large"
          >
            Continuar
          </Button>
        </Stack>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" size={60} />
      </Backdrop>
    </Container>
  );
}
