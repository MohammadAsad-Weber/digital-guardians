const errorHandler = (err, _req, res, _next) => {
  console.error(`\nError: ${err.message}\n`);
  return res.status(500).json({
    status: "Internal Server Error",
    status_code: 500,
    message: "An internal server error has occurred",
  });
};

export default errorHandler;
