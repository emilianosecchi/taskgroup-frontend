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

export async function markNotificationAsRead(notificationId) {
  try {
    const response = await axios.post(
      getFullUrl(resourceName, "mark-as-read"),
      null,
      { params: { notification_id: notificationId }, withCredentials: true }
    );
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

export async function deleteNotification(notificationId) {
  try {
    const response = await axios.post(
      getFullUrl(resourceName, "delete"),
      null,
      { params: { notification_id: notificationId }, withCredentials: true }
    );
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

export async function markAllNotificationsAsRead(userId) {
  try {
    const response = await axios.post(
      getFullUrl(resourceName, "user/" + userId + "/mark-all-as-read"),
      null,
      { withCredentials: true }
    );
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

export async function deleteAllNotifications(userId) {
  try {
    const response = await axios.post(
      getFullUrl(resourceName, "user/" + userId + "/delete-all"),
      null,
      { withCredentials: true }
    );
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}
