const validator = require('validator')

const registerInput = (data) => {
    let errors = {}

    if (data.username) {
        if (!validator.isLength(data.username.trim(), { min: 4, max: 30 })) {
            errors.username = 'Username must be between 4 to 30 characters';
        }
    }
    else errors.username = 'Username is required';

    if (data.password) {
        if (!validator.isLength(data.password.trim(), { min: 8, max: 30 })) {
            password.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,)
            errors.password = 'Password must be between 8 to 30 characters';
        }
        // else if (!validator.isStrongPassword(data.password.trim(), {
        //     minLowercase: 1,
        //     minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1,
        //     pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10,
        //     pointsForContainingNumber: 10, pointsForContainingSymbol: 10
        // })) {
        //     errors.password = 'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long").regex("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/", "i")'
        // }
    }
    else errors.password = 'Password is required';
    return {
        errors,
        inValid: Object.keys(errors).length == 0
    }
}

module.exports = {
    registerInput
}