import * as yup from 'yup';

export default yup.object().shape({
    firstname: yup.string(),
    lastname: yup.string(),
    username: yup
        .string()
        .min(2, 'Username must be longer than 2 characters.')
        .required('Username is required'),
    password: yup.string().required('Please enter a password.'),
    email: yup.string().email(),
    terms: yup.boolean(),
});