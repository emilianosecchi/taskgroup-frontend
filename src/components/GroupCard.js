import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Zoom,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grow,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";

import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AdjustIcon from "@mui/icons-material/Adjust";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { ShareInvitationLink } from "./ShareInvitationLink";
import { DeleteGroup } from "./DeleteGroup";
import { RequestsHandlerDialog } from "./RequestsHandlerDialog";
import { LeaveGroupDialog } from "./LeaveGroupDialog";

export function GroupCard({ group }) {
  const { getUserId } = useAuth();

  function isGroupAdmin() {
    return group.admins
      .map((admin) => admin.userId)
      .includes(parseInt(getUserId()));
  }

  const [showShareLink, setShowShareLink] = useState(false);
  const [showDeleteGroupDialog, setShowDeleteGroupDialog] = useState(false);
  const [showRequestHandlerDialog, setShowRequestHandlerDialog] = useState(false);
  const [showLeaveGroupDialog, setShowLeaveGroupDialog] = useState(false);

  return (
    <>
      <Grow
        in={true}
        style={{ transformOrigin: "0 0 0" }}
        {...{ timeout: 800 }}
      >
        <Card
          elevation={8}
          sx={{
            background: "transparent",
          }}
        >
          <CardContent>
            <Typography
              align="left"
              variant="h5"
              sx={{ fontWeight: "bold" }}
              gutterBottom
            >
              {group.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {group.description}
            </Typography>
            <Accordion
              defaultExpanded={true}
              elevation={0}
              sx={{
                backgroundColor: "transparent",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Participantes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {group.participants.map((p) => (
                  <Chip
                    key={p.userId}
                    variant="filled"
                    size="medium"
                    avatar={
                      <Avatar>
                        {p.firstName.charAt(0) + p.lastName.charAt(0)}
                      </Avatar>
                    }
                    label={p.firstName + " " + p.lastName}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          </CardContent>
          <Divider variant="middle">
            <AdjustIcon color="action" />
          </Divider>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Tooltip
                TransitionComponent={Zoom}
                title="Ver grupo"
                followCursor
              >
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
                title="Salir del grupo"
                followCursor
              >
                <IconButton
                  color="primary.light"
                  edge="end"
                  size="large"
                  aria-label="abandonar-grupo"
                  onClick={() => setShowLeaveGroupDialog(true)}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
              {isGroupAdmin() && (
                <>
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
                      onClick={() => setShowShareLink(true)}
                    >
                      <GroupAddIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Gestionar grupo"
                    followCursor
                  >
                    <IconButton
                      color="primary.light"
                      edge="end"
                      size="large"
                      aria-label="gestionar"
                      onClick={() => setShowRequestHandlerDialog(true)}
                    >
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Eliminar grupo"
                    followCursor
                  >
                    <IconButton
                      color="primary.light"
                      edge="end"
                      size="large"
                      aria-label="eliminar"
                      onClick={() => setShowDeleteGroupDialog(true)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </div>
            <div>
              {isGroupAdmin() && (
                <Chip
                  key={getUserId()}
                  variant="filled"
                  color="secondary"
                  size="small"
                  label="ADMIN"
                />
              )}
            </div>
          </CardActions>
        </Card>
      </Grow>
      <ShareInvitationLink
        show={showShareLink}
        close={() => setShowShareLink(false)}
        groupId={group.groupIdHash}
      />
      <DeleteGroup
        show={showDeleteGroupDialog}
        close={() => setShowDeleteGroupDialog(false)}
        groupId={group.groupIdHash}
        userId={getUserId()}
      />
      <RequestsHandlerDialog
        show={showRequestHandlerDialog}
        close={() => setShowRequestHandlerDialog(false)}
        groupId={group.groupIdHash}
        adminId={getUserId()}
      />
      <LeaveGroupDialog
        show={showLeaveGroupDialog}
        close={() => setShowLeaveGroupDialog(false)}
        groupId={group.groupIdHash}
        userId={getUserId()}
      />
    </>
  );
}
