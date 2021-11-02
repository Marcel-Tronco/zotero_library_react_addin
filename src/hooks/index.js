import {useEffect} from 'react'
import tagService from '../services/tags'
import entryService from '../services/entries'
import collectionService from '../services/collections'

export const tagHook = (setTags) => {
  useEffect(() => {
    (async () => {
      let tagResult = await tagService.getAll()
      setTags(tagResult)
    })()
  },[])
}

export const entryHook = (
    currentFetch,
    setCurrentFetch, 
    setBibEntries,
    rowsPerPage,
    selectedTag,
    currentSearch,
    currentPage,
    order
  ) => {
  useEffect(() => {
    (async () => {
      let fetchedEntries
      if (currentFetch) return
      else setCurrentFetch(true)
      if (rowsPerPage === -1) {
        fetchedEntries = await entryService.getAll(
          selectedTag ? selectedTag.name : undefined,
          currentSearch,
          order
        )
      }
      else {
        fetchedEntries = await entryService.getRange(
          currentPage * rowsPerPage, 
          rowsPerPage, 
          selectedTag? selectedTag.name : undefined,
          currentSearch,
          order
        )
      }
      setBibEntries(fetchedEntries)
      setCurrentFetch(false)
    })()
  }, [currentPage, selectedTag, rowsPerPage, order])
}

export const totalSizeHook = (
  currentSearch,
  bibEntries,
  selectedTag,
  setTotalEntries
) => {
  useEffect(() => {
    (async () => {
      if(currentSearch) {
        setTotalEntries(bibEntries.length)
      }
      else if (!selectedTag) {
        const tmp = await collectionService.getMainSize()
        setTotalEntries(tmp)
      }
      else {
        setTotalEntries(selectedTag.count)
      }
    })()
  },[selectedTag, currentSearch, bibEntries])
}
