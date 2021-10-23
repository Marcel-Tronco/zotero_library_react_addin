
const itemTypeMapper = (type) => {
  switch (type) {
    case "book":
      return "Buch"
    default:
      return type
  }
}

const entriesFromZotero = (rawEntryList) => {
  var transformedEntries = []
  for (let el of rawEntryList) {
    try {
      transformedEntries = transformedEntries.concat({
        title: el.title,
        date: el.date,
        author: el.creators[0].firstName + " " + el.creators[0].lastName, // todo: Creator field parsing 
        medium: itemTypeMapper(el.itemType),
        key: el.key
      })
    } catch (error) {
      console.debug(`Error while parsing Zotero Data: ${error}\n${el.toString()}`)
    }
  }
  return transformedEntries
}

const tagsFromZotero = (apiResponse) => {
  let parsedTags = []
  console.log(apiResponse, apiResponse.getData())
  for (let rawTag of apiResponse.raw) {
    try {
      parsedTags = parsedTags.concat([{
        name: rawTag.tag,
        count: rawTag.meta.numItems
      }])
    } catch (error) {
      console.debug(error)
    }
  }
  return parsedTags
}

export default {
  entriesFromZotero,
  tagsFromZotero
}