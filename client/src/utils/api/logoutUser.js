import axiosInstanceWithCredentials from "./axiosInstanceWithCredentials";

const logoutUser = async () => {
  try {
    const response = await axiosInstanceWithCredentials.post('api/auth/logout')

    if (response.status === 200 ) {
      return true
    } else {
      console.log("Error al cerrar sesión");
      return false
    }
  } catch (error) {
    console.log(error);
  }
}

export default logoutUser