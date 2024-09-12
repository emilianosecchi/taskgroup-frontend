import Diversity1Icon from "@mui/icons-material/Diversity1";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

export function useGroupCategoryItems() {
  const groupCategoryItems = [
    { name: "AMIGOS", icon: <Diversity1Icon /> },
    { name: "TRABAJO", icon: <Diversity3Icon /> },
    { name: "PAREJA", icon: <FavoriteBorderIcon /> },
    { name: "UNIVERSIDAD", icon: <SchoolIcon /> },
    { name: "FAMILIA", icon: <FamilyRestroomIcon /> },
    { name: "OTRO", icon: <WorkspacesIcon /> },
  ];

  return { groupCategoryItems };
}
