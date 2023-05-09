import { useState, useEffect } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,MenuItem
} from "@mui/material";

const EditComponent = ({ rowData, onClose, setEquipos , dataEquipos}) => {
  // Estilos
  const paperStyle = {
    padding: "40px 20px",
    height: "auto",
    width: "auto",
    margin: " 25px auto",
  };
  const buttonStyle = { margin: "10px 0", width: "40%" };
  const containerStyle = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
  };
  const inputStyle = { margin: "10px auto" };
  const [editedData, setEditedData] = useState({
    descripcion: rowData.descripcion,
    equipo: rowData.equipo,
  });
  useEffect(() => {
    setEditedData(rowData);
  }, [rowData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8000/api/v1/componentes/${rowData.id}`, {
      method: "PUT",
      body: JSON.stringify(editedData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the data in the table with the updated data from the server
        // ...
        setEquipos((prevState) =>
          prevState.map((componente) => {
            if (componente.id === rowData.id) {
              return data;
            } else {
              return componente;
            }
          })
        );
        onClose();
      })
      .catch((error) => {
        console.error("Error updating row:", error);
      });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={true} onClose={handleCancel}>
      <form onSubmit={handleSave}>
        <DialogTitle textAlign="center" sx={{ fontSize: "2rem" }}>
          Editar Componente
        </DialogTitle>
        <DialogContent style={{width:'600px'}}>
          <TextField
            name="descripcion"
            label="Descripcion"
            defaultValue={editedData.descripcion}
            onChange={handleInputChange}
            style={inputStyle}
            fullWidth
          />
          {/* <TextField
            name="equipo"
            label="equipo"
            defaultValue={editedData.equipo}
            onChange={handleInputChange}
            style={inputStyle}
            fullWidth
          /> */}

          <TextField
            name="equipo"
            fullWidth
            variant="outlined"
            value={editedData.Equipo}
            select
            required
            label="Seleccione Equipo"
            onChange={handleInputChange}
            defaultValue={editedData.equipo}
          >
            {dataEquipos?.map((equipo) => {
              return (
                <MenuItem value={equipo.id} key={equipo.id}>
                  {equipo.nombre}
                </MenuItem>
              );
            })}
          </TextField>



        </DialogContent>
        <DialogActions
          sx={{
            p: "1.25rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button type="submit" style={buttonStyle} variant="contained">
            Save
          </Button>
          <Button
            onClick={handleCancel}
            style={buttonStyle}
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditComponent;
