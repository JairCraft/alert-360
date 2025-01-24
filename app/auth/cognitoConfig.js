import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_SjORGGwKi", // Reemplaza con tu User Pool ID
  ClientId: "4uitp20tagfeemkjepbfnlna9r", // Reemplaza con tu App Client ID
};

export default new CognitoUserPool(poolData);
