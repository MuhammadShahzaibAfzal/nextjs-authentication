import { TOKEN_SECRET } from "@/config";
import jwt from "jsonwebtoken";

const getDataFromToken = async (request) => {
  const token = request.cookies.get("accessToken").value;
  try {
    const decodedToken = jwt.verify(token, TOKEN_SECRET);
    return decodedToken._id;
  } catch (error) {
    throw Error(error.message);
  }
};
export default getDataFromToken;
