import logoIcon from '../../assets/images/logo-kodigo.ico';
import '../../assets/css/menu.css'
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Session from '../session/Session';
import { UserContext } from "../../context/UserDataContext"

function Menu() {
    const [typeForm, setTypeForm] = useState("");
    const [showMenuIcon, setShowMenuIcon] = useState(false);
    
    const { user, setUser } = useContext(UserContext);

    // Mostrar la cajita de búsquedas recientes
    function showRecentSearches() {
        const recentSearches = document.getElementById('recent-searches');
        recentSearches.classList.add('show');
    }

    // Ocultar la cajita de búsquedas recientes
    function hideRecentSearches() {
        const recentSearches = document.getElementById('recent-searches');
        recentSearches.classList.remove('show');
    }

    // Filtrar búsquedas basadas en la entrada
    function filterSearches() {
        const input = document.getElementById('input-busqueda').value.toLowerCase();
        const items = document.querySelectorAll('#search-list li');

        items.forEach(item => {
            if (item.textContent.toLowerCase().includes(input)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function clearTypeForm() {
        setTypeForm('');
    };

    function setNewTypeForm(typeForm) {
        setTypeForm(typeForm);
    };

    // Ocultar la cajita cuando se hace clic fuera
    document.addEventListener('click', function (event) {
        if (!document.querySelector('.search-wrapper').contains(event.target)) {
            const recentSearches = document.getElementById('recent-searches');
            recentSearches.classList.remove('show');
        }
    });

    const handleResize = () => {
        setShowMenuIcon(window.innerWidth <= 970);
    };

    const toggleSidebar = () => {
        setUser({...user, menuOpen:!user.menuOpen});
    };
    
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize); // Escuchar cambios de tamaño

        return () => window.removeEventListener('resize', handleResize);
    }, [user.menuOpen]);
    return (
        <>
            <header className="menu-container">
                <nav className="nav-bar">
                    <Link to={'/'} className='logo'>
                        <img src={logoIcon} alt="Kodigo logo" />
                        Music</Link>

                    <form className="search-bar" role="search">
                        <div className="search-wrapper">
                            <span className="material-icons search-icon" title="Buscar" onClick={() => { document.getElementById('input-busqueda').focus() }}>search</span>
                            <input
                                type="search"
                                placeholder="Buscar canciones, artistas..."
                                aria-label="Buscar"
                                id="input-busqueda"
                                onFocus={showRecentSearches}
                                onInput={filterSearches}
                                onBlur={hideRecentSearches}
                            />
                            <span className="divider">|</span>
                            <span className="material-symbols-outlined right-icon" title="Explorar">
                                explore
                            </span>
                            <div className="recent-searches" id="recent-searches">
                                <p>Lo mas buscado:</p>
                                <ul id="search-list">
                                    <li>Bad Bunny</li>
                                    <li>Karol G</li>
                                    <li>Feid</li>
                                </ul>
                            </div>
                        </div>
                    </form>

                    {
                        showMenuIcon === true ? <section className="menu-icon-container">
                            <span className="material-symbols-outlined" onClick={toggleSidebar}>
                                menu
                            </span>
                        </section> : <ul className="menu-links">
                            <li>
                                <Link onClick={() => { setTypeForm('register') }}>Registrarte</Link>
                            </li>
                            <li>
                                <Link onClick={() => { setTypeForm('login') }}>Iniciar sesión</Link>

                            </li>
                        </ul>
                    }

                </nav>
            </header>

            <Session type={typeForm} clearTypeForm={clearTypeForm} setNewTypeForm={setNewTypeForm} />
        </>
    )
}

export default Menu;