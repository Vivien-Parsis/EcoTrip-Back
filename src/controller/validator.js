const isValidEmail = (email) => {
    const pattern = /[a-zA-Z0-9._\-]{1,30}[@][a-zA-Z0-9._\-]{4,12}[.]{1}[a-zA-Z]{2,4}/gm
    const match = email.match(pattern) ? email.match(pattern) : undefined
    if(match==undefined){
        return false
    }
    return match.length == 1 && match[0].length == email.length
}

const validatePassword = (password) => {
    const requirements = [
        { test: (pw) => pw.length >= 10 && pw.length <= 30, message: "Password must be between 10 and 30 characters long." },
        { test: (pw) => /[A-Z]/.test(pw), message: "Password must contain at least one uppercase letter." },
        { test: (pw) => /[a-z]/.test(pw), message: "Password must contain at least one lowercase letter." },
        { test: (pw) => /\d/.test(pw), message: "Password must contain at least one number." },
        { test: (pw) => /\W/.test(pw), message: "Password must contain at least one special character." },
    ];

    const failingRequirement = requirements.find((requirement) => !requirement.test(password));
    return failingRequirement ? failingRequirement.message : null;
};

module.exports = { isValidEmail, validatePassword }