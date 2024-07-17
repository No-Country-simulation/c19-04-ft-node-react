export const cleanData = (data) => {
  data.username = "";
  data.role = "";
  data.password = "";
  data.confirmPassword = "";

  return {
    username: "",
    role: "",
    password: "",
    confirmPassword: "",
  };
};
