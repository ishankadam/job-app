import {
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmationModal from "../modal/confirmation-modal";
import { findLabelByValue } from "../../common";
const CustomTable = (props) => {
  const [rowData, setRowData] = useState(props.rowData);
  const [deleteInfo, setDeleteInfo] = useState({
    row: 0,
    index: 0,
    show: false,
    deleteFunc: undefined,
  });

  const [loading, setLoading] = useState(props.loading);

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  useEffect(() => {
    setRowData(props.rowData);
  }, [props.rowData]);

  const getCell = (colDef, row, rowIndex, colIndex) => {
    let children;
    switch (colDef.type) {
      case "text":
        children = <Typography>{row[colDef.key]}</Typography>;
        break;
      case "dropdown":
        const label = findLabelByValue(row[colDef.key]);
        children = <Typography>{label}</Typography>;
        break;
      case "action":
        children = (
          <Stack justifyContent="center" spacing={2} direction="row">
            {colDef.isEdit ? (
              <EditIcon
                onClick={(e) => {
                  e.stopPropagation();
                  colDef.editFunc(row, rowIndex);
                }}
                sx={{ cursor: "pointer" }}
                id={`${colDef.editId}-${rowIndex}`}
              ></EditIcon>
            ) : (
              ""
            )}
            {colDef.isDelete ? (
              <DeleteIcon
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteInfo({
                    row: row,
                    index: rowIndex,
                    show: true,
                    deleteFunc: colDef.deleteFunc,
                  });
                }}
                sx={{ cursor: "pointer" }}
                id={`${colDef.deleteId}-${rowIndex}`}
              ></DeleteIcon>
            ) : (
              ""
            )}
          </Stack>
        );
        break;
      default:
        children = <Typography>{row[colDef.key]}</Typography>;
    }
    return (
      <TableCell
        align={colDef.align}
        key={`header-${colDef.id}`}
        id={`${colDef.id}-column-header`}
      >
        {children}
      </TableCell>
    );
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="job-table-header">
            <TableRow sx={{ position: "sticky", zIndex: 900, top: 0 }}>
              {props.colDef.map((column) => (
                <TableCell
                  align={column.align}
                  key={`header-${column.id}`}
                  id={`${column.id}-column-header`}
                >
                  {_.upperCase(column.label)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <CircularProgress></CircularProgress>
            ) : rowData?.length > 0 ? (
              rowData.map(
                (row, rowIndex) =>
                  row && (
                    <TableRow
                      key={`row-${rowIndex}`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {props.colDef.map((column, colIndex) => {
                        return getCell(column, row, rowIndex, colIndex);
                      })}
                    </TableRow>
                  )
              )
            ) : (
              <TableRow>
                <TableCell colSpan={props.colDef.length}>
                  <Typography align="center">No records found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {deleteInfo.show ? (
        <ConfirmationModal
          open={deleteInfo.show}
          title={props.deleteContent.title}
          message={props.deleteContent.message}
          handleConfirm={() => {
            deleteInfo.deleteFunc(deleteInfo.row, deleteInfo.index);
            setDeleteInfo({ show: false });
          }}
          handleCancel={() => setDeleteInfo({ show: false })}
        />
      ) : null}
    </>
  );
};

export default CustomTable;
