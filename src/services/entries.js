import api from 'zotero-api-client'
import zoteroDataConverter from "../utils/zoteroDataConverter"
import getEnv from '../getEnv'
import generalRequest from '../utils/generalZoteroApiRequest'


const getAll = async () => {
  return generalRequest(
    () => api().library("user", getEnv.zoteroId()).items().get(),
    (rawEntryList) => zoteroDataConverter.entriesFromZotero(rawEntryList)
  )
}

const getRange = async (fromIndex, maxItems) => {
  options = {
    start: fromIndex,
    limit: maxItems
  }
  return generalRequest(
    () => api().library("user", getEnv.zoteroId()).items().get(options),
    (rawEntryList) => zoteroDataConverter.entriesFromZotero(rawEntryList)
  )
}

export default {
  getAll,
  getRange
}