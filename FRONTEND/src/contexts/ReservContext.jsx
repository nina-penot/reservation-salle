import { createContext, useState } from "react";
import { reservationService } from "../services/api";

export const ReservContext = createContext(null);

export function ReservProvider({ children }) {

    const [loading, setLoading] = useState(true);
}