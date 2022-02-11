const companyValidator = {
    validateStore: (data: any) => {
        let success = true;
        let errors = [];

        const requiredFields = ['name', 'phone', 'email', 'cnpj', 'company_type_id' ];

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

        const requiredFields = [];

        for (let field of requiredFields) {
            if (!data[field]) {
                success = false;
                errors.push(`${field} is required`);
            }
        }
        return { success, errors };
    }
}

export default companyValidator