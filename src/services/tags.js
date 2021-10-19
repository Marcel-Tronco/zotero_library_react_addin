import api from 'zotero-api-client'
import zoteroDataConverter from "../utils/zoteroDataConverter"
import getEnv from '../getEnv'
import generalRequest from '../utils/generalZoteroApiRequest'

const getAll = () => {
  return generalRequest(
    () => api().library("user", getEnv.zoteroId()).tags().get(),
    (rawTags) => zoteroDataConverter.tagsFromZotero(rawTags)
  )
}


export default {
  getAll
}