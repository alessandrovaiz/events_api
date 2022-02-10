const eventValidator = {
    validateStore: (data: any) => {
        let success = true;
        let errors = [];

        const requiredFields = ['name', 'description', 'event_date', 'company_id' ];

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

export default eventValidator