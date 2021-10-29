import React, {useEffect, useState} from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import TableSpecs from '../TableSpecs'


import TagBar from './TagBar';
import BookListRow from './BookListRow';
import BookListHeader from './BookListHeader'

import entryService from "../services/entries"
import collectionService from "../services/collections"
import tagService from "../services/tags"



export default function EntryTable() {
  const [bibEntries, setBibEntries ] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalEntries, setTotalEntries] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedTag, setSelectedTag] = useState()
  const [tags, setTags] = useState([])
  const [currentSearch, setCurrentSearch] = useState("")
  const [currentFetch, setCurrentFetch] = useState(false)
  const [order, setOrder] = useState(TableSpecs.header.initialOrder)

  // effect hooks

  useEffect(() => {
    (async () => {
      let tagResult = await tagService.getAll()
      setTags(tagResult)
    })()
  },[])

  // Entries Effect
  useEffect(() => {
    (async () => {
      let fetchedEntries
      if (currentFetch) return
      else setCurrentFetch(true)
      if (rowsPerPage === -1) {
        fetchedEntries = await entryService.getAll(selectedTag? selectedTag.name : undefined, currentSearch)
      }
      else {
        fetchedEntries = await entryService.getRange(
          currentPage * rowsPerPage, 
          rowsPerPage, 
          selectedTag? selectedTag.name : undefined,
          currentSearch
        )
      }
      setBibEntries(fetchedEntries)
      setCurrentFetch(false)
    })()
  }, [currentPage, selectedTag, rowsPerPage])

  // total size effect
  useEffect(() => {
    (async () => {
      if(currentSearch) {
        setTotalEntries(bibEntries.length)
      }
      else if (!selectedTag) {
        const tmp = await collectionService.getMainSize()
        console.log("temp:",tmp)
        setTotalEntries(tmp)
      }
      else {
        setTotalEntries(selectedTag.count)
      }
    })()
  },[selectedTag, currentSearch, bibEntries])


  // Event Handler
  const handleChangePage = (event, page) => {
    setCurrentPage(page)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value)
    /* event.preventDefault() */ // is it necessary?  

  }
/*    
*/
  return (
    <Paper className="wide-max-width">

      <TableContainer component={Paper}>
        <TagBar 
          tags={tags} 
          selected={selectedTag}
          setSelected={setSelectedTag} 
          setPage={setCurrentPage} 
          setCurrentSearch={setCurrentSearch}
          setRowsPerPage={setRowsPerPage}
          buttonsDisabled={currentFetch}
        />
        <Table 
          aria-label="Book shelf"
          sx={{ minWidth: "min-content" }}
        >
          <BookListHeader headerSpecs={TableSpecs.header} order={order} setOrder={setOrder}/>
          <TableBody>
            {bibEntries.map((row) => (
              <BookListRow key={row.key} row={row}/> 

            ))}
          </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[{label: "alle", value:-1}, 5, 10, 25]}
            component="div"
            count={totalEntries}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </TableContainer>
    </Paper>
  );
}