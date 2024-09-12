import { Outlet } from "react-router-dom";
import { GroupContextProvider } from "../context/GroupContext";

export default function GroupContextLayout() {
  return (
    <GroupContextProvider>
      <Outlet />
    </GroupContextProvider>
  );
}
