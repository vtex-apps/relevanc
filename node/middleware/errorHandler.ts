export async function errorHandler(ctx: Context, next: () => Promise<void>) {
  const {
    vtex: { logger },
  } = ctx

  try {
    await next()
  } catch (err) {
    logger.error({
      message: err.message,
      data: err,
    })

    ctx.status = err.statusCode || 500
    ctx.body = err.message || 'Something went wrong'
  }
}
