import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, lo, mid, hi) {
  return { name, lo, mid, hi };
}

const rows = [createData("hi-lo", "+1", "0", "-1")];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" style={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderRight: "solid 2px #f0f0f0" }} align="center">
              2-6
            </TableCell>
            <TableCell sx={{ borderRight: "solid 2px #f0f0f0" }} align="center">
              7-9
            </TableCell>
            <TableCell align="center">10, J, Q, K, A</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                width: "30%"
              }}
            >
              <TableCell
                sx={{ borderRight: "solid 2px #f0f0f0" }}
                align="center"
              >
                {row.lo}
              </TableCell>
              <TableCell
                sx={{ borderRight: "solid 2px #f0f0f0" }}
                align="center"
              >
                {row.mid}
              </TableCell>
              <TableCell align="center">{row.hi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
