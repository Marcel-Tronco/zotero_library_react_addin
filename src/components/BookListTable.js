import React, {useState} from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'

import TableSpecs from '../models/TableSpecs'

import TagBar from './TagBar'
import BookListRow from './BookListRow'
import BookListHeader from './BookListHeader'

import { tagHook, entryHook, totalSizeHook } from '../hooks'

export default function BookListTable() {
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

  // Tags Effect
  tagHook(setTags)

  // Entries Effect
  entryHook(
    currentFetch,
    setCurrentFetch, 
    setBibEntries,
    rowsPerPage,
    selectedTag,
    currentSearch,
    currentPage,
    order
  )
  
  // total size effect
  totalSizeHook(
    currentSearch,
    bibEntries,
    selectedTag,
    setTotalEntries
  )

  // Event Handler
  const handleChangePage = (event, page) => {
    setCurrentPage(page)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value)
    /* event.preventDefault() */ // is it necessary?  

  }

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
          <BookListHeader headerSpecs={TableSpecs.header} order={order} setOrder={setOrder} sortButtonsDisabled={currentFetch} />
          <TableBody>
            {bibEntries.map((row) => <BookListRow key={row.key} zoteroEntry={row}/> )}
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
  )
}