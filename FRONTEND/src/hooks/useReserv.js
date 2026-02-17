// hooks/useAuth.js
import { useContext } from 'react';
import { ReservContext } from '../contexts/ReservContext';

export function useReserv() {
    const context = useContext(ReservContext);
    if (!context) {
        throw new Error('useReserv doit être utilisé dans un ReservProvider');
    }
    return context;
}

export default useReserv;