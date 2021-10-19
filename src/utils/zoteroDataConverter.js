
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
        medium: itemTypeMapper(el.itemType)
      })
    } catch (error) {
      console.debug(`Error while parsing Zotero Data: ${error}\n${el.toString()}`)
    }
  }
  return transformedEntries
}
const pagedEntriesFromZotero = () => {
  return
}

const tagsFromZotero = (rawTags) => {
  let parsedTags = []
  for (let rawTag of rawTags) {
    try {
      parsedTags = parsedTags.concat([rawTag.tag])
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