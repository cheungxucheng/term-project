const express = require('express');
const router = express.Router();

const products =
    [
        {
            "name": "Golden Retriever Puppy",
            "price": 1200,
            "description": "A playful and affectionate Golden Retriever pup ready for a loving home. Great with kids and other pets."
        },
        {
            "name": "Siberian Husky",
            "price": 1500,
            "description": "Beautiful blue-eyed Husky with a thick coat and boundless energy. Ideal for active families and cold climates."
        },
        {
            "name": "British Shorthair Kitten",
            "price": 900,
            "description": "Chubby-cheeked and calm, this kitten is perfect for indoor living. Known for its plush coat and friendly nature."
        },
        {
            "name": "African Grey Parrot",
            "price": 1300,
            "description": "Highly intelligent and talkative, this parrot can mimic human speech. Needs regular stimulation and attention."
        },
        {
            "name": "Mini Lop Rabbit",
            "price": 80,
            "description": "Soft, floppy-eared, and gentle, ideal for children. Loves to be handled and cuddled."
        },
        {
            "name": "Bengal Cat",
            "price": 1100,
            "description": "Sleek and wild-looking with a leopard-like pattern. Energetic and playful with a love for climbing."
        },
        {
            "name": "Bearded Dragon",
            "price": 150,
            "description": "Docile reptile perfect for beginner exotic pet owners. Thrives in a warm, well-maintained terrarium."
        },
        {
            "name": "Macaw Parrot",
            "price": 2000,
            "description": "Vibrantly colored and charismatic with a strong personality. Requires experienced handling and socialization."
        },
        {
            "name": "Persian Kitten",
            "price": 1000,
            "description": "Fluffy, quiet, and affectionate with a royal demeanor. Needs daily grooming for its luxurious coat."
        },
        {
            "name": "Chihuahua Puppy",
            "price": 700,
            "description": "Small in size but big in attitude. A loyal companion that loves to be pampered."
        },
        {
            "name": "Holland Lop Rabbit",
            "price": 90,
            "description": "Compact and sweet-natured with a charming lopped ear look. Easily litter-trained and loves gentle interaction."
        },
        {
            "name": "Cockatiel",
            "price": 120,
            "description": "Cheerful and friendly bird that whistles and mimics sounds. A great choice for first-time bird owners."
        }
    ];

router.get('/', (req, res) => {
    res.render('storefront', { products });
});

module.exports = router;