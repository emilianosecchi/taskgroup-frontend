import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar, Skeleton, Stack, Container } from "@mui/material";

export function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(true);

  useEffect(() => {
    logout();
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Container maxWidth="xs">
        <Stack spacing={2} padding={12}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Stack>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={handleCloseSnackbar}
        >
          Se ha cerrado la sesión. Redirigiendo...
        </Alert>
      </Snackbar>
    </>
  );
}
