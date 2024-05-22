import mongoose, { Document, Schema } from 'mongoose';
import {ResponseMessages} from 'sga-core';
import { IUser } from '../interface/user';
mongoose.pluralize(null);

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true
    },
    nameUser: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: [true, ResponseMessages.ERROR_464],
        trim: true
    },
    rolUser: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        trim: true
    },
    clientId: {
        type: String,
        required: true,
        trim: true
    },
    clientSecret: {
        type: String,
        required: [true, ResponseMessages.ERROR_400],
        trim: true
    },
    encriptionKey: {
        type: String,
        trim: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now
    }
});

// Middleware para actualizar la fecha de modificación
UserSchema.pre<IUser>('save', function (next) {
    this.lastModifiedDate = new Date();
    next();
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
