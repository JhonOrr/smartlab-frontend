export default async function fetchEquipos(token){
  const response = await fetch(
    "http://localhost:8080/laboratorio/v1/equipos/all",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};
