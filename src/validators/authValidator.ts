const authValidator = {
    validateAuth: (data: any) => {
        let success = true;
        let errors = []

        if (!data.email) {
            success = false;
            errors.push('email is required')
        }

        if (!data.password) {
            success = false;
            errors.push('password is required')
        }

        return { success, errors }
    }
}

export default authValidator