import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import entryService from "../services/entries"
import collectionService from "../services/collections"



export default function EntryTable() {
  const [bibEntries, setBibEntries ] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalEntries, setTotalEntries] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(-1)

  useEffect(() => {
    (async () => {
      var fetchedEntries
      if (rowsPerPage === -1) {
        fetchedEntries = await entryService.getAll()
      }
      else {
        console.log("blub")
        fetchedEntries = await entryService.getRange( currentPage * rowsPerPage, rowsPerPage)
      }
      setBibEntries(fetchedEntries)
    })()
  }, [rowsPerPage, currentPage])

  useEffect(() => {
    (async () => {
      const tmp = await collectionService.getMainSize()
      console.log("temp:",tmp)
      setTotalEntries(tmp)
    })()
  })


  const handleChangePage = () => {
    return
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value)
    /* event.preventDefault() */ // is it necessary?  

  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Book shelf">
        <TableHead>
          <TableRow>
            <TableCell>Buchtitel</TableCell>
            <TableCell align="right">Autor:innen</TableCell>
            <TableCell align="right">Erscheinungsjahr</TableCell>
            <TableCell align="right">Medientyp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bibEntries.map((row) => (
            <TableRow
              key={`${row.title}-${row.date}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.author}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.medium}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[{label: "alle", value:-1}, 1, 2]}
          component="div"
          count={totalEntries}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
}