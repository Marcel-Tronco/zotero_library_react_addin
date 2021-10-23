import React, {useEffect, useState} from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import TagBar from './TagBar';
import BookListRow from './BookListRow';

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

  useEffect(() => {
    (async () => {
      let tagResult = await tagService.getAll()
      setTags(tagResult)
    })()
  },[])

  // Entries Effect
  useEffect(() => {
    (async () => {
      var fetchedEntries
      if (rowsPerPage === -1) {
        fetchedEntries = await entryService.getAll(selectedTag? selectedTag.name : undefined)
      }
      else {
        fetchedEntries = await entryService.getRange( currentPage * rowsPerPage, rowsPerPage, selectedTag? selectedTag.name : undefined)
      }
      setBibEntries(fetchedEntries)
    })()
  }, [rowsPerPage, currentPage, selectedTag])

  // total size effect
  useEffect(() => {
    (async () => {
      if (!selectedTag) {
        console.log(selectedTag)
        const tmp = await collectionService.getMainSize()
        console.log("temp:",tmp)
        setTotalEntries(tmp)
      }
      else {
        setTotalEntries(selectedTag.count)
      }
    })()
  },[selectedTag])


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
        <TagBar tags={tags} selected={selectedTag} setSelected={setSelectedTag} setPage={setCurrentPage}/>
        <Table 
          aria-label="Book shelf"
          sx={{ minWidth: "min-content" }}
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Buchtitel</TableCell>
              <TableCell align="right">Autor:innen</TableCell>
              <TableCell align="right">Erscheinungsjahr</TableCell>
              <TableCell align="right">Medientyp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bibEntries.map((row) => (
              <BookListRow key={row.key} row={row}/> 

            ))}
          </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[5, 10]} //[{label: "alle", value:-1}
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