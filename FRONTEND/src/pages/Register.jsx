// pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { CheckEmail, CheckName, CheckPasswordSafety, CheckPassConfirmation } from '../utils/UtilFunc.js';

function Register() {

    // Inputs
    const [lastname, setLastName] = useState('');
    const [firstname, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPass] = useState('');

    // Input errors
    const [lastname_error, setLastNameError] = useState('');
    const [firstname_error, setFirstNameError] = useState('');
    const [email_error, setEmailError] = useState('');
    const [password_error, setPasswordError] = useState('');
    const [confirm_password_error, setConfirmPassError] = useState('');

    const [error_tracker, setErrorTracker] = useState(false);

    // Auth
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    function checkErrors(e) {
        //reset all errors
        setConfirmPassError('');
        setEmailError('');
        setLastNameError('');
        setFirstNameError('');
        setPasswordError('');

        //reset tracker for errors
        setErrorTracker(false);

        //reusable message
        const empty = "Veuillez remplir ce champ.";

        //check for frontend errors
        if (!CheckEmail(email)) {
            setEmailError('Format email invalide.');
            setErrorTracker(true);
        }
        if (!CheckName(lastname)) {
            setLastNameError('Format nom invalide utilisez seulement des lettres, tirets et espaces.');
            setErrorTracker(true);
            setErrorTracker(true);
        }
        if (!CheckName(firstname)) {
            setFirstNameError('Format nom invalide utilisez seulement des lettres, tirets et espaces.');
            setErrorTracker(true);
        }
        //console.log(password);
        if (!CheckPasswordSafety(password)) {
            setPasswordError("Mot de passe doit contenir au moins 8 caractères, une lettre majuscule, minuscule et un chiffre.");
            setErrorTracker(true);
        }
        if (!CheckPassConfirmation(password, confirm_password)) {
            setConfirmPassError("Mot de passe ne correspond pas.");
            setErrorTracker(true);
        }
        //check for empty inputs
        if (!lastname) {
            setLastNameError(empty);
            setErrorTracker(true);
        }
        if (firstname == '') {
            setFirstNameError(empty);
            setErrorTracker(true);
        }
        if (email == "") {
            setEmailError(empty);
            setErrorTracker(true);
        }
        if (!password) {
            setPasswordError(empty);
            setErrorTracker(true);
        }
        if (!confirm_password) {
            setConfirmPassError(empty);
            setErrorTracker(true);
        }

        console.log("Error tracking : ");
        console.log("fname: " + firstname_error, "lname : " + lastname_error,
            "email : " + email_error, "pass : " + password_error,
            "confirm : " + confirm_password_error,
            "TRACKER = " + error_tracker,
        );

        if (error_tracker) {
            e.preventDefault();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //reset all errors
        setError('');

        //if no errors, send the form.
        if (!error_tracker) {
            setLoading(true);
            try {
                await login(email, password);
                navigate(from, { replace: true });
            } catch (err) {
                setError(err.message || 'Erreur de connexion');
            } finally {
                setLoading(false);
            }
        }

    };

    return (
        <div className='form_container'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className='form color_dark' onSubmit={handleSubmit}>
                <div className='form_title color_light'>Inscription</div>
                <div className='form_group'>
                    <div className='form_input_group'>
                        <label>Nom</label>
                        <input className='form_input' type="text" value={lastname}
                            onChange={(e) => setLastName(e.target.value)} required />
                        {lastname_error && <div> {lastname_error} </div>}
                    </div>
                    <div className='form_input_group'>
                        <label>Prénom</label>
                        <input className='form_input' type="text" value={firstname}
                            onChange={(e) => setFirstName(e.target.value)} required />
                        {firstname_error && <div> {firstname_error} </div>}
                    </div>
                </div>
                <div className='form_input_group'>
                    <label>Email</label>
                    <input className='form_input' type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                    {email_error && <div> {email_error} </div>}
                </div>
                <div className='form_input_group'>
                    <label>Mot de passe</label>
                    <input className='form_input' type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                    {password_error && <div> {password_error} </div>}
                </div>
                <div className='form_input_group'>
                    <label>Confirmation du mot de passe</label>
                    <input className='form_input' type="password" value={confirm_password}
                        onChange={(e) => setConfirmPass(e.target.value)} required />
                    {confirm_password_error && <div> {confirm_password_error} </div>}
                </div>
                <button onClick={checkErrors} className='btn_regular color_light' type="submit" disabled={loading}>
                    {loading ? 'Inscription...' : "S'inscrire"}
                </button>
            </form>

        </div>
    );
}
export default Register;