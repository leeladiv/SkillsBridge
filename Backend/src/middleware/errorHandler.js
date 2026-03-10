export function globalErrorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || 500
  const message = err.message || 'Internal server error'
  if (process.env.NODE_ENV !== 'test') console.error('[Error]', err)
  res.status(status).json({
    success: false,
    message: status >= 500 ? 'Internal server error' : message,
  })
}
