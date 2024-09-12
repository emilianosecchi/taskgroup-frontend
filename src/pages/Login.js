import {
  TextField,
  Button,
  Stack,
  Container,
  Typography,
  InputAdornment,
  Box,
  Link,
  Backdrop,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";

import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { authenticateUser } from "../api/User";

export function Login() {
  const { setAuthentication } = useAuth();

  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  useEffect(() => {
    console.log(loginErrorMsg);
  }, [loginErrorMsg]);

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  const onSubmitForm = async (data) => {
    handleOpenBackdrop();
    const response = await authenticateUser(data);
    if (response.success) {
      setAuthentication(response.jwtToken, response.userId);
      navigate("/dashboard");
    } else {
      const error = response.error;
      !error.response
        ? setLoginErrorMsg(
            "Hubo un problema de comunicación con el servidor. Intente más tarde."
          )
        : setLoginErrorMsg(error.response.data.message);
    }
    handleCloseBackdrop();
  };

  return (
    <Container maxWidth="xs">
      <Stack direction={"column"} spacing={1} marginBottom={3}>
        <Typography align="center" variant="h4" style={{ fontWeight: "bold" }}>
          Iniciar sesión
        </Typography>
        <Typography align="center" variant="subtitle1">
          Inicia sesión en el sistema o{" "}
          <Link href="/register" underline="always">
            crea una cuenta
          </Link>
        </Typography>
      </Stack>
      {loginErrorMsg !== "" && (
        <Box component="div" marginBottom={3}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {loginErrorMsg}
          </Alert>
        </Box>
      )}
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
        <Stack direction={"column"} spacing={3}>
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
          <TextField
            {...register("password", {
              required: "Debe indicar una contraseña",
              maxLength: {
                value: 15,
                message: "La máxima cantidad de caracteres permitida es 15",
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
            fullWidth={true}
          />
          <Button
            type="submit"
            sx={{
              borderRadius: 30,
            }}
            variant="contained"
            size="medium"
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
