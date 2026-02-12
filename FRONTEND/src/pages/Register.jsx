// pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { CheckEmail, CheckName } from '../utils/UtilFunc.js';

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

    // Auth
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Erreur de connexion');
        } finally {
            setLoading(false);
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
                        <input className='form_input' type="email" value={email}
                            onChange={(e) => setLastName(e.target.value)} required />
                        {lastname_error && <div> {lastname_error} </div>}
                    </div>
                    <div className='form_input_group'>
                        <label>Prénom</label>
                        <input className='form_input' type="email" value={email}
                            onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                </div>
                <div className='form_input_group'>
                    <label>Email</label>
                    <input className='form_input' type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='form_input_group'>
                    <label>Mot de passe</label>
                    <input className='form_input' type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='form_input_group'>
                    <label>Confirmation du mot de passe</label>
                    <input className='form_input' type="password" value={password}
                        onChange={(e) => setConfirmPass(e.target.value)} required />
                </div>
                <button className='btn_regular color_light' type="submit" disabled={loading}>
                    {loading ? 'Inscription...' : "S'inscrire"}
                </button>
            </form>

        </div>
    );
}
export default Register;