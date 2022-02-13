const ticketValidator = {
    validateStore: (data: any) => {
        let success = true;
        let errors = [];

        const requiredFields = ['expiration_date', 'event_id', 'ticket_price', 'amount', 'batch_effective_date', 'is_active' ];

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

export default ticketValidator