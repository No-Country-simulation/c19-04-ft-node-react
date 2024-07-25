export const dataToApi = (data) => {
  return {
    username: data.username,
    password: data.password,
    role: data.role
  }
}