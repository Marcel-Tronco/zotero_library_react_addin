import api from 'zotero-api-client'
import zoteroDataConverter from "../utils/zoteroDataConverter"
import getEnv from '../getEnv'
import generalRequest from '../utils/generalZoteroApiRequest'


const getAll = async (tag) => {
  console.log(tag)
  return generalRequest(
      () => api().library("user", getEnv.zoteroId()).items().top().get({tag}),
      (response) => {
        return zoteroDataConverter.entriesFromZotero(response.getData())
      }
    )
}

const getRange = async (fromIndex, maxItems, tag) => {
  let options = {
    start: fromIndex,
    limit: maxItems,
    tag: tag
  }
  return generalRequest(
    () => api().library("user", getEnv.zoteroId()).items().top().get(options),
    (response) => zoteroDataConverter.entriesFromZotero(response.getData())
  )
}

export default {
  getAll,
  getRange
}