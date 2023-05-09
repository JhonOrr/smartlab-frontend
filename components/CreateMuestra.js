import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";

const paperStyle = {
  padding: "40px 20px",
  height: "auto",
  width: "800px",
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

const CrearMuestra = (props) => {
  const { data: session, status } = useSession();

  //   const [descripcion, setDescripcion] = useState("");
  const [fechaMuestreo, setFechaMuestreo] = useState("");
  const [componente, setComponente] = useState("");
  const [equipo, setEquipo] = useState("");
  const [lubricante, setLubricante] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const aresponse=await fetch("http://127.0.0.1:8000/api/v1/muestras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado: "Creada",
        fecha_muestreo: fechaMuestreo,
        fecha_recepcion: null,
        fecha_analisis: null,
        componente: componente,
        lubricante: lubricante,
        solicitud: 4,
      }),
    });
    setFechaMuestreo("");
    setEquipo("");
    setComponente("")
    setLubricante("")

    props.setOpen(false);
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/cliente/${session?.session.user.email}/muestras`
    );
    const data = await response.json();

    props.setMuestras(data);
  };
  console.log(equipo);
  return (
    <>
      <Dialog open={props.open}>
        <form onSubmit={handleSubmit}>
          <DialogTitle textAlign="center" sx={{ fontSize: "2rem" }}>
            Crear Muestra
          </DialogTitle>

          <DialogContent style={{ width: "600px" }}>
            <Typography>Fecha de Muestreo</Typography>
            <TextField
              type="date"
              variant="outlined"
              style={inputStyle}
              fullWidth
              value={fechaMuestreo}
              required
              onChange={(e) => {
                setFechaMuestreo(e.target.value);
              }}
            />

            <TextField
              fullWidth
              style={inputStyle}
              variant="outlined"
              value={lubricante}
              select
              required
              label="Seleccione Lubricante"
              onChange={(e) => setLubricante(e.target.value)}
            >
              {props.dataLubricantes?.map((lub) => {
                return (
                  <MenuItem value={lub.id} key={lub.id}>
                    {lub.nombre}
                  </MenuItem>
                );
              })}
            </TextField>

            <TextField
              fullWidth
              style={inputStyle}
              variant="outlined"
              value={equipo}
              select
              required
              label="Seleccione Equipo"
              onChange={(e) => setEquipo(e.target.value)}
            >
              {props.dataEquipos.Equipos?.map((equipo) => {
                return (
                  <MenuItem value={equipo} key={equipo.id}>
                    {equipo.nombre}
                  </MenuItem>
                );
              })}
            </TextField>

            {equipo ? (
              <TextField
                fullWidth
                style={inputStyle}
                variant="outlined"
                value={componente}
                select
                required
                label="Seleccione Componente"
                onChange={(e) => setComponente(e.target.value)}
              >
                {equipo.Componentes?.map((componente) => {
                  return (
                    <MenuItem value={componente.id} key={componente.id}>
                      {componente.descripcion}
                    </MenuItem>
                  );
                })}
              </TextField>
            ) : (
              <TextField
                fullWidth
                style={inputStyle}
                variant="outlined"
                value={componente}
                required
                disabled
                label="Seleccione Componente"
              />
            )}
          </DialogContent>
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
              onClick={() => props.setOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" style={buttonStyle} type="submit">
              Crear Muestra
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CrearMuestra;
