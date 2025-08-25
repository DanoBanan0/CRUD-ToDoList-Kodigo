import { useState } from 'react'
import imageLogin from '../assets/imgs/minimalista.png';
import imageProfile from '../assets/imgs/foto-perfil.png';
import appFirebase from '../credenciales';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
const auth = getAuth(appFirebase);

const Login = () => {

    const [registrando, setRegistrando] = useState(false)

    const funcAuth = async(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        if (registrando) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            // eslint-disable-next-line no-unused-vars
            } catch (e) {
                alert("Asegurese que la contraseña tenga mas de 8 caracteres")
            }
        }
        else{
            try {
                await signInWithEmailAndPassword(auth, email, password)
            // eslint-disable-next-line no-unused-vars
            } catch (e) {
                alert("El correo o la contraseña son incorrectos")
            }
        }
    }

    return (
        <div className='container'>
            <div className="row">
                {/* Columna mas pequeña */}
                <div className="col-md-4">
                    <div className="padre">
                        <div className="card card-body shadow-lg">
                            <img className='estilo-profile' src={imageProfile} alt="" />
                            <form onSubmit={funcAuth}>
                                <input className='cajatexto' id='email' type="text" placeholder='Ingresa email' />
                                <input className='cajatexto' id='password' type="password" placeholder='Ingrese contraseña' />
                                <button className='form-control btn btn-outline-success'>{registrando ? "Registrate" : "Inicia Sesion"}</button>
                            </form>
                            <h4 className='texto'>{registrando ? "Si ya tienes cuenta" : "No tienes cuenta"}<button className='btn btn-dark btn-sm ms-2' onClick={() => setRegistrando(!registrando)}>{registrando ? "Inicia Sesion" : "Registrate"}</button></h4>
                        </div>
                    </div>
                </div>
                {/* Columna mas grande */}
                <div className="col-md-8">
                    <img className='tamaño-imagen' style={{padding: '0 50px 200px 200px'}} src={imageLogin} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login