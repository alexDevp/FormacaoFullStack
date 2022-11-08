import mongoose, {Schema, Document} from 'mongoose';

interface IUser extends Document {
    _id: string;
    nome: string;
    email: string;
    password: string;
    access_token: string;
}

const User: Schema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    access_token: {
        type: String,
        required: true,
    },
    
},{timestamps: true})

export default mongoose.model<IUser>('User', User, 'users')