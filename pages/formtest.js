const { useState } = require("react")

const formtest=()=>{
    const [water, setWater] = useState('')
    const [title, setTitle] = useState('')
    const [viscosity, setViscosity] = useState('')

const submitSample = async () =>{
    const response = await fetch('http://127.0.0.1:8000/muestra',{
        method: 'POST',
        body: JSON.stringify({water, title, viscosity}),
        headers:{
            'Content-type': 'application/json'
        }
    })
    const data = await response.json()
}

    return(
        <>
            <form onSubmit={submitSample}>
                <input 
                    type='text' 
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                />
                <input 
                    type='text' 
                    value={water}
                    onChange={e=>setWater(e.target.value)}
                />
                <input 
                    type='text' 
                    value={viscosity}
                    onChange={e=>setViscosity(e.target.value)}
                />
                <button>submit</button>

            </form>
        
        
        
        </>
    )
}

export default formtest