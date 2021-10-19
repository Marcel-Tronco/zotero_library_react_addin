const generalRequest = async (specificGetter, specificTransformer) => {
  try {
    const response = await specificGetter()
    const rawData = response.getData()
    const transformed = specificTransformer(rawData)
    return transformed
  } catch (error) {
    console.log(error)
    return []
  }
}

export default generalRequest