import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { joinGroup } from "../api/Group";
import { createMembershipRequest } from "../api/MembershipRequest";
import { useGroupCategoryItems } from "../hooks/useGroupCategoryItems";
import { useAuth } from "../hooks/useAuth";

import Swal from "sweetalert2";

import {
  Stack,
  Container,
  Paper,
  Typography,
  Button,
  Chip,
  Zoom,
} from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

export function JoinGroup() {
  const { group } = useParams();
  const [fetchedGroup, setFetchedGroup] = useState(null);

  const { groupCategoryItems } = useGroupCategoryItems();
  const { getUserId } = useAuth();

  useEffect(() => {
    const fetchGroup = async () => {
      const response = await joinGroup(group, getUserId());
      if (response.success) {
        setFetchedGroup(response.group);
      } else {
        Swal.fire(
          "No puedes unirte a este grupo",
          response.error?.response?.data?.message,
          "warning"
        );
      }
    };
    fetchGroup();
  }, []);

  function getCategoryIcon(categoryName) {
    return groupCategoryItems.find((e) => e.name === categoryName).icon;
  }

  const onClickSendRequest = async () => {
    const response = await createMembershipRequest(group, getUserId());
    if (response.success) {
      Swal.fire(
        "Éxito",
        "Se ha enviado la solicitud para ingresar al grupo correctamente.",
        "success"
      );
    } else {
      Swal.fire(
        "No puedes unirte a este grupo",
        response.error?.response?.data?.message,
        "error"
      );
    }
  };

  return (
    <>
      {fetchedGroup && (
        <Container
          maxWidth="sm"
          sx={{
            marginTop: "20px",
          }}
        >
          <Zoom in={true} timeout={800}>
            <Paper
              elevation={3}
              sx={{
                textAlign: "center",
                alignContent: "center",
                background: "linear-gradient(315deg, #f6fcfe 0%, #f9f5ff 100%)",
              }}
            >
              <Stack
                direction={"column"}
                spacing={2}
                alignItems="center"
                padding={5}
              >
                <Typography variant="h3">{fetchedGroup.name}</Typography>
                <Stack direction={"row"} spacing={2} alignItems="center">
                  <Typography variant="body1">
                    {fetchedGroup.groupSize} participante/s
                  </Typography>
                  <Chip
                    icon={getCategoryIcon(fetchedGroup.category)}
                    label={fetchedGroup.category}
                    variant="outlined"
                    color="secondary"
                  />
                </Stack>
                <Typography variant="body1">
                  {fetchedGroup.description}
                </Typography>
                <Button
                  variant="contained"
                  size="medium"
                  color="secondary"
                  sx={{ width: "50%" }}
                  onClick={onClickSendRequest}
                >
                  <BookmarkAddIcon sx={{ mr: 1 }} />
                  Enviar solicitud
                </Button>
              </Stack>
            </Paper>
          </Zoom>
        </Container>
      )}
    </>
  );
}
