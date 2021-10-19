import api from 'zotero-api-client'
import zoteroDataConverter from "../utils/zoteroDataConverter"
import getEnv from '../getEnv'
import generalRequest from '../utils/generalZoteroApiRequest'

const getMainSize = () => {
  opts = {name: getEnv.overallCollection()}
  result = generalRequest(
    () => api().library("user", getEnv.zoteroId()).collections().get(opts),
    (rawCollection) => {
      if ( rawCollection && rawCollection.length > 0) {
        return [rawCollection.meta.numItems]
      }
      else{
        throw new Error("API-ERROR: couldn't find main collection")
      }
    }
  )
  return result.length === 1 ?  result[0] : 0
}


export default {
  getMainSize
}