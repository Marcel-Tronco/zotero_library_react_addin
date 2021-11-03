import api from 'zotero-api-client'
import zoteroDataConverter from '../models/zoteroDataConverter'
import getEnv from '../getEnv'
import generalRequest from '../utils/generalZoteroApiRequest'

const getAll = () => {
  return generalRequest(
    () => api().library('user', getEnv.zoteroId()).tags().get(),
    (response) => zoteroDataConverter.tagsFromZotero(response)
  )
}

export default {
  getAll
}