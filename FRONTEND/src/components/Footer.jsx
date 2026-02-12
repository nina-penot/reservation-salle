// components/Footer.jsx
import NavBtn from "./NavBtn";

function Footer() {
    return (
        <footer className="footer color_dark">
            <div className="footer_menu">
                <div className="footer_col_left">
                    <NavBtn url={"/"} text={"Retour à l'accueil"} />
                </div>
                <div className="footer_col_right">
                    <NavBtn url={"/register"} text={"S'inscrire"} />
                    <NavBtn url={"/login"} text={"Se connecter"} />
                </div>
            </div>

            <div>Réservation de salle</div>
            <div>© {new Date().getFullYear()} La Plateforme_</div>
        </footer>
    );
}
export default Footer;