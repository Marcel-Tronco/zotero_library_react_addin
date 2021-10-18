import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import entryService from "../services/entries"



export default function EntryTable() {
  const [bibEntries, setBibEntries ] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const fetchedEntries = await entryService.getAll()
      setBibEntries(fetchedEntries)
    }
    fetchData()

  }, [])

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
      </Table>
    </TableContainer>
  );
}