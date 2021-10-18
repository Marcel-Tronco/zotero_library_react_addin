import api from 'zotero-api-client'
import zoteroDataConverter from "../utils/zoteroDataConverter"
import getZoteroId from '../getZoteroId'

const getAll = async () => {
  try {
    const response = await api().library("user", getZoteroId()).tags().get()
    const rawTags = response.getData()
    console.log(rawTags)
    return zoteroDataConverter.tagsFromZotero(rawTags)
  } catch (error) {
    console.log(error)
    return []
  }
}

export default {
  getAll
}