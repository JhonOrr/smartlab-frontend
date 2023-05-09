import { useState, useEffect } from "react";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

const EditEquip = ({ rowData, onClose, setEquipos}) => {
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
    marca: rowData.marca,
    modelo: rowData.modelo,
    nombre: rowData.nombre,
  });
  useEffect(() => {
    setEditedData(rowData);
  }, [rowData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8000/api/v1/equipos/${rowData.id}`, {
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
        setEquipos(prevState => prevState.map(equipo => {
          if (equipo.id === rowData.id) {
            return data;
          } else {
            return equipo;
          }
        }));
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
      <DialogTitle textAlign="center" sx={{fontSize:'2rem'}}>Editar Equipo</DialogTitle>
      <DialogContent>
        <TextField
          name="marca"
          label="Marca"
          defaultValue={editedData.marca}
          onChange={handleInputChange}
          style={inputStyle}
          fullWidth
        />
        <TextField
          name="modelo"
          label="Modelo"
          defaultValue={editedData.modelo}
          onChange={handleInputChange}
          style={inputStyle}
          fullWidth
        />
        <TextField
          name="nombre"
          label="Nombre"
          defaultValue={editedData.nombre}
          onChange={handleInputChange}
          style={inputStyle}
          fullWidth
        />
      </DialogContent>
      <DialogActions
      sx={{
        p: "1.25rem",
        display: "flex",
        justifyContent: "space-between",
      }}>
        <Button type='submit'  style={buttonStyle} variant="contained">Save</Button>
        <Button onClick={handleCancel} style={buttonStyle} variant="contained">Cancel</Button>
      </DialogActions>
      </form >
    </Dialog>
  );
};

export default EditEquip