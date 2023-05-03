import { useState } from "react"

const prueba=({muestras})=>{
    const [sample, setSample] = useState(muestras)

    const fetchWaterSample = async() =>{
        const response = await fetch('http://127.0.0.1:8000/muestra?water=True')
        const data = await response.json()
        setSample(data)
    }

    return(

        <div>
        <button onClick={fetchWaterSample}>Water samples</button>
        <h2>Lista de Muestras</h2>
        {sample.map(muestra=>{    
            return(
                <p>{muestra.title} | viscosity: {muestra.viscosity} | water: {muestra.water.toString()}</p>
            )
        })}
        </div>
    )
}

export default prueba

export async function getServerSideProps(){
    const response = await fetch('http://127.0.0.1:8000/muestra')
    const data = await response.json()

    return {
        props:{
            muestras:data
        }
    }

}