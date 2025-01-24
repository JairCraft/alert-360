import Pool from "./cognitoConfig";

const registerUser = (name, email, password, phone) => {
  return new Promise((resolve, reject) => {
    const userAttributes = [{ Name: "custom:phone", Value: phone }];
    console.log(email);
    Pool.signUp(email, password, userAttributes, null, (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(data);
        resolve(data);
      }
    });
  });
};

export default registerUser;
