const errorMiddleware = (error, req, res, next) => {
  res.status(error.code || 400).send({ error: error.message });
};

module.exports = errorMiddleware;
