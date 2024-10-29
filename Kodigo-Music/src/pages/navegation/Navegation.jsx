import { Link } from 'react-router-dom'
import '../../assets/css/navegation.css'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../context/UserDataContext"
import Session from '../session/Session';
function Navegation() {
    const { user, setUser } = useContext(UserContext);
    const [typeForm, setTypeForm] = useState("");

    const toggleSidebar = () => {
        setUser({ ...user, menuOpen: !user.menuOpen });
    };

    function clearTypeForm() {
        setTypeForm('');
    };

    function setNewTypeForm(typeForm) {
        setTypeForm(typeForm);
    };
    const handleResize = () => {
        if (window.innerWidth > 970) {
            setUser({ ...user, menuOpen: false });
        }
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [user.menuOpen]);
    return (
        <>
            <aside className={`sidebar ${user.menuOpen && window.innerWidth <= 970 ? 'open' : 'closed'}`}>
                {user.menuOpen === true && window.innerWidth <= 970 ? <div className="close-btn" onClick={toggleSidebar}>
                    ✕
                </div> : <> </>}

                <nav>
                    <ul>
                        <li><Link to="/" className="menu-item">
                            <span className="material-symbols-outlined">home</span> Inicio
                        </Link></li>
                        <li><Link to="/" className="menu-item">
                            <span className="material-symbols-outlined">grid_view</span>Nueva
                        </Link></li>
                        <li><Link to="/" className="menu-item">
                            <span className="material-symbols-outlined">radio</span> Radio
                        </Link></li>

                        <li className="submenu">
                            <span className="menu-title">
                                <span className="material-symbols-outlined">library_music</span>Biblioteca</span>
                            <ul>
                                <li><a href="#">Agregado recientemente</a></li>
                                <li><a href="#">Artistas</a></li>
                                <li><a href="#">Álbumes</a></li>
                                <li><a href="#">Canciones</a></li>
                            </ul>
                        </li>

                        <li className="submenu">
                            <span className="menu-title"> <span className="material-symbols-outlined">queue_music</span>Playlists</span>
                            <ul>
                                <li><a href="#">Todas las playlists</a></li>
                                <li><a href="#">Canciones favoritas</a></li>
                            </ul>
                        </li>
                        {
                            window.innerWidth <= 970 ? <> <br />
                                <li className="menu-item">
                                    <span onClick={() => { setTypeForm('register') }}>Registrarte</span>
                                </li>
                                <li className="menu-item">
                                    <span onClick={() => { setTypeForm('login') }}>Iniciar sesión</span>
                                </li> </> : <> </>
                        }

                    </ul>
                </nav>
            </aside>

            <Session type={typeForm} clearTypeForm={clearTypeForm} setNewTypeForm={setNewTypeForm} />
        </>
    )
}
export default Navegation