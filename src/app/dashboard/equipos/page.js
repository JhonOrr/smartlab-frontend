"use client";
import BasicTable from "@/app/components/BasicTable";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import CrearEquipo from "@/app/components/CrearEquipo";
import { Button } from "@mui/material";
import fetchEquipos from "@/app/services/fetchEquipos";

export default function Equipos() {
  const { data: session, status } = useSession();
  const [equipos, setEquipos] = useState([]);
  const [open, setOpen] = useState(false);

  let columns = [
    {
      header: "Id",
      accessorKey: "idEquipo",
    },
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
      accessorKey: "nomEquipo",
    },
  ];

  useEffect(() => {
    if (status === "authenticated") {
      fetchEquipos(session?.user.token).then((h) => setEquipos(h?.data));
    }
  }, [status]);

  return (
    <div>
      <CrearEquipo
        open={open}
        setOpen={setOpen}
        equipos={equipos}
        setEquipos={setEquipos}
      />
      <Button variant="contained" onClick={() => setOpen(true)}>
        Nuevo Equipo
      </Button>
      <BasicTable columns={columns} data={equipos} setEquipos = {setEquipos}/>
    </div>
  );
}
