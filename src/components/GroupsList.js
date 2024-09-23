import {
  Grid,
  Skeleton,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllGroupsForUser } from "../api/User";
import { useAuth } from "../hooks/useAuth";
import { useGroupContext } from "../hooks/useGroupContext";
import { GroupCard } from "./GroupCard";

import GroupsIcon from "@mui/icons-material/Groups";
import { CreateGroup } from "./CreateGroup";

export function GroupsList() {
  const [isFetchingGroups, setIsFetchingGroups] = useState(false);

  const { getUserId } = useAuth();
  const { groups, setGroups } = useGroupContext();

  useEffect(() => {
    async function fetchAllGroupsForUser() {
      setIsFetchingGroups(true);
      const response = await getAllGroupsForUser(getUserId());
      if (response.success) {
        setGroups(response.groups);
        setIsFetchingGroups(false);
      }
    }
    fetchAllGroupsForUser();
  }, []);

  return (
    <>
      <Box
        component="div"
        sx={{
          padding: 3,
          background: "linear-gradient(135deg, #fafdff 0%, #dae7db 100%)",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">Mis grupos</Typography>
          <CreateGroup />
        </Box>
        <Divider
          variant="middle"
          sx={{
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <GroupsIcon color="secondary" />
        </Divider>
        <Grid container spacing={3}>
          {groups.map((group) => (
            <Grid item xs={12} sm={6} md={3} key={group.id}>
              <GroupCard group={group} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
