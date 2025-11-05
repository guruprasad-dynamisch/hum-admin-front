// Step One Default Values
export const stepOneDefaultValues = {
    phone: "",
};

// Step Two Default Values
export const stepTwoDefaultValues = {
    code: "",
};

// Step Three Default Values (Register Form)
export const stepThreeDefaultValues = {
    fullName: "",
    email: "",
    phone: "",
    organizationName: "",
    password: "",
    confirmPassword: ""
};

// Type Definitions
export interface PhoneVerificationResponse {
    phoneVerificationToken: string;
}

export interface RegisterProfileResponse {
    id: string;
    fullName: string;
    email: string;
    role: string;
    isActive: boolean;
}