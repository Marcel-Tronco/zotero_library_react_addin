import api from 'zotero-api-client'
import zoteroDataConverter from "../utils/zoteroDataConverter"
import getEnv from '../getEnv'
import generalRequest from '../utils/generalZoteroApiRequest'


const getAll = async () => {
  return generalRequest(
    () => api().library("user", getEnv.zoteroId()).items().get(),
    (response) => {
      return zoteroDataConverter.entriesFromZotero(response.getData())
    }
  )
}

const getRange = async (fromIndex, maxItems) => {
  let options = {
    start: fromIndex,
    limit: maxItems
  }
  return generalRequest(
    () => api().library("user", getEnv.zoteroId()).items().get(options),
    (response) => zoteroDataConverter.entriesFromZotero(response.getData())
  )
}

export default {
  getAll,
  getRange
}