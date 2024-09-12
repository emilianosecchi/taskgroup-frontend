import { Typography, Box, Stack } from "@mui/material";
import LogoDevIcon from "@mui/icons-material/LogoDev";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        padding: 2,
        bottom: 0,
        width: "100%",
      }}
    >
      <Stack direction="column" alignItems="center" spacing={1}>
        <LogoDevIcon />
        <Typography variant="caption">
          © 2023 Emiliano Secchi
        </Typography>
      </Stack>
    </Box>
  );
}
