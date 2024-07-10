export const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
};

export const formatNumber = (number) => {
    const roundedNumber = parseFloat(number).toFixed(2);
    const parts = roundedNumber.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
};

export const isValidRate = (value) => {
    const num = parseFloat(value);
    return !isNaN(num) && value.includes('.') && value.split('.')[1].length <= 4;
};
