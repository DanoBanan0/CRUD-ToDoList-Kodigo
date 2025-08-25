import credenciales from '../credenciales';
import { useState, useEffect } from 'react';
import {getFirestore, collection, getDocs, deleteDoc, doc, updateDoc, getDoc} from 'firebase/firestore';
const db = getFirestore(credenciales);

const List = () => {

    const [list, setList] = useState([]);
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const getList = async () => {
            const data = await getDocs(collection(db, 'Movies'));
            setList(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        }
        getList();
    }, [list])

    const deleteMovie = async (id) => {
        try {
            await deleteDoc(doc(db, 'Movies', id));
        } catch (error) {
            alert(error);
        }
    }

    const getMovie = async (id) => {
        const docSnap = await getDoc(doc(db, 'Movies', id));
        if(docSnap.exists()){
            setMovie({...docSnap.data(), id: docSnap.id});
        }
        else{
            alert('No existe');
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMovie({...movie, [name]: value})
    }

    const updateClient = async (e) => {
            e.preventDefault();
    
            try {
                const updateMovie = {
                    ...movie,
                };
    
                await updateDoc(doc(db, 'Movies', movie.id ), updateMovie)
                alert("Pelicula Actualizada correctamente")
                setMovie(null)    
            } catch (error) {
                alert(error)
            }
            
        }


    return (
        <div >
            <div className='g-4'>
                {list.map((movie) => (
                    <div className='col' key={movie.id}>
                        <div className='shadow-sm rounded m-1' style={{backgroundColor: 'white'}}>
                            <h5 className='mt-3 m-3'>
                                {movie.nombre} 
                                <button type='button' className='btn btn-outline-warning m-3' data-bs-toggle='modal' data-bs-target='#staticBackdrop' onClick={() => getMovie(movie.id)}>Actualizar</button>
                                <button className='btn btn-outline-danger ' onClick={() => deleteMovie(movie.id)}>ELiminar</button>
                            </h5>
                            
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            <div className='modal fade'
            id='staticBackdrop'
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            tabIndex='-1'
            aria-labelledby='staticBackdropLabel'
            aria-hidden='true'
            >
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1 className='modal-title fs-5' id='staticBackdropLabel'>Actualizar Pelicula</h1>
                            <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                            ></button>
                        </div>
                        <div className='modal-body'>
                            {movie && (
                                <form onSubmit={updateClient}>
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
                                        <label htmlFor='floatingInput'>Ingresar Pelicula</label>
                                    </div>
                                    <button className='form-control btn btn-outline-warning'>Actualizar</button>
                                </form>
                            )}
                        </div>
                        <div className='modal-footer'>
                            <button
                            type='button'
                            className='btn btn-secondary'
                            data-bs-dismiss='modal'
                            >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List