import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Button
} from "@mui/material";

import { Transition } from "../utils/Transitions";
import { useEffect, useState } from "react";
import { getPendingRequestsForGroup } from "../api/MembershipRequest";
import { RequestItem } from "./RequestItem";

export function RequestsHandlerDialog({ show, close, groupId, adminId }) {
  const [isFetchingRequests, setIsFetchingRequests] = useState(true);
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

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        open={show}
        onClose={close}
        maxWidth="xl"
        fullWidth={true}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Gestionar solicitudes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <Grid container spacing={3}>
            {requests.map((req) => (
              <RequestItem request={req} />
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>CERRAR</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
