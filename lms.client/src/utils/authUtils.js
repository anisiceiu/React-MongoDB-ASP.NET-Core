export const isTokenValid = (token) => {
    if (!token) return false;

    try {
        // 1. Split the token into parts
        const parts = token.split('.');
        if (parts.length !== 3) return false; // Not a valid JWT structure

        // 2. Decode the payload (middle part)
        const payload = JSON.parse(atob(parts[1]));

        // 3. Check expiration
        const currentTime = Date.now() / 1000; // Convert to seconds
        return payload.exp > currentTime;

    } catch (error) {
        console.error("Token validation failed:", error);
        return false;
    }
};

export const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};