import PocketBase from 'pocketbase';
const pb = new PocketBase('https://henhacks-2025-backend.fly.dev');

export async function getAllCrimes() {
    const records = await pb.collection('crimes').getFullList({
        sort: '-created',
    });
    return records;
}

export async function createCrime(crime) {
    //example format
    // const data = {
    //     "severity": 5,
    //     "description": "crime description",
    //     "location": "address",
    //     "safetyMeasures": "safetey measure"
    // };


    const record = await pb.collection('crimes').create(crime);
    return record;
}

