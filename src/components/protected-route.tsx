import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const navigate = useNavigate();
    const user = auth.currentUser;

    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    return <>{children}</>;
}