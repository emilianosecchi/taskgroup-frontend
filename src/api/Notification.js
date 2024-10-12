import { getAxiosInstance, getFullUrl } from "../api/AxiosConfiguration";

const axios = getAxiosInstance();

const resourceName = "/notification";

export async function fetchAllNotificationsForUser(userId) {
  try {
    const response = await axios.get(
      getFullUrl(resourceName, "user/" + userId),
      { withCredentials: true }
    );
    console.log(response.data);
    return {
      success: true,
      notifications: response.data,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: e,
    };
  }
}

export async function markNotificationAsRead(notificationId) {}

export async function markAllNotificationsAsRead(userId) {}
