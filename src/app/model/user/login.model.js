import mongoose from 'mongoose';

const login = mongoose.model('login', {
        
    email: String,
    session_token: Object,
    login_efetued_in: Date,
    login_expires_in: Date,
    disconnected_in: Date,

    allSettingIP: {
        countryCode: String,
        region: String,
        regionName: String,
        city: String,
        isp: String,
        org: String,
        as: String,
        asname: String,
        query: String
    }
});

export default login;