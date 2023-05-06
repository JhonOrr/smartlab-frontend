import { BasicTable } from "@/components/BasicTable";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

function Test() {
  const [equipos, setEquipos] = useState([]);
  const [equiposMarca, setEquiposMarca] = useState([]);
  const [columns, setColumns] = useState({});


  
  let column = [
    {
      header: "Marca",
      accessorKey: "marca",
    },
    {
      header: "Modelo",
      accessorKey: "modelo",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
  ];

  const getEquipos = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/v1/equipos");
    const data = await response.json();
    console.log(data);
    let equipoMarca = [];
    data.map((d) => {
      equipoMarca.push(d.marca);
    });


    setEquipos(data);
    console.log(equipoMarca);
  };
  useEffect(() => {
    getEquipos();
  }, []);

  return (
    <div>
      {equipos.map((equipo) => {
        return <div>{equipo.nombre}</div>;
      })}
      <Button variant="contained">Nuevo Equipo</Button>
      <BasicTable columns={column} data={equipos}></BasicTable>
    </div>
  );
}

export default Test;
