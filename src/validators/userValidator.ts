const userValidator = {
    validateStore: (data: any) => {
        let success = true;
        let errors = [];

        const requiredFields = ['first_name', 'last_name', 'email', 'password'];

        for (let field of requiredFields) {
            if (!data[field]) {
                success = false;
                errors.push(`${field} is required`);
            }
        }
        return { success, errors };
    },

    validateUpdate: (data: any) => {
        let success = true;
        let errors = [];

        const requiredFields = ['first_name', 'last_name', 'email'];

        for (let field of requiredFields) {
            if (!data[field]) {
                success = false;
                errors.push(`${field} is required`);
            }
        }
        return { success, errors };
    }
}

export default userValidator