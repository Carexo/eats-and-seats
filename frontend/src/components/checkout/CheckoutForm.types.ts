export interface CheckoutFormPayload extends Address {
  email?: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}
