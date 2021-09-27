export const genCode = (digints = 8) : string => {
    return Math.random().toString(36).slice(digints-14).toUpperCase();
} 