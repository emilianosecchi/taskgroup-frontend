import { createContext, useState } from "react";

export const GroupContext = createContext();

export function GroupContextProvider({ children }) {
  const [groups, setGroups] = useState([]);

  function addGroupInContext(group) {
    setGroups([...groups, group]);
  }

  function deleteGroupInContext(groupId) {
    setGroups(
      groups.filter((g) => {
        return g.id !== groupId;
      })
    );
  }

  return (
    <GroupContext.Provider value={{ groups, setGroups, addGroupInContext, deleteGroupInContext }}>
      {children}
    </GroupContext.Provider>
  );
}
