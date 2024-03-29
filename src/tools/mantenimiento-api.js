import axios from "axios";

export const urlApi =
  "https://servicentro-avila-mantenimiento-api-dev-fpja.1.us-1.fl0.io";
/* export const urlApi = "http://192.168.0.127:5000"; */

export const getApi = async (route = "/", token = "", timeout = 10000) => {
  try {
    const link = urlApi + route;
    const rs = await axios.get(link, {
      headers: {
        token: token,
      },
      timeout: timeout,
    });
    return rs.data;
  } catch (error) {
    return error;
  }
};

export const getImageApi = async (route, token = "", timeout = 10000) => {
  try {
    const link = urlApi + "/img/" + route;
    const rs = await axios.get(link, {
      headers: {
        token: token,
      },
      timeout: timeout,
      responseType: "blob",
    });
    return rs.data;
  } catch (error) {
    return error;
  }
};

export const postApi = async (
  route,
  data = {},
  token = "",
  timeout = 10000
) => {
  try {
    const link = urlApi + route;
    const rs = await axios.post(link, data, {
      headers: {
        token: token,
      },
      timeout: timeout,
    });
    return rs.data;
  } catch (error) {
    return error;
  }
};
export const postApiFile = async (
  route,
  formData,
  token = "",
  timeout = 10000
) => {
  try {
    const link = urlApi + route;
    const rs = await axios.post(link, formData, {
      headers: {
        token: token,
        "Content-Type": "multipart/form-data",
      },
      timeout: timeout,
    });
    return rs.data;
  } catch (error) {
    return error;
  }
};

export const putApi = async (route, data = {}, token = "", timeout = 10000) => {
  try {
    const link = urlApi + route;
    const rs = await axios.put(link, data, {
      headers: {
        token: token,
      },
      timeout: timeout,
    });
    return rs.data;
  } catch (error) {
    return error;
  }
};

export const deleteApi = async (route, token = "", timeout = 10000) => {
  try {
    const link = urlApi + route;
    const rs = await axios.delete(link, {
      headers: {
        token: token,
      },
      timeout: timeout,
    });
    return rs.data;
  } catch (error) {
    return error;
  }
};
