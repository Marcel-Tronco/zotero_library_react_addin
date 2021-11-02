import api from 'zotero-api-client'
import zoteroDataConverter from "../models/zoteroDataConverter"
import getEnv from '../getEnv'
import generalRequest from '../utils/generalZoteroApiRequest'


const getAll = async (tag, searchText, order) => {
  let options = {
    tag,
    q: searchText,
    sort: order.id,
    direction: order.direction
  }
  return generalRequest(
      () => api().library("user", getEnv.zoteroId()).items().top().get(options),
      (response) => {
        return zoteroDataConverter.entriesFromZotero(response.getData())
      }
    )
}

const getRange = async (fromIndex, maxItems, tag, searchText, order) => {

  let options = {
    start: fromIndex,
    limit: maxItems,
    tag: tag,
    q: searchText,
    sort: order.id,
    direction: order.direction
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