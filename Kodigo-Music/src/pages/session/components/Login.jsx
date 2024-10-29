import { useContext, useEffect } from 'react';
import { useForm } from "react-hook-form"
import '../../../assets/css/components/Login.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase/config";
import { UserContext } from "../../../context/UserDataContext"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function Login({ clearTypeForm, changeTypeForm }) {
    const { register, handleSubmit } = useForm();
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmitForm = (data) => {

        signInWithEmailAndPassword(auth, data.mail, data.pass)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // setUser(user);
                // navigate("/home");
                Swal.fire({
                    title: '¡Bien hecho!',
                    text: "¡Has iniciado sesión correctamente!",
                    icon: 'success',
                    confirmButtonText: `<span onClick={${clearTypeForm()}}>Aceptrar</span>`
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: '¡Error al iniciar sesión!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo'
                });
            });

    }

    useEffect(() => {
        const login = document.getElementById('login'),
            loginClose = document.getElementById('login-close')

        login.classList.add('show-login');

        /* Login hidden */
        loginClose.addEventListener('click', () => {
            login.classList.remove('show-login');
            clearTypeForm();
        })
    }, []);

    return (
        <div className="login" id="login">
            <form className="login__form" onSubmit={handleSubmit(onSubmitForm)}>
                <h2 className="login__title">Iniciar sesión</h2>

                <div className="login__group">
                    <div>
                        <label className="login__label">Correo</label>
                        <input type="email" placeholder="Correo electrónico" id="email" className="login__input" {...register('mail')} />
                    </div>

                    <div>
                        <label className="login__label">Contraseña</label>
                        <input type="password" placeholder="Escribe tu contraseña" id="password" className="login__input" {...register('pass')} />
                    </div>
                </div>

                <div>
                    <p className="login__signup">
                        ¿Aún no tienes una cuenta? <a onClick={() => { changeTypeForm('register') }}>Registrate</a>
                    </p>

                    <button type="submit" className="login__button">Inciar Sesión</button>
                </div>
            </form>

            <span className="material-symbols-outlined login__close" id="login-close">
                close
            </span>
        </div>
    )
}

export default Login;