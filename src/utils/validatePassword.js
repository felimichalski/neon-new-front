export default function validatePassword(pass) {
    let count = 0;
    // return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([-@./#&+\w\s])[a-zA-Z\d]{8,}$/.test(pass)
    if (pass.length > 6) {
        if (pass.match(".*\\d.*"))
            count++;
        if (pass.match(".*[a-z].*"))
            count++;
        if (pass.match(".*[A-Z].*"))
            count++;
    }
    return count >= 3;
}