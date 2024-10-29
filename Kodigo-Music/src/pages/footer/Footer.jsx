import '../../assets/css/footer.css'


function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <section className="footer-column" aria-labelledby="empresa-title">
                    <h3 id="empresa-title">Empresa</h3>
                    <nav aria-label="Enlaces de Empresa">
                        <ul>
                            <li><a href="#">Acerca de</a></li>
                            <li><a href="#">Empleo</a></li>
                            
                        </ul>
                    </nav>
                </section>

                <section className="footer-column" aria-labelledby="comunidades-title">
                    <h3 id="comunidades-title">Comunidades</h3>
                    <nav aria-label="Enlaces de Comunidades">
                        <ul>
                            <li><a href="#">Para artistas</a></li>
                            <li><a href="#">Desarrolladores</a></li>
                            <li><a href="#">Publicidad</a></li>
                            <li><a href="#">Inversores</a></li>
                            <li><a href="#">Proveedores</a></li>
                        </ul>
                    </nav>
                </section>

                <section className="footer-column" aria-labelledby="enlaces-title">
                    <h3 id="enlaces-title">Enlaces útiles</h3>
                    <nav aria-label="Enlaces útiles">
                        <ul>
                            <li><a href="#">Asistencia</a></li>
                            <li><a href="#">App gratis para móvil</a></li>
                        </ul>
                    </nav>
                </section>

                <section className="footer-column" aria-labelledby="planes-title">
                    <h3 id="planes-title">Planes de Kodigo</h3>
                    <nav aria-label="Planes de Kodigo">
                        <ul>
                            <li><a href="#">Premium Individual</a></li>
                            <li><a href="#">Premium Estudiante</a></li>
                            <li><a href="#">Premium Familiar</a></li>
                            <li><a href="#">Kodigo Free</a></li>
                        </ul>
                    </nav>
                </section>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Kodigo Music</p>
                <div className="social-icons" aria-label="Redes sociales">
                    <a href="https://www.instagram.com/kodigosv/" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                    <a href="https://www.youtube.com/@kodigosv" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
                    <a href="https://www.facebook.com/KODIGO.ORG/" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                    <a href="https://www.linkedin.com/company/kod1go/" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

