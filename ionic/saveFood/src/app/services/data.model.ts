export interface Food {
    id: number;
    donorName: string;
    status: string;
    thumbnail: string;
    timeCreated: Date;
    desciption: string;
    expiry: Date;
}

export interface User {
    uid: string;
    displayName: string;
    photoUrl: string;
    age?: string;
    email: string;
    phoneNumber: string;
    donatedFood: Array<string>;
    receivedFood: Array<string>
}