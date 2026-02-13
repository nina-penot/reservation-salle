export function CheckEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function CheckName(name) {
    const regex = /^[a-zA-Z\p{L}\s\- ]+$/u;
    return regex.test(name);
}

export function CheckPassConfirmation(pass, pass2) {
    if (pass === pass2) {
        return true;
    }
    return false;
}

export function CheckPasswordSafety(pass) {
    let hasUpperCase = /[A-Z]/.test(password);
    let hasLowerCase = /[a-z]/.test(password);
    let hasNumbers = /\d/.test(password);

    if (pass.lenght >= 8 && hasLowerCase && hasNumbers && hasUpperCase) {
        return true;
    }
    return false;
}