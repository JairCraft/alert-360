import Pool from "./cognitoConfig";

export const logoutUser = () => {
  const user = Pool.getCurrentUser();
  if (user) {
    user.signOut();
  }
};
