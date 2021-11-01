import api from 'zotero-api-client'
import getEnv from '../getEnv'
import generalRequest from '../utils/generalZoteroApiRequest'

const getMainSize = async () => {
  let opts = {name: getEnv.overalCollection()}
  let result = await generalRequest(
    () => api().library("user", getEnv.zoteroId()).collections().get(opts),
    (response) => {
      if ( response && response.raw.length > 0) {
        //console.log("blub", response.raw[0].meta.numItems)
        return [response.raw[0].meta.numItems]
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