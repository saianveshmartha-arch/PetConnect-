import { Pet, User, Gender, Location as PetLocation } from '../types';

const mockPets: Pet[] = [
  {
    id: 1,
    name: 'Buddy',
    breed: 'Golden Retriever',
    type: 'Dog',
    age: 2,
    gender: Gender.Male,
    location: { city: 'San Francisco', state: 'CA' },
    description: 'Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He is great with kids and other dogs.',
    careInstructions: {
      feeding: 'Twice a day with high-quality dog food.',
      grooming: 'Brush coat 2-3 times a week. Professional grooming every 2 months.',
      exercise: 'At least 60 minutes of vigorous exercise daily.',
      medicalNeeds: 'Up to date on all vaccinations. Annual check-ups recommended.',
    },
    photos: ['https://picsum.photos/seed/buddy/800/600'],
    sellerId: 101,
  },
  {
    id: 2,
    name: 'Lucy',
    breed: 'Siamese',
    type: 'Cat',
    age: 3,
    gender: Gender.Female,
    location: { city: 'San Francisco', state: 'CA' },
    description: 'Lucy is a beautiful and affectionate Siamese cat. She enjoys cuddling on the couch and chasing laser pointers.',
    careInstructions: {
      feeding: 'Free-fed with dry food, wet food once a day.',
      grooming: 'Minimal grooming needed. Brush weekly.',
      exercise: 'Interactive toys for 30 minutes daily.',
      medicalNeeds: 'Regular flea and tick prevention.',
    },
    photos: ['https://picsum.photos/seed/lucy/800/600'],
    sellerId: 102,
  },
  {
    id: 3,
    name: 'Kiwi',
    breed: 'Parakeet',
    type: 'Parrot',
    age: 1,
    gender: Gender.Male,
    location: { city: 'Oakland', state: 'CA' },
    description: 'Kiwi is a cheerful and talkative parakeet. He can mimic a few words and loves to sit on your shoulder.',
    careInstructions: {
      feeding: 'Seed mix, fresh fruits, and vegetables daily.',
      grooming: 'Provide a bird bath for self-grooming.',
      exercise: 'Needs time outside the cage daily in a safe room.',
      medicalNeeds: 'Keep cage clean to prevent illness.',
    },
    photos: ['https://picsum.photos/seed/kiwi/800/600'],
    sellerId: 101,
  },
  {
    id: 4,
    name: 'Thumper',
    breed: 'Holland Lop',
    type: 'Rabbit',
    age: 1,
    gender: Gender.Male,
    location: { city: 'San Jose', state: 'CA' },
    description: 'Thumper is a gentle and curious Holland Lop. He is litter-trained and enjoys being petted.',
    careInstructions: {
      feeding: 'Unlimited timothy hay, fresh greens, and a small amount of pellets.',
      grooming: 'Brush weekly, more during shedding seasons.',
      exercise: 'Several hours of supervised playtime outside his cage.',
      medicalNeeds: 'Nails need regular trimming.',
    },
    photos: ['https://picsum.photos/seed/thumper/800/600'],
    sellerId: 103,
  },
    {
    id: 5,
    name: 'Max',
    breed: 'German Shepherd',
    type: 'Dog',
    age: 4,
    gender: Gender.Male,
    location: { city: 'Palo Alto', state: 'CA' },
    description: 'Max is a loyal and intelligent German Shepherd. He is well-trained and would make a great companion for an active family.',
    careInstructions: {
      feeding: 'Two meals a day, high-protein diet.',
      grooming: 'Regular brushing to manage shedding.',
      exercise: 'Needs plenty of physical and mental stimulation.',
      medicalNeeds: 'Prone to hip dysplasia, regular vet check-ups are important.',
    },
    photos: ['https://picsum.photos/seed/max/800/600'],
    sellerId: 104,
  },
  {
    id: 6,
    name: 'Misty',
    breed: 'Persian',
    type: 'Cat',
    age: 5,
    gender: Gender.Female,
    location: { city: 'Berkeley', state: 'CA' },
    description: 'Misty is a calm and gentle Persian cat with a luxurious long coat. She loves quiet environments and sunbathing.',
    careInstructions: {
      feeding: 'Specialized cat food for long-haired breeds.',
      grooming: 'Daily brushing is essential to prevent matting.',
      exercise: 'Prefers light play with feather wands.',
      medicalNeeds: 'Regular eye cleaning is required.',
    },
    photos: ['https://picsum.photos/seed/misty/800/600'],
    sellerId: 102,
  }
];

const mockUser: User = {
    id: 101,
    fullName: 'Alex Doe',
    location: { city: 'San Francisco', state: 'CA' },
    contactNumber: '555-123-4567',
    shareId: 'alexd-12345',
    listings: [1, 3],
    purchaseHistory: [2],
};

const addRandomDistance = (pets: Pet[]): Pet[] => {
    return pets.map(pet => ({
        ...pet,
        location: {
            ...pet.location,
            distance: Math.floor(Math.random() * 50) + 1 // random distance 1-50 miles
        }
    }));
};

export const getNearbyPets = (): Promise<Pet[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(addRandomDistance(mockPets));
        }, 1000);
    });
};

export const searchPets = (query: string, filters: Record<string, any>): Promise<Pet[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let results = mockPets.filter(pet => {
                const queryLower = query.toLowerCase();
                return (
                    pet.name.toLowerCase().includes(queryLower) ||
                    pet.breed.toLowerCase().includes(queryLower) ||
                    pet.type.toLowerCase().includes(queryLower)
                );
            });
            // Apply more filters here if they exist
            resolve(addRandomDistance(results));
        }, 500);
    });
};


export const getUserProfile = (): Promise<User> => {
     return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockUser);
        }, 500);
    });
}

export const addPetListing = (petData: Omit<Pet, 'id' | 'sellerId'>): Promise<Pet> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newPet: Pet = {
                ...petData,
                id: Math.max(...mockPets.map(p => p.id)) + 1,
                sellerId: mockUser.id,
            };
            mockPets.push(newPet);
            resolve(newPet);
        }, 1000);
    });
}
