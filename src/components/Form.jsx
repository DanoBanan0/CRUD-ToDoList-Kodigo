import { useState } from 'react'
import credenciales from '../credenciales'
import {getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore'
const db = getFirestore(credenciales)

const Form = () => {

    const pelicula = {
        nombre: '',
    }

    const [movie, setMovie] = useState(pelicula);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMovie({...pelicula, [name]: value})
    }

    const saveMovie = async (e) => {
        e.preventDefault();

        try {
            const newMovie = {
                nombre: movie.nombre,
            }

            await addDoc(collection(db, "Movies"), newMovie)
            setMovie(pelicula)

        } catch (error) {
            alert(error)
        }
        
    }

    return (
        <div >
            <div className='shadow-sm rounded mt-5' style={{backgroundColor: 'white'}}>
                <h4 className='text-center'>Registro de Peliculas</h4>
                <form className='p-4' onSubmit={saveMovie} >
                    <div className='form-floating'>
                        <input
                            type="text"
                            className='form-control mt-2 mb-2'
                            id='floatingInput'
                            placeholder=''
                            name='nombre'
                            onChange={handleChange}
                            value={movie.nombre}
                            
                            required
                        />
                        <label htmlFor="floatingInput">Ingresar Pelicula</label>
                    </div>
                    
                    <button className='form-control btn btn-outline-success mt-2'>Agregar</button>
                </form>
            </div>
        </div>
    )
}

export default Form