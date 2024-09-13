import { getAxiosInstance, getFullUrl } from "../api/AxiosConfiguration";

const axios = getAxiosInstance();

const resourceName = "/membership";

export async function createMembershipRequest(group, userId) {
  try {
    const response = await axios.get(getFullUrl(resourceName, "create"), {
      params: { group: group, user_id: userId },
      withCredentials: true,
    });
    console.log(response.data);
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error,
    };
  }
}

export async function getPendingRequestsForGroup(groupId) {
  try {
    const response = await axios.get(
      getFullUrl(resourceName, "pending-requests"),
      {
        params: { group_id: groupId },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return {
      success: true,
      pendingRequests: response.data.pendingRequests,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error,
    };
  }
}
