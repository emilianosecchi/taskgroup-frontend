import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  IconButton,
  DialogTitle,
  Grid,
  Button,
  Avatar,
  Alert,
  Snackbar,
} from "@mui/material";
import { CheckCircleOutline, CancelOutlined } from "@mui/icons-material";
import { deepOrange } from "@mui/material/colors";

import { Transition } from "../utils/Transitions";
import { useEffect, useState } from "react";
import {
  getPendingRequestsForGroup,
  acceptMembershipRequest,
  rejectMembershipRequest,
} from "../api/MembershipRequest";

export function RequestsHandlerDialog({ show, close, groupId, adminId }) {
  const [isFetchingRequests, setIsFetchingRequests] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertDescription, setAlertDescription] = useState("");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchAllPendingRequests() {
      let response = await getPendingRequestsForGroup(groupId);
      if (response.success) {
        setRequests(response.pendingRequests);
        setIsFetchingRequests(false);
      }
    }
    if (show) fetchAllPendingRequests();
  }, [show]);

  const removeRequestFromList = (membershipRequestId) => {
    setRequests(
      requests.filter((r) => {
        return r.membershipRequestId !== membershipRequestId;
      })
    );
  };

  // Manejadores para aceptar o rechazar solicitudes
  const handleAccept = async (membershipRequestId) => {
    console.log("Solicitud aceptada:", membershipRequestId);
    let result = await acceptMembershipRequest(membershipRequestId, adminId);
    if (result.success) {
      setAlertDescription("Se aceptó la solicitud.");
      setOpenSnackbar(true);
      removeRequestFromList(membershipRequestId);
    }
  };

  const handleReject = async (membershipRequestId) => {
    console.log("Solicitud rechazada:", membershipRequestId);
    let result = await rejectMembershipRequest(membershipRequestId, adminId);
    if (result.success) {
      setAlertDescription("Se rechazó la solicitud.");
      setOpenSnackbar(true);
      removeRequestFromList(membershipRequestId);
    }
  };

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        open={show}
        onClose={close}
        maxWidth="sm"
        fullWidth={true}
        keepMounted
        aria-labelledby="pending-requests-dialog-title"
      >
        <DialogTitle id="pending-requests-dialog-title">
          Gestionar solicitudes
        </DialogTitle>
        <DialogContent dividers>
          {isFetchingRequests ? (
            <Typography align="center">Cargando solicitudes...</Typography>
          ) : requests.length > 0 ? (
            <Grid container spacing={2}>
              {requests.map((request) => (
                <Grid
                  container
                  item
                  key={request.id}
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={"auto"}>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>
                      {request.userDTO.firstName.charAt(0) +
                        request.userDTO.lastName.charAt(0)}
                    </Avatar>
                  </Grid>
                  {/* Nombre del solicitante */}
                  <Grid item xs={6}>
                    <Typography>
                      {request.userDTO.firstName +
                        " " +
                        request.userDTO.lastName}
                    </Typography>
                  </Grid>
                  {/* Botones para aceptar y rechazar */}
                  <Grid item xs={2}>
                    <IconButton
                      aria-label="Aceptar solicitud"
                      color="primary"
                      onClick={() => handleAccept(request.membershipRequestId)}
                    >
                      <CheckCircleOutline />
                    </IconButton>
                  </Grid>
                  <Grid item xs>
                    <IconButton
                      aria-label="Rechazar solicitud"
                      color="secondary"
                      onClick={() => handleReject(request.membershipRequestId)}
                    >
                      <CancelOutlined />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="success">
              <Typography align="center">
                No hay solicitudes pendientes.
              </Typography>
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        open={openSnackbar}
      >
        <Alert severity="success">{alertDescription}</Alert>
      </Snackbar>
    </>
  );
}
