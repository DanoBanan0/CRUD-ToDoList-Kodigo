import React from 'react'
import appFirebase from '../credenciales'
import {getAuth, signOut} from 'firebase/auth';
import Form from './Form';
import List from './List';
const auth = getAuth(appFirebase);

const Home = () => {
    return (
        <div style={{backgroundColor: '#f2f2f2', height: '100vh'}}>
            <button className='btn btn-dark' style={{float: 'right', margin: '13px' }} onClick={() => signOut(auth)}>Logout</button>

            <div className='container'>
                <div className="row g-1" >
                    <div className="col-md-4" >
                        <Form/>
                    </div>

                    <div className="col-md-8">
                        <h2 className='text-center'>Lista de Pelicualas por ver</h2>
                        <List />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home