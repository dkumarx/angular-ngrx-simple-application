
// Forms Field Messages
export const FormFieldsMessages = {
    FIRST_NAME:  {
        REQUIRED:'First Name is required.',
        VALIDATION: 'Please enter valid First Name.'
    },
    LAST_NAME: {
        REQUIRED:'Last Name is required.',
        VALIDATION: 'Please enter valid Last Name.'
    },
    DOB: {
        REQUIRED:'DOB is required.', 
        VALIDATION: 'Please enter valid DOB (yyyy-MM-dd).'
    },
    EMIAL: {
        REQUIRED: 'Email is required.',
        VALIDATION: 'Please enter valid email address.'
    },
    PHONE: {
        REQUIRED: 'Phone number is required.',
        VALIDATION: 'Please enter valid Phone number.'
    },
    ADDRESS: {
        REQUIRED: 'Address is required.'
    }
}

// Regular expression
export const RegEx = {
    PHONE: '^[0-9]*$',
    CHAR_ONLY: '^[a-zA-Z ]*$',
    EMAIL: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    DOB: '(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))'
}
