export const errorHandler = (message: string, ctx: Context) => {
  console.error(message)

  ctx.vtex.logger.error({
    message,
  })

  throw new Error(message)
}
