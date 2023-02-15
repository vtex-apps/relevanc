export const errorHandler = (message: string, ctx: Context) => {
  ctx.vtex.logger.error({
    message,
  })

  throw new Error(message)
}
