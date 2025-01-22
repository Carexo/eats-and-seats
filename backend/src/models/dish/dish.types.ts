export interface IDish {
    _id: string;
    name: string;
    description?: string;
    category?: string;
    price: number;
    image: Buffer;
    imageType: string;
}
