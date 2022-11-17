import mongoose, {Schema, Document} from 'mongoose';

interface ICompany extends Document {
    _id: string;
    name: string;
    nipc: number;
    address: string;
    tel: number;
    email: string;
}

const Company: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nipc: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    tel: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
},{timestamps: true})

export default mongoose.model<ICompany>('Company', Company, 'companies')