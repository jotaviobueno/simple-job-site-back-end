import mongoose from 'mongoose';

const article = mongoose.model('article', {
        
    created_by: String,
    job_name: String,
    job_description: String,
    job_text: String,
    salary: String,
    created_in: Date,
    last_updated: Date,
    deleted_in: Date,
});

export default article;