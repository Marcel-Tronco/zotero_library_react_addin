const generalRequest = async (specificGetter, specificTransformer) => {
  try {
    const response = await specificGetter()
    const transformed = specificTransformer(response)
    return transformed
  } catch (error) {
    console.debug(error)
    return []
  }
}

export default generalRequest