import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Zoom,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export function PostCard({ post }) {
  const { deletePost, setActionMsgSnackbar, setOpenSnackbar } =
    useContext(PostContext);

  const confirm = useConfirm();

  const handleClickDeletePost = () => {
    confirm({
      description: "Esta acción eliminará definitamente el post",
      cancellationText: "Cancelar",
      title: "Eliminar post",
    })
      .then(() => {
        deletePost(post.id);
        setActionMsgSnackbar("El post ha sido borrado exitosamente");
        setOpenSnackbar(true);
      })
      .catch(() => {});
  };

  return (
    <Card>
      <CardContent>
        <Typography
          align="center"
          variant="h4"
          sx={{ fontWeight: "bold" }}
          gutterBottom
        >
          {post.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip TransitionComponent={Zoom} title="Ver grupo" followCursor>
          <IconButton
            color="primary.light"
            edge="end"
            size="large"
            aria-label="ver"
          >
            <ContentPasteSearchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          TransitionComponent={Zoom}
          title="Enlace de invitación al grupo"
          followCursor
        >
          <IconButton
            color="primary.light"
            edge="end"
            size="large"
            aria-label="compartir"
          >
            <GroupAddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title="Eliminar grupo" followCursor>
          <IconButton
            color="primary.light"
            edge="end"
            size="large"
            aria-label="eliminar"
            onClick={() => {
              handleClickDeletePost();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
