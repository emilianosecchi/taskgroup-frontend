import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_BACKEND_API_URL;
const resourceName = "/user";

function getFullUrl(endpointName) {
  return baseUrl + resourceName + "/" + endpointName;
}

export async function authenticateUser(data) {
  try {
    const authenticationRequest = {
      email: data.email,
      password: data.password,
    };
    const response = await axios.post(
      getFullUrl("authenticate"),
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
      userId: response.data?.userId
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
    const response = await axios.post(getFullUrl("register"), registerRequest, {
      headers: { "Content-Type": "application/json" },
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
