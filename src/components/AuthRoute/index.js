import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom';

function AuthComponent({ children }) {
    const token = getToken();

    return token ? <>{children}</> : <Navigate to="/login" replace />
}

export default AuthComponent