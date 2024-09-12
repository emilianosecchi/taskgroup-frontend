import { getAxiosInstance, getFullUrl } from "../api/AxiosConfiguration";

const axios = getAxiosInstance();

const resourceName = "/group";

export async function getAllGroupsForUser(userId) {
  try {
    const response = await axios.get(
      getFullUrl(resourceName, "get-all-groups"),
      {
        params: { user_id: userId },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return {
      success: true,
      groups: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error,
    };
  }
}

export async function createGroup(
  userId,
  groupName,
  groupDescription,
  groupCategory
) {
  try {
    const response = await axios.post(
      getFullUrl(resourceName, "create"),
      {
        userId: userId,
        name: groupName,
        description: groupDescription,
        category: groupCategory,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return {
      success: true,
      group: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error,
    };
  }
}

export async function joinGroup(group, userId) {
  try {
    const response = await axios.get(getFullUrl(resourceName, "join"), {
      params: { group: group, user_id: userId },
      withCredentials: true,
    });
    console.log(response.data);
    return {
      success: true,
      group: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error,
    };
  }
}

export async function deleteGroup(groupId, userId) {
  try {
    const response = await axios.post(
      getFullUrl(resourceName, "delete"),
      null,
      {
        params: { user_id: userId, group_id: groupId },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return {
      success: true,
      group: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error,
    };
  }
}
