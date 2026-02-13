export function CheckEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function CheckName(name) {
    const regex = /^[a-zA-Z\p{L}\s\- ]+$/u;
    return regex.test(name);
}

export function CheckPassConfirmation(pass, pass2) {
    if (!pass || !pass2) {
        return false;
    }

    if (pass === pass2) {
        return true;
    }
    return false;
}

export function CheckPasswordSafety(pass) {

    // if (pass == '' || pass == undefined) {
    //     return false;
    // }

    let hasUpperCase = /[A-Z]/.test(pass);
    let hasLowerCase = /[a-z]/.test(pass);
    let hasNumbers = /\d/.test(pass);

    if (pass.length >= 8 && hasLowerCase && hasNumbers && hasUpperCase) {
        return true;
    }
    return false;
}