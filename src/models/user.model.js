import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 4, maxlength: 50, trim: true },
    lastName: { type: String, required: true, minlength: 3, maxlength: 60, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { type: String, enum: ['admin', 'writer', 'guest'] },
    age: { type: Number, min: 1, max: 99, default: 1 },
    numberOfArticles: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

userSchema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});
const User = mongoose.model('User', userSchema);

export default User;
