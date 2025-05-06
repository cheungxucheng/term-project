const express = require('express');
const router = express.Router();

const products =
    [
        {
            "id": 1,
            "name": "Golden Retriever Puppy",
            "price": 1200,
            "description": "A playful and affectionate Golden Retriever pup ready for a loving home. Great with kids and other pets.",
            "imageUrl": "/images/tempimg.jpg"
        },
        {
            "id": 2,
            "name": "Siberian Husky",
            "price": 1500,
            "description": "Beautiful blue-eyed Husky with a thick coat and boundless energy. Ideal for active families and cold climates.",
            "imageUrl": "/images/tempimg.jpg"
        },
        {
            "id": 3,
            "name": "British Shorthair Kitten",
            "price": 900,
            "description": "Chubby-cheeked and calm, this kitten is perfect for indoor living. Known for its plush coat and friendly nature.",
            "imageUrl": "/images/tempimg.jpg"
        },
        {
            "id": 4,
            "name": "African Grey Parrot",
            "price": 1300,
            "description": "Highly intelligent and talkative, this parrot can mimic human speech. Needs regular stimulation and attention.",
            "imageUrl": "/images/tempimg.jpg"
        },
        {
            "id": 5,
            "name": "Mini Lop Rabbit",
            "price": 80,
            "description": "Soft, floppy-eared, and gentle, ideal for children. Loves to be handled and cuddled.",
            "imageUrl": "/images/tempimg.jpg"
        },
        {
            "id": 6,
            "name": "Bengal Cat",
            "price": 1100,
            "description": "Sleek and wild-looking with a leopard-like pattern. Energetic and playful with a love for climbing.",
            "imageUrl": "/images/tempimg.jpg"
        },
        {
            "id": 7,
            "name": "Bearded Dragon",
            "price": 150,
            "description": "Docile reptile perfect for beginner exotic pet owners. Thrives in a warm, well-maintained terrarium.",
            "imageUrl": "/images/tempimg.jpg"
        },
        {
            "id": 8,
            "name": "Macaw Parrot",
            "price": 2000,
            "description": "Vibrantly colored and charismatic with a strong personality. Requires experienced handling and socialization.",
            "imageUrl": "/images/tempimg.jpg"
        },
        {
            "id": 9,
            "name": "Persian Kitten",
            "price": 1000,
            "description": "Fluffy, quiet, and affectionate with a royal demeanor. Needs daily grooming for its luxurious coat.",
            "imageUrl": "/images/tempimg.jpg"
        },
        {
            "id": 10,
            "name": "Chihuahua Puppy",
            "price": 700,
            "description": "Small in size but big in attitude. A loyal companion that loves to be pampered.",
            "imageUrl": "/images/tempimg.jpg"
        },
        {
            "id": 11,
            "name": "Holland Lop Rabbit",
            "price": 90,
            "description": "Compact and sweet-natured with a charming lopped ear look. Easily litter-trained and loves gentle interaction.",
            "imageUrl": "/images/tempimg.jpg"
        },
        {
            "id": 12,
            "name": "Cockatiel",
            "price": 120,
            "description": "Cheerful and friendly bird that whistles and mimics sounds. A great choice for first-time bird owners.",
            "imageUrl": "/images/tempimg.jpg"
        }
    ];



router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).send('Product not found');
    res.render('product', { product });
});

module.exports = router;