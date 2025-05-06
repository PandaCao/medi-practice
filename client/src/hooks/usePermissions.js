import { useAuth } from '../context/AuthContext';
import { ROLE_PERMISSIONS } from '../config/permissions';

export const usePermissions = () => {
    const { user } = useAuth();

    const hasPermission = (permission) => {
        if (!user) return false;
        return ROLE_PERMISSIONS[user.role]?.includes(permission) || false;
    };

    const hasAnyPermission = (permissions) => {
        return permissions.some((permission) => hasPermission(permission));
    };

    const hasAllPermissions = (permissions) => {
        return permissions.every((permission) => hasPermission(permission));
    };

    return {
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
    };
};
