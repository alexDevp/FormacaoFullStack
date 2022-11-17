import mongoose, {Schema, Document} from 'mongoose';

export interface IClient extends Document {
    _id: string;
    name: string;
    nif: number;
    adress: string;
}

const Client: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nif: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
},{timestamps: true})

export default mongoose.model<IClient>('Client', Client, 'clients')