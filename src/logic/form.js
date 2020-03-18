export const isFormValid = (username, email, password, passwordConfirmation, setErrors) => {
    const isFormEmpty = (username, email, password, passwordConfirmation) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }
    const isPasswordValid = (password, passwordCo) => {
        if(password.length < 6 || passwordCo.length < 6){
            return false
        } else if (password !== passwordCo) {
            return false
        } else {
            return true
        }
    }
    let errorss = [];
    let error
    if(isFormEmpty(username, email, password, passwordConfirmation)) {
        // throw error
        error = { message: 'Fill in all fields'}
        setErrors([...errorss.concat(error)])
        return false
    } else if(!isPasswordValid(password, passwordConfirmation)) {
        // throw error
        error = { message: 'password is invalid, please make sure that your password is more than 6 characters and that password match password confirmation'}
        setErrors([...errorss.concat(error)])
        return false
    } else {
        return true
    }
}