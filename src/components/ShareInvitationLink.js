import * as React from "react";
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

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ShareInvitationLink({ show, close, groupId }) {
  const [open, setOpen] = React.useState(false);

  const url = window.location.host + "/groups/join/" + groupId;

  const onClickCopyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setOpen(true);
    setTimeout(function () {
      close();
    }, 1000);
  };

  return (
    <>
      <Dialog
        open={show}
        onClose={close}
        maxWidth="lg"
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Enlace de invitación al grupo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography marginBottom={1}>
              Compartí este enlace para invitar gente al grupo
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextField
                id="filled-basic"
                label={url}
                variant="filled"
                disabled={true}
                fullWidth={true}
              />
              <IconButton
                edge="end"
                size="large"
                onClick={onClickCopyToClipboard}
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Ok</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Alert severity="success">
          El enlace se ha copiado al portapapeles
        </Alert>
      </Snackbar>
    </>
  );
}
