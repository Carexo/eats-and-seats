import {model, Schema} from 'mongoose';


export interface IAddress {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
}

export const AddressSchema: Schema = new Schema<IAddress>({
    street: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    zipcode: {
        type: String,
        required: true,
        match: [/^\d{5}(-\d{4})?$/, 'Invalid zipcode format'],
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
});