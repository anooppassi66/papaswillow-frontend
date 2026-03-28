export interface BillingAddressRef {
    validateForm: () => Promise<void>;
    isValid: () => boolean;
    values: {
        firstName: string;
        lastName: string;
        address: string;
        city: number;
        zipCode: string;
        country: number;
        phoneNumber: string;
        state: number;
    };
    errors: {
        firstName: string;
        lastName: string;
        address: string;
        city: number;
        zipCode: string;
        country: number;
        phoneNumber: string;
        state: number;
    };
}

export interface PaymentSectionRef {
    getPaymentMethod: () => string;
    createStripePayment: (Order: any, amount: number) => Promise<void>;
    redirectToPayPal: (amount: number) => Promise<void>;
}
