import mongoose, {Schema, Document, Types} from 'mongoose';
import { IClient } from './client';


export interface IInvoiceLine {
    quantity: Number;
    product: IClient['_id'];
}

export interface IInvoice extends Document {
    _id: String;
    code: String;
    client: Types.ObjectId;
    lines: Types.DocumentArray<IInvoiceLine>;
    total: Number;
}

const Invoice: Schema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client',
        required: true
    },
    lines: {
        quantity:{
            type: Number,
            required: true,
        },
        product:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            required: true
        }
    },
    total: {
        type: Number, 
        required: true
    },

},{timestamps: true})

export default mongoose.model<IInvoice>('Invoice', Invoice, 'invoices')