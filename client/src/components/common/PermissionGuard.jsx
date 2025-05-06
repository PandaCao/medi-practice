import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';

const PermissionGuard = ({
    permission,
    permissions,
    requireAll = false,
    children,
    fallback = null,
}) => {
    const { hasPermission, hasAnyPermission, hasAllPermissions } =
        usePermissions();

    const hasAccess = () => {
        if (permission) {
            return hasPermission(permission);
        }
        if (permissions) {
            return requireAll
                ? hasAllPermissions(permissions)
                : hasAnyPermission(permissions);
        }
        return false;
    };

    return hasAccess() ? children : fallback;
};

export default PermissionGuard;
