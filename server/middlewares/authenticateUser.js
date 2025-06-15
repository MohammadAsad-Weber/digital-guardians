import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  try {
    // Get the access token from the request header
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];

    // Check if the access token is provided
    if (!accessToken) {
      return res.status(401).json({
        status: "Unauthorized",
        status_code: 401,
        message: "Action not authorized",
      });
    }
    // Check if the ACCESS_TOKEN_SECRET is available
    const AccessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!AccessTokenSecret) throw "Access Token Secret is missing from the .env file";

    // Validate the access token
    jwt.verify(accessToken, AccessTokenSecret, (error, payload) => {
      if (error) {
        return res.status(401).json({
          status: "Unauthorized",
          status_code: 401,
          message: "Invalid token provided",
        });
      }
      // Attach the payload data into the request object
      req.user = { id: payload.id, username: payload.username, email: payload.email };
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default authenticateUser;
