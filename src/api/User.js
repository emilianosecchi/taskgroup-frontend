import { getAxiosInstance, getFullUrl } from "../api/AxiosConfiguration";

const axios = getAxiosInstance();

const resourceName = "/user";

export async function authenticateUser(data) {
  try {
    const authenticationRequest = {
      email: data.email,
      password: data.password,
    };
    const response = await axios.post(
      getFullUrl(resourceName, "authenticate"),
      authenticationRequest,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return {
      success: true,
      jwtToken: response.data?.jwtToken,
      userId: response.data?.userId,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error,
    };
  }
}

export async function registerUser(data) {
  try {
    const registerRequest = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    const response = await axios.post(
      getFullUrl(resourceName, "register"),
      registerRequest,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
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

export async function getAllGroupsForUser(userId) {
  try {
    const response = await axios.get(
      getFullUrl(resourceName, userId.toString() + "/groups"),
      {
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
