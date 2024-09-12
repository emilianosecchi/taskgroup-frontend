import { Grid, Skeleton, Alert, Snackbar } from "@mui/material";
import { React, useContext } from "react";
import { PostCard } from "./PostCard";
import { PostContext } from "../context/PostContext";

export function ListaPosts() {
  // Utilizamos el PostContext
  const {
    isFetchingPosts,
    posts,
    actionMsgSnackbar,
    openSnackbar,
    setOpenSnackbar,
  } = useContext(PostContext);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  // Se está recuperando la información
  if (isFetchingPosts && (!posts || posts.length === 0)) {
    return (
      <>
        <Grid container spacing={3} sx={{ padding: 4 }}>
          {new Array(4).fill().map((e, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }
  // Se hizo la consulta y no se encontró información
  if (!isFetchingPosts && (!posts || posts.length === 0)) {
    return (
      <div style={{ padding: 10, display: "flex", justifyContent: "center" }}>
        <Alert
          sx={{
            width: "75%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          severity="info"
        >
          <strong>No se encontró contenido para mostrar</strong>
        </Alert>
      </div>
    );
  }
  // Se muestra el contenido con normalidad
  return (
    <>
      <Grid container spacing={3} sx={{ padding: 4 }}>
        {posts.map((post, index) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={post.id}>
              <PostCard post={post} growAnimationTimeout={index * 800} />
            </Grid>
          );
        })}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={handleCloseSnackbar}
        >
          {actionMsgSnackbar}
        </Alert>
      </Snackbar>
    </>
  );
}
