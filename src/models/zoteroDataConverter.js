import { ZoteroTypeMapper as ZTM } from "./TableSpecs"


export class ZoteroEntry{
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
    let detail = `${firstCreator.firstName} ${firstCreator.lastName} (${ZTM.creatorTypeLabel(firstCreator.creatorType)})`
    for (let creator of creators) {
      detail += `, ${creator.firstName} ${creator.lastName} (${ZTM.creatorTypeLabel(creator.creatorType)})`
    }
    return detail
  }
  get itemType() {
    console.log("BLUB:", this.data.itemType)
    return ZTM.itemTypeLabel(this.data.itemType)
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
}