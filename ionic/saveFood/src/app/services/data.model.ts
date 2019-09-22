export interface Food {
    id: number;
    donorUid: string;
    foodType: string;
    status: string;
    thumbnail: string;
    timeCreated: Date;
    desciption: string;
    expiry: Date;
    location: string; // for now it's a stirng, might create extra interface
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