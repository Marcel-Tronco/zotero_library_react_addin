import api from 'zotero-api-client'
import zoteroDataConverter from "../utils/zoteroDataConverter"
import getZoteroId from '../getZoteroId'


const getAll = async () => {
  try {
    const response = await api().library("user", getZoteroId()).items().get()
    const rawEntryList = response.getData()
    return zoteroDataConverter.entriesFromZotero(rawEntryList)
  } catch (error) {
    console.log(error)
    return []
  }
}

export default {
  getAll
}