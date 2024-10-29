import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import '../../../assets/css/components/SignUp.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../../services/firebase/config";
import Swal from 'sweetalert2'

function SignUp({ clearTypeForm, changeTypeForm }) {
    const { register, handleSubmit } = useForm();

    const onSubmitForm = (data) => {


        if (data.password !== data.confirmPassword) {
            Swal.fire({
                title: '¡Error de contraseñas!',
                text: 'Las contraseñas no coinciden.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
        }
        else if (data.password.length < 8) {
            Swal.fire({
                title: '¡Error de contraseñas!',
                text: 'Las contraseñas deben tener 8 o más digitos.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
        }
        else {
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    Swal.fire({
                        title: '¡Bien hecho!',
                        text: "¡Te has registrado correctamente!",
                        icon: 'success',
                        confirmButtonText: `<span onClick={${clearTypeForm()}}>Aceptrar</span>`
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: '¡Error al registrar usuario!',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'Intentar de nuevo'
                    });
                });
        }
    }

    useEffect(() => {
        const signup = document.getElementById('signup'),
            signupClose = document.getElementById('signup-close')

        signup.classList.add('show-signup');

        /* signup hidden */
        signupClose.addEventListener('click', () => {
            signup.classList.remove('show-signup');
            clearTypeForm();
        })
    }, []);

    return (
        <div className="signup" id="signup">
            <form className="signup__form" onSubmit={handleSubmit(onSubmitForm)}>
                <h2 className="signup__title">Registrarte</h2>

                <div className="signup__group">
                    <div>
                        <label className="signup__label">Correo</label>
                        <input type="email" placeholder="Correo electrónico" id="email" className="signup__input" {...register('email')} />
                    </div>

                    <div>
                        <label className="signup__label">Contraseña</label>
                        <input type="password" placeholder="Escribe tu contraseña" id="password" className="signup__input" {...register('password')} />
                    </div>
                    <div>
                        <label className="signup__label">Confirmar Contraseña</label>
                        <input type="password" placeholder="Confirma tu contraseña" id="confirm-password" className="signup__input" {...register('confirmPassword')} />
                    </div>
                </div>

                <div>
                    <p className="signup__login">
                        ¿Ya tienes una cuenta? <a onClick={() => { changeTypeForm('login') }}>Inciar Sesión</a>
                    </p>
                    <button type="submit" className="signup__button">Registrarte</button>
                </div>
            </form>

            <span className="material-symbols-outlined signup__close" id="signup-close">
                close
            </span>
        </div>
    )
}

export default SignUp
