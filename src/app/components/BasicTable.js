import { MaterialReactTable } from "material-react-table";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import EditEquip from "./EditEquipo";
import { useSession } from "next-auth/react";
import fetchEquipos from "../services/fetchEquipos";

export default function BasicTable(props) {
  const buttonStyle = { margin: "10px 0", width: "40%" };

  const { data: session, status } = useSession();
  const [selectedRow, SetSelectedRow] = useState();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [equipoId, setEquipoId] = useState("");

  const handleEditClick = (rowData) => {
    SetSelectedRow(rowData);
  };

  const handleDeleteClick = async (rowData) => {
    setDeleteOpen(true);
    setEquipoId(rowData);
  };

  const handleDialogClose = () => {
    SetSelectedRow(null);
  };

  const handleDelete = async () => {
    await fetch(
      `http://localhost:8080/laboratorio/v1/equipos/${equipoId.idEquipo}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    const data = await fetchEquipos(session?.user.token)
    props.setEquipos(data?.data);
    setDeleteOpen(false);
  };

  const columns = [
    ...props.columns,
    {
      header: "Actions",
      id: "actions",
      Cell: ({ row }) => (
        <div>
          <IconButton onClick={() => handleEditClick(row.original)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(row.original)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <MaterialReactTable columns={columns} data={props.data} />
      {selectedRow && (
        <EditEquip
          rowData={selectedRow}
          onClose={handleDialogClose}
          setEquipos={props.setEquipos}
        />
      )}
      <Dialog open={deleteOpen}>
        <DialogTitle textAlign="center" sx={{ fontSize: "2rem" }}>
          Seguro que desea eliminar este equipo?
        </DialogTitle>
        <DialogActions
          sx={{
            p: "1.25rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            style={buttonStyle}
            onClick={() => setDeleteOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={buttonStyle}
            type="submit"
            color="error"
            onClick={handleDelete}
          >
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
