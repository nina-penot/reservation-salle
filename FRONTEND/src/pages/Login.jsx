// pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                <div className='form_title color_light'>Connexion</div>
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
                <button className='btn_regular color_light' type="submit" disabled={loading}>
                    {loading ? 'Connexion...' : 'Se connecter'}
                </button>
                <p>Pas de compte ? <Link className='link' to="/register">S'inscrire</Link></p>
            </form>

        </div>
    );
}
export default Login;