export const loginUser = async (email, password) => {
  console.log("hola");
  const response = await fetch("http://44.202.165.154" + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((value) => {
    console.log(value);
    return value.hasOwnProperty("accessToken");
  });

  console.log(response);
  return response;
};
