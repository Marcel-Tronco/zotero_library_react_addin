
const itemTypeMapper = (type) => {
  switch (type) {
    case "book":
      return "Buch"
    case "journalArticle":
      return "Artikel"
    default:
      return type
  }
}

class ZoteroEntry{
  constructor(rawEntry) {
    this.data = rawEntry
  }
  get creatorOverview() {
    if (this.data.creators.length === 0) {
      return "Keine Angabe"
    }
    else if (this.data.creators.length === 1) {
      return this.data.creators[0].firstName + " " + this.data.creators[0].lastName
    }
    else {
      return `${this.data.creators[0].firstName} ${this.data.creators[0].lastName} et. al.`
    }
  }
  get creatorDetail() {
    let creators = Array.from(this.data.creators)
    let firstCreator = creators.shift()
    let detail = `${firstCreator.firstName} ${firstCreator.lastName} (${firstCreator.creatorType})`
    for (let creator of creators) {
      detail += `, ${creator.firstName} ${creator.lastName} (${creator.creatorType})`
    }
    return detail
  }
}

const entriesFromZotero = (rawEntryList) => {
  let zoteroEntries = []
  for (let el of rawEntryList) {
    zoteroEntries.push(new ZoteroEntry(el))
  }
  return zoteroEntries
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
  tagsFromZotero,
  itemTypeMapper
}