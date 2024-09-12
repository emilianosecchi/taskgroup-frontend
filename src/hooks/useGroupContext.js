import { useContext } from "react";
import { GroupContext } from "../context/GroupContext";

export function useGroupContext() {
  return useContext(GroupContext);
}
