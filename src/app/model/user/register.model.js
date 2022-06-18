import mongoose from 'mongoose';

const register = mongoose.model('register', {
        
    full_name: String,
    email: String,
    password: String,
    age: Number,
    birth_date: Date,
    cep: String,
    state: String,
    City: String,
    //extras
    extra_permission: Boolean,
    cnpj: Number,
    company_name: String,  
    //settings
    created_in: Date,
    last_updated: Date,
    deleted_in: Date,
    andressIP: String,
    
});

export default register;