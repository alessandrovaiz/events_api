const companyValidator = {
    validateStore: (data: any) => {
        let success = true;
        let errors = [];

        const requiredFields = ['street', 'number', 'complement', 'zipcode', 'district', 'city', 'state'];

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
    },

    validateLinkOrUnlinkAddressWithEntity: (data: any) => {
        let success = true;
        let errors = [];

        const requiredFields = ['address_id', 'entity_id', 'unlink', 'entity'];

        for (let field of requiredFields) {
            if (data[field] == undefined || data[field] == '' && data[field] != false) {
                success = false;
                errors.push(`${field} is required`);
            }
        }
        return { success, errors };
    },

}

export default companyValidator