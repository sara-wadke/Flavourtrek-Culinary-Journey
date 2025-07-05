// script.js

// --- Global Variables and DOM Element Caching ---
const DOM = {
    // Header & Navigation
    suitcaseCount: document.getElementById('suitcaseCount'),

    // Spin Page
    wheel: document.getElementById('wheel'),
    spinBtn: document.getElementById('spinBtn'),
    exploreFlavoursBtn: document.getElementById('exploreFlavoursBtn'),

    // Flavours Page
    searchBar: document.getElementById('searchBar'),
    filterTagsContainer: document.getElementById('filterTags'),
    dishGrid: document.getElementById('dishGrid'),
    viewPassportBtn: document.getElementById('viewPassportBtn'),

    // Modal
    resultModal: document.getElementById('resultModal'),
    modalCloseBtn: document.querySelector('.modal-close-btn'),
    modalImage: document.getElementById('modalImage'),
    modalTitle: document.getElementById('modalTitle'),
    modalDescription: document.getElementById('modalDescription'),
    feedbackMessage: document.getElementById('feedbackMessage'),
    optionsContainer: document.getElementById('optionsContainer'),
    recipeContent: document.getElementById('recipeContent'),
    recipeTitle: document.getElementById('recipeTitle'),
    recipeText: document.getElementById('recipeText'),
    modalActionBtn: document.getElementById('modalActionBtn'),

    // Passport Page
    explorerName: document.getElementById('explorerName'),
    dishesCollectedList: document.getElementById('dishesCollectedList'),
    cuisineMilesValue: document.getElementById('cuisineMilesValue'),
    tasteCharacter: document.getElementById('tasteCharacter'),
    moodTagsContainer: document.getElementById('moodTags'),
    downloadPassportBtn: document.getElementById('downloadPassportBtn'),

    // Toast
    toast: document.getElementById('toast')
};

// --- Data Definitions ---
const allDishes = [
    {
        id: 'pizza-margherita',
        name: 'Pizza Margherita',
        origin: 'Italy',
        tasteTags: ['savory', 'comfort', 'cheesy'],
        funFact: 'Named after Queen Margherita of Savoy, symbolizing the Italian flag colors.',
        imageUrl: 'images/pizza.jpg',
        clues: [
            "This dish is a classic from a country famous for its ancient history and art.",
            "It typically features three main colors, representing the flag of its origin.",
            "Often cooked in a wood-fired oven, it’s a global favorite, especially on movie nights.",
            "The simplest version includes tomato, mozzarella, and basil."
        ],
        recipe: `Ingredients:\n- 1 pizza dough\n- 1/2 cup tomato sauce\n- 4 oz fresh mozzarella, sliced\n- Fresh basil leaves\n- Drizzle of olive oil\n\nInstructions:\n1. Preheat oven and pizza stone to 475°F (245°C).\n2. Stretch dough, spread tomato sauce.\n3. Arrange mozzarella and basil.\n4. Bake for 10-15 minutes until crust is golden and cheese is bubbly.\n5. Drizzle with olive oil and serve.`
    },
    {
        id: 'sushi-nigiri',
        name: 'Sushi Nigiri',
        origin: 'Japan',
        tasteTags: ['savory', 'umami', 'street food'],
        funFact: 'The word "sushi" refers to the vinegared rice, not the raw fish.',
        imageUrl: 'images/sushi.jpg',
        clues: [
            "This delicate dish originates from an island nation in East Asia, known for its cherry blossoms and advanced technology.",
            "It often involves raw seafood and specially prepared rice.",
            "Eating this requires chopsticks and can be dipped in soy sauce with wasabi.",
            "It’s typically served in small, bite-sized pieces."
        ],
        recipe: `Ingredients:\n- Sushi rice\n- Nori (seaweed) sheets\n- Fresh fish (e.g., tuna, salmon), sashimi-grade\n- Soy sauce, wasabi, pickled ginger for serving\n\nInstructions:\n1. Prepare sushi rice (cook, then season with vinegar, sugar, salt).\n2. Slice fish thinly.\n3. Moisten hands, form small oval rice balls.\n4. Drape fish over rice, press gently.\n5. Serve immediately with condiments.`
    },
    {
        id: 'tacos-al-pastor',
        name: 'Tacos al Pastor',
        origin: 'Mexico',
        tasteTags: ['spicy', 'street food', 'savory'],
        funFact: 'Inspired by Lebanese immigrants’ shawarma, adapted with pork and pineapple.',
        imageUrl: 'images/taco.jpg',
        clues: [
            "This vibrant dish comes from a North American country famous for mariachi music and ancient pyramids.",
            "It’s often prepared with marinated pork cooked on a vertical spit, similar to Middle Eastern techniques.",
            "Served in a small tortilla, usually with pineapple, onion, and cilantro.",
            "It’s a staple street food, known for its savory and slightly sweet flavor."
        ],
        recipe: `Ingredients:\n- Marinated pork (achiote, chili, pineapple juice)\n- Small corn tortillas\n- Pineapple, onion, cilantro (diced)\n- Lime wedges\n\nInstructions:\n1. Cook marinated pork until tender (traditionally on a vertical spit).\n2. Warm tortillas.\n3. Fill tortillas with pork, pineapple, onion, and cilantro.\n4. Serve with a squeeze of lime.`
    },
    {
        id: 'indian-curry',
        name: 'Indian Curry',
        origin: 'India',
        tasteTags: ['spicy', 'aromatic', 'comfort'],
        funFact: 'The word "curry" is an anglicized term, covering a vast array of stew-like dishes across the Indian subcontinent.',
        imageUrl: 'images/chickentikkamasala.jpg',
        clues: [
            "This flavorful dish hails from a large South Asian country known for its diverse languages and vibrant festivals.",
            "It's characterized by a complex blend of spices, often creating a rich, stew-like consistency.",
            "Typically served with rice or bread like naan.",
            "It can be vegetarian or contain various meats, with a wide range of spice levels."
        ],
        recipe: `Ingredients:\n- 1 tbsp oil\n- 1 onion, chopped\n- 2 cloves garlic, minced\n- 1 inch ginger, grated\n- 1 tsp cumin powder\n- 1 tsp coriander powder\n- 1/2 tsp turmeric powder\n- 1/2 tsp chili powder (adjust to taste)\n- 1 can (14 oz) crushed tomatoes\n- 1 cup coconut milk or cream\n- 1 lb chicken or mixed vegetables, cut into pieces\n- Salt to taste\n- Fresh cilantro for garnish\n\nInstructions:\n1. Heat oil in a large pot or pan over medium heat.\n2. Add onion and cook until softened, about 5-7 minutes.\n3. Add garlic and ginger, cook for 1 minute until fragrant.\n4. Stir in cumin, coriander, turmeric, and chili powder. Cook for 30 seconds until fragrant.\n5. Add crushed tomatoes and bring to a simmer. Cook for 5-7 minutes, stirring occasionally.\n6. Stir in coconut milk/cream and chicken/vegetables. Bring to a gentle simmer.\n7. Cover and cook for 15-20 minutes, or until chicken is cooked through and vegetables are tender.\n8. Season with salt. Garnish with fresh cilantro before serving. Serve hot with rice or naan.`
    },
    {
        id: 'french-croissant',
        name: 'French Croissant',
        origin: 'France',
        tasteTags: ['sweet', 'breakfast', 'comfort'],
        funFact: 'Despite its French icon status, the croissant actually originated in Austria as the kipferl.',
        imageUrl: 'images/frenchcroissant.jpg',
        clues: [
            "This flaky, buttery pastry is a breakfast staple from a Western European country renowned for its elegant cuisine and fashion.",
            "It's famously crescent-shaped and known for its delicate layers.",
            "Often enjoyed with coffee or jam.",
            "Its name in English literally means 'crescent'."
        ],
        recipe: `Ingredients:\n- Puff pastry dough (store-bought or homemade)\n- 1 egg (for egg wash)\n\nInstructions:\n1. Roll out puff pastry thinly into a large rectangle.\n2. Cut into triangles.\n3. Starting from the wide base, roll each triangle towards the tip to form a crescent shape.\n4. Place on a baking sheet, curve ends inward to enhance crescent.\n5. Brush with egg wash.\n6. Bake at 400°F (200°C) for 12-15 minutes, until golden brown and puffed. Serve warm.`
    },
    {
        id: 'ramen',
        name: 'Ramen',
        origin: 'Japan',
        tasteTags: ['savory', 'soup', 'comfort'],
        funFact: 'There are countless regional variations of ramen in Japan, each with unique broths and toppings.',
        imageUrl: 'images/ramen.jpg',
        clues: [
            "This hearty noodle soup originates from an East Asian country known for its unique blend of tradition and modernity.",
            "It features wheat noodles served in a meat or fish-based broth, often flavored with soy sauce or miso.",
            "Commonly topped with sliced pork, nori, green onions, and a soft-boiled egg.",
            "It’s a popular comfort food, especially in colder weather."
        ],
        recipe: `Ingredients:\n- 4 cups chicken or pork broth\n- 2 tbsp soy sauce\n- 1 tbsp miso paste (optional)\n- 1 block ramen noodles\n- Sliced cooked pork or chicken\n- Soft-boiled egg, halved\n- Nori seaweed, green onions, corn (for toppings)\n\nInstructions:\n1. Heat broth in a pot. Stir in soy sauce and miso paste until dissolved.\n2. Cook ramen noodles according to package directions.\n3. Divide noodles into bowls, pour hot broth over.\n4. Arrange toppings over noodles.\n5. Serve immediately.`
    },
    {
        id: 'pad-thai',
        name: 'Pad Thai',
        origin: 'Thailand',
        tasteTags: ['sweet', 'spicy', 'street food'],
        funFact: 'Pad Thai was popularized in Thailand during World War II as part of a nationalistic campaign to promote Thai identity and rice consumption.',
        imageUrl: 'images/padthai.jpg',
        clues: [
            "This popular stir-fried noodle dish comes from a Southeast Asian country famous for its beautiful temples and beaches.",
            "It combines rice noodles with eggs, tofu or shrimp, peanuts, and a sweet, savory, and sour sauce.",
            "Often garnished with fresh lime and bean sprouts.",
            "It's a staple in street food markets worldwide."
        ],
        recipe: `Ingredients:\n- Rice noodles\n- Shrimp or chicken\n- Tofu, egg\n- Bean sprouts, chives, peanuts\n- Pad Thai sauce (tamarind, fish sauce, sugar)\n\nInstructions:\n1. Cook noodles. Sauté protein, tofu, and egg.\n2. Add noodles and sauce, stir-fry until combined.\n3. Stir in bean sprouts and chives.\n4. Garnish with crushed peanuts and lime.`
    },
    {
        id: 'samosa',
        name: 'Samosa',
        origin: 'India',
        tasteTags: ['savory', 'spicy', 'snacks'],
        funFact: 'Samosas are believed to have originated in the Middle East and Central Asia before making their way to India.',
        imageUrl: 'images/samosa.jpg',
        clues: [
            "This fried or baked pastry with a savory filling is a popular snack from South Asia.",
            "It's typically triangular in shape.",
            "Fillings often include spiced potatoes, peas, onions, or lentils.",
            "Often served with chutney."
        ],
        recipe: `Ingredients:\n- Samosa wrappers or pastry dough\n- Potatoes, boiled and mashed\n- Peas\n- Spices (cumin, coriander, turmeric, chili)\n- Oil for frying\n\nInstructions:\n1. Prepare filling by sautéing spices, then mixing with mashed potatoes and peas.\n2. Fill wrappers with mixture, fold into triangles, and seal.\n3. Deep-fry or bake until golden brown and crispy.\n4. Serve hot with chutney.`
    },
    {
        id: 'dumplings',
        name: 'Dumplings',
        origin: 'China',
        tasteTags: ['savory', 'comfort', 'street food'],
        funFact: 'Dumplings are a symbol of wealth and good fortune in China because their shape resembles ancient Chinese money purses.',
        imageUrl: 'images/dumplings.jpg',
        clues: [
            "This dish consists of pieces of dough wrapped around a filling, popular in an East Asian country with a very long history.",
            "They can be boiled, steamed, pan-fried, or deep-fried.",
            "Fillings vary widely but often include minced meat (pork, chicken) and vegetables (cabbage, chives).",
            "Often served with a dipping sauce made of soy sauce, vinegar, and chili oil."
        ],
        recipe: `Ingredients:\n- Dumpling wrappers\n- Ground pork or chicken\n- Napa cabbage, finely chopped\n- Ginger, garlic, soy sauce, sesame oil\n\nInstructions:\n1. Mix filling ingredients.\n2. Place a small amount of filling in the center of each wrapper.\n3. Fold and pleat the edges to seal.\n4. Boil, steam, or pan-fry until cooked through and golden (if pan-frying).\n5. Serve with dipping sauce.`
    },
    {
        id: 'paella',
        name: 'Paella',
        origin: 'Spain',
        tasteTags: ['savory', 'festive', 'aromatic'],
        funFact: 'Authentic Valencian paella does not contain seafood; it’s made with chicken, rabbit, and sometimes snails and beans.',
        imageUrl: 'images/paella.jpg',
        clues: [
            "This rice dish originates from a country on the Iberian Peninsula, famous for flamenco and bullfighting.",
            "It's traditionally cooked in a wide, shallow pan over an open fire.",
            "Key ingredients include saffron (giving it a golden color), rice, and various meats, seafood, or vegetables.",
            "It's often a celebratory dish, prepared for gatherings."
        ],
        recipe: `Ingredients:\n- Arborio or bomba rice\n- Saffron threads\n- Chicken or seafood (shrimp, mussels)\n- Bell peppers, peas, onion, garlic\n- Chicken or fish broth\n- Olive oil\n\nInstructions:\n1. Sauté meats/seafood and vegetables in olive oil in a paella pan.\n2. Add rice and saffron, stir for a minute.\n3. Pour in hot broth, bring to a simmer.\n4. Cook, uncovered, until liquid is absorbed and rice is tender (do not stir).\n5. Cover and let rest before serving.`
    },
    {
        id: 'fish-and-chips',
        name: 'Fish and Chips',
        origin: 'United Kingdom',
        tasteTags: ['savory', 'comfort', 'snacks'],
        funFact: 'Fish and chips became a staple take-away meal in the UK due to the rapid development of the trawl fishing industry in the 19th century.',
        imageUrl: 'images/fc.jpg',
        clues: [
            "This classic takeaway dish comes from an island nation in Western Europe, known for its royal family and red telephone booths.",
            "It consists of battered and deep-fried white fish served with thick-cut fried potatoes.",
            "Often seasoned with salt and vinegar.",
            "A popular meal for seaside towns and casual dining."
        ],
        recipe: `Ingredients:\n- White fish fillets (cod, haddock)\n- All-purpose flour, baking powder, salt\n- Cold sparkling water or beer (for batter)\n- Potatoes (for chips)\n- Oil for deep frying\n\nInstructions:\n1. Prepare chips: cut potatoes into thick fries, blanch, then fry until golden.\n2. Prepare batter: mix flour, baking powder, salt, and cold liquid until smooth.\n3. Dip fish fillets into batter, ensuring full coverage.\n4. Deep-fry fish until golden brown and cooked through.\n5. Serve hot with chips, salt, and vinegar.`
    },
    {
        id: 'goulash',
        name: 'Goulash',
        origin: 'Hungary',
        tasteTags: ['savory', 'comfort', 'soup'],
        funFact: 'Goulash is one of the national dishes of Hungary and evolved from stews cooked by Hungarian shepherds.',
        imageUrl: 'images/goulash.jpg',
        clues: [
            "This rich, hearty stew or soup originates from a Central European country known for its thermal baths and paprika.",
            "Its defining spice is paprika, which gives it a vibrant color and distinctive flavor.",
            "Often made with beef, onions, and potatoes or noodles.",
            "A warming dish, especially popular in colder climates."
        ],
        recipe: `Ingredients:\n- 1.5 lb beef chuck, cubed\n- 2 large onions, chopped\n- 3 cloves garlic, minced\n- 3 tbsp sweet paprika\n- 1 tsp caraway seeds (optional)\n- 1 can (14 oz) diced tomatoes\n- 4 cups beef broth\n- 2 potatoes, cubed (optional)\n- Sour cream or fresh parsley for garnish\n\nInstructions:\n1. Brown beef cubes in oil in a large pot. Remove beef.\n2. Sauté onions until softened. Add garlic, paprika, and caraway, cook briefly.\n3. Return beef to pot, add diced tomatoes and beef broth. Bring to a simmer.\n4. Cover and cook for 1.5-2 hours until beef is tender. Add potatoes if using, and cook until tender.\n5. Serve hot, garnished with sour cream or parsley.`
    },
    {
        id: 'pho',
        name: 'Pho',
        origin: 'Vietnam',
        tasteTags: ['aromatic', 'soup', 'savory'],
        funFact: 'Pho is thought to have evolved from Chinese and French culinary influences in Vietnam in the early 20th century.',
        imageUrl: 'images/pho.jpg',
        clues: [
            "This aromatic noodle soup is a national dish from a Southeast Asian country with a long coastline.",
            "It features clear broth, rice noodles, herbs, and thinly sliced meat (beef or chicken).",
            "The broth is typically simmered for hours with spices like star anise, cinnamon, and cloves.",
            "Often served with a side of fresh herbs, lime, and chili for customization."
        ],
        recipe: `Ingredients:\n- Beef or chicken bones (for broth)\n- Rice noodles\n- Thinly sliced beef or chicken\n- Ginger, onion, star anise, cinnamon stick, cloves (for broth spices)\n- Fish sauce, sugar\n- Fresh herbs (basil, cilantro, mint), bean sprouts, lime, chili (for serving)\n\nInstructions:\n1. Prepare broth: roast bones and spices, then simmer with water for several hours.\n2. Strain broth, season with fish sauce and sugar.\n3. Cook rice noodles according to package directions.\n4. Arrange noodles in a bowl, top with raw sliced meat (it will cook in the hot broth).\n5. Pour hot broth over, garnish with fresh herbs and condiments.`
    },
    {
        id: 'churros',
        name: 'Churros',
        origin: 'Spain',
        tasteTags: ['sweet', 'snacks', 'dessert'],
        funFact: 'Churros are said to have been invented by nomadic Spanish shepherds who could easily fry them in a pan over a fire.',
        imageUrl: 'images/churros.jpg',
        clues: [
            "This fried-dough pastry snack comes from a European country known for its vibrant culture and passion for dance.",
            "They are typically ridged, long, and fried until crispy.",
            "Often dusted with sugar and cinnamon.",
            "Traditionally served for breakfast or a snack, often dipped in thick hot chocolate."
        ],
        recipe: `Ingredients:\n- 1 cup water\n- 2 tbsp sugar\n- 1/2 tsp salt\n- 1/4 cup butter\n- 1 cup all-purpose flour\n- 2 large eggs\n- Oil for frying\n- Cinnamon sugar for coating\n\nInstructions:\n1. Combine water, sugar, salt, and butter in a saucepan; bring to a boil.\n2. Remove from heat, stir in flour until a ball forms.\n3. Beat in eggs one at a time until dough is smooth.\n4. Transfer dough to a piping bag with a star tip.\n5. Pipe 4-6 inch strips into hot oil (375°F/190°C).\n6. Fry until golden brown and crispy. Drain on paper towels.\n7. Toss in cinnamon sugar and serve warm, optionally with chocolate dipping sauce.`
    },
    {
        id: 'khao-phat',
        name: 'Khao Phat (Thai Fried Rice)',
        origin: 'Thailand',
        tasteTags: ['savory', 'comfort', 'street food'],
        funFact: 'The hallmark of good Khao Phat is perfectly separated rice grains, not clumpy ones.',
        imageUrl: 'images/khaophat.jpg',
        clues: [
            "This popular rice dish originates from a country in Southeast Asia, known for its delicious street food and vibrant markets.",
            "It's a stir-fried rice dish, typically made with jasmine rice, egg, onion, and a protein.",
            "Seasoned with fish sauce, soy sauce, and sometimes a touch of sugar.",
            "Often served with cucumber slices, lime, and chili on the side."
        ],
        recipe: `Ingredients:\n- 3 cups cooked jasmine rice (preferably day-old)\n- 2 tbsp vegetable oil\n- 1 egg, beaten\n- 1/2 onion, finely chopped\n- 2 cloves garlic, minced\n- Protein (e.g., chicken, shrimp, or tofu), cooked and diced\n- 1 tbsp fish sauce\n- 1 tbsp soy sauce\n- 1 tsp sugar\n- White pepper to taste\n- Green onions, sliced cucumber, lime wedges for garnish\n\nInstructions:\n1. Heat oil in a large wok or pan over high heat.\n2. Add egg and scramble until just set. Remove and set aside.\n3. Add onion and garlic to the pan, stir-fry until fragrant.\n4. Add protein and cook for 1-2 minutes.\n5. Add cooked rice, breaking up any clumps. Stir-fry for 3-5 minutes.\n6. Push rice to one side, add fish sauce, soy sauce, and sugar to the empty side, let it bubble for a few seconds, then mix with rice.\n7. Stir in scrambled egg and green onions. Continue stir-frying for another 1-2 minutes until everything is well combined and heated through.\n8. Season with white pepper. Serve hot with sliced cucumber and lime wedges.`
    },
    {
        id: 'pierogi',
        name: 'Pierogi',
        origin: 'Poland',
        tasteTags: ['savory', 'comfort', 'cheesy'],
        funFact: 'Pierogi are traditional Polish dumplings, often served during holidays and celebrations, but also as an everyday meal.',
        imageUrl: 'images/pierogi.jpg',
        clues: [
            "This popular dish comes from a Central European country, known for its historical cities and medieval castles.",
            "They are filled dumplings that can be savory or sweet.",
            "Common savory fillings include potato and cheese, sauerkraut and mushroom, or minced meat.",
            "Often boiled, then pan-fried with butter and onions, and served with sour cream."
        ],
        recipe: `Ingredients:\n- Pierogi dough (flour, egg, water)\n- Filling (e.g., mashed potatoes and farmer's cheese)\n- Butter and onions for frying\n- Sour cream for serving\n\nInstructions:\n1. Roll out dough thinly and cut into circles.\n2. Place a spoonful of filling on each circle, fold in half, and crimp edges to seal.\n3. Boil pierogi in salted water until they float to the top and are cooked through.\n4. Optionally, pan-fry boiled pierogi in butter with chopped onions until golden.\n5. Serve hot with sour cream.`
    },
    {
        id: 'baklava',
        name: 'Baklava',
        origin: 'Turkey',
        tasteTags: ['sweet', 'dessert', 'aromatic'],
        funFact: 'Baklava has a long history, with its origins tracing back to the Ottoman Empire, and variations found across the Middle East and Balkans.',
        imageUrl: 'images/baklava.jpg',
        clues: [
            "This rich, sweet pastry comes from a country straddling Europe and Asia, famous for its grand bazaars and ancient ruins.",
            "It is made of layers of filo pastry filled with chopped nuts, sweetened with syrup or honey.",
            "Often cut into diamond or triangle shapes.",
            "A popular dessert during festive occasions and celebrations."
        ],
        recipe: `Ingredients:\n- Phyllo dough sheets\n- Chopped pistachios or walnuts\n- Unsalted butter, melted\n- Syrup (sugar, water, honey, lemon juice, orange blossom water)\n\nInstructions:\n1. Brush a baking pan with melted butter. Layer half the phyllo sheets, brushing each with butter.\n2. Spread chopped nuts evenly over the phyllo.\n3. Layer remaining phyllo sheets, brushing each with butter.\n4. Score the baklava into diamond or square shapes before baking.\n5. Bake at 350°F (175°C) until golden and crispy.\n6. Pour cooled syrup over hot baklava immediately after baking. Let soak before serving.`
    },
    {
        id: 'kimchi-jjigae',
        name: 'Kimchi Jjigae',
        origin: 'South Korea',
        tasteTags: ['spicy', 'comfort', 'soup'],
        funFact: 'Kimchi jjigae is a staple Korean stew, often made with aged kimchi for a deeper flavor profile.',
        imageUrl: 'images/kimchi-jjigae.jpg',
        clues: [
            "This spicy and savory stew is a popular comfort food from an East Asian country known for K-Pop and advanced technology.",
            "Its main ingredient is fermented cabbage, which gives it a distinctive sour and spicy kick.",
            "Often includes tofu, pork or other meats, and vegetables.",
            "Typically served bubbling hot in a stone pot with a bowl of rice."
        ],
        recipe: `Ingredients:\n- 1 cup aged kimchi, chopped\n- 1/2 lb pork belly or shoulder, sliced\n- 1/2 onion, sliced\n- 1 block firm tofu, sliced\n- 2 cups anchovy broth or water\n- 1 tbsp gochujang (Korean chili paste)\n- 1 tsp gochugaru (Korean chili powder)\n- Green onions for garnish\n\nInstructions:\n1. Sauté kimchi and pork belly in a pot until pork is browned.\n2. Add onion, gochujang, and gochugaru, stir-fry briefly.\n3. Pour in broth, bring to a boil, then reduce heat and simmer for 10-15 minutes.\n4. Add tofu and cook for another 5 minutes.\n5. Garnish with green onions and serve hot with rice.`
    },
    {
        id: 'poutine',
        name: 'Poutine',
        origin: 'Canada',
        tasteTags: ['savory', 'comfort', 'cheesy', 'snacks'],
        funFact: 'Poutine originated in rural Quebec in the late 1950s and is now a Canadian culinary icon.',
        imageUrl: 'images/poutine.jpg',
        clues: [
            "This indulgent dish comes from a large North American country known for its maple syrup and polite reputation.",
            "It consists of three main components: french fries, cheese curds, and gravy.",
            "The hot gravy melts the cheese curds slightly, creating a unique texture.",
            "It's a popular late-night snack or comfort food."
        ],
        recipe: `Ingredients:\n- French fries\n- Cheese curds\n- Hot beef or chicken gravy\n\nInstructions:\n1. Prepare french fries (deep-fry or bake).\n2. Place hot fries in a serving bowl.\n3. Scatter a generous amount of fresh cheese curds over the hot fries.\n4. Ladle hot gravy over the fries and cheese curds. The heat from the gravy should slightly melt the curds.\n5. Serve immediately.`
    },
    {
        id: 'sopa-de-tortilla',
        name: 'Sopa de Tortilla (Tortilla Soup)',
        origin: 'Mexico',
        tasteTags: ['spicy', 'soup', 'comfort'],
        funFact: 'Traditional Sopa de Tortilla features a rich tomato and chili broth, often thickened with masa (corn dough) for body.',
        imageUrl: 'images/sopa-de-tortilla.jpg',
        clues: [
            "This flavorful soup comes from a Latin American country known for its vibrant festivals and ancient civilizations.",
            "Its base is typically made from roasted tomatoes, garlic, onion, and chiles.",
            "Key toppings include crispy fried tortilla strips, avocado, cheese, and sometimes crema.",
            "A hearty and comforting soup, especially popular during colder months."
        ],
        recipe: `Ingredients:\n- 6-8 corn tortillas, cut into strips\n- Oil for frying\n- 1 tbsp olive oil\n- 1/2 onion, chopped\n- 2 cloves garlic, minced\n- 1 (14.5 oz) can diced tomatoes, undrained\n- 4 cups chicken broth\n- 1 dried pasilla or ancho chile, rehydrated and seeded\n- 1/2 tsp cumin\n- Salt to taste\n- Toppings: avocado, shredded cheese, sour cream, cilantro\n\nInstructions:\n1. Fry tortilla strips in hot oil until crispy. Drain and set aside.\n2. In a pot, sauté onion and garlic. Add tomatoes, broth, rehydrated chile, and cumin. Simmer for 15-20 minutes.\n3. Remove chile, blend soup until smooth. Return to pot, season with salt.\n4. Serve hot, topped with crispy tortilla strips, avocado, cheese, sour cream, and cilantro.`
    },
    {
        id: 'falafel',
        name: 'Falafel',
        origin: 'Middle East',
        tasteTags: ['savory', 'snacks', 'street food'],
        funFact: 'Falafel is widely consumed throughout the Middle East, with claims of its origin debated among various countries in the region.',
        imageUrl: 'images/falafel.jpg',
        clues: [
            "These deep-fried balls or patties are a common street food and snack from the Middle East.",
            "They are made from ground chickpeas or fava beans, mixed with herbs and spices.",
            "Often served in a pita bread with salads, pickles, and tahini sauce.",
            "A popular vegetarian and vegan option."
        ],
        recipe: `Ingredients:\n- 1 cup dried chickpeas, soaked overnight (do not cook)\n- 1/2 onion, roughly chopped\n- 2 cloves garlic\n- Fresh parsley and cilantro\n- 1 tsp cumin, 1 tsp coriander, 1/2 tsp baking soda\n- Salt and pepper to taste\n- Oil for deep frying\n\nInstructions:\n1. Drain soaked chickpeas. Blend chickpeas, onion, garlic, herbs, and spices until coarsely ground (do not over-process into a paste).\n2. Stir in baking soda, salt, and pepper. Form into small patties or balls.\n3. Deep-fry in hot oil (350°F/175°C) until golden brown and crispy.\n4. Serve hot, often in pita bread with tahini sauce and vegetables.`
    }
];

const wheelSegments = allDishes; // Wheel segments are the same as all dishes for now
const cluesData = allDishes; // Clues are part of the dish data
const wheelColors = [
    'var(--color-primary-light)',
    'var(--color-accent)',
    'var(--color-primary)',
    'var(--color-background-card)',
    '#f9f9e0',
    '#dbe7e7',
    '#ffe0b2',
    '#c8e6c9',
    '#e0e0f2', // Light purple-blue
    '#ffecb3', // Light orange
    '#b2ebf2', // Light cyan
    '#f5e5cc', // Light cream
    '#e1f5fe', // Lighter blue
    '#d1c4e9', // Lavender
    '#ffccbc', // Light salmon
    '#dcedc8'  // Light green
];


// Filter tags for the Flavours page
// UPDATED: Reduced filter tags as per request
const allFilterTags = [
    'All',
    'Savory',
    'Snacks',
    'Soup',
    'Spicy',
    'Street Food',
    'Sweet',
    'Festive',
    'Breakfast'
];


// --- Helper Functions ---

function showToast(message, duration = 3000) {
    DOM.toast.textContent = message;
    DOM.toast.classList.add('show');
    setTimeout(() => {
        DOM.toast.classList.remove('show');
    }, duration);
}

function getSuitcase() {
    try {
        const suitcase = JSON.parse(localStorage.getItem('flavourTrekSuitcase')) || [];
        return suitcase;
    } catch (e) {
        console.error("Error parsing suitcase from localStorage:", e);
        return []; // Return empty array on error
    }
}

function saveSuitcase(suitcase) {
    localStorage.setItem('flavourTrekSuitcase', JSON.stringify(suitcase));
    updateSuitcaseCount(); // Update count whenever suitcase changes
}

function addDishToSuitcase(dish) {
    let suitcase = getSuitcase();
    if (!suitcase.some(item => item.id === dish.id)) {
        suitcase.push(dish);
        saveSuitcase(suitcase);
        showToast(`${dish.name} added to your Passport!`);
        updateDishCardState(dish.id, true); // Update card state if on flavours page
        return true;
    } else {
        showToast(`${dish.name} is already in your Passport!`, 2000);
        return false;
    }
}

function removeDishFromSuitcase(dishId) {
    let suitcase = getSuitcase();
    const initialLength = suitcase.length;
    suitcase = suitcase.filter(item => item.id !== dishId);
    if (suitcase.length < initialLength) {
        saveSuitcase(suitcase);
        showToast('Dish removed from Passport.');
        updateDishCardState(dishId, false); // Update card state if on flavours page
        // If on passport page, re-render to reflect removal
        if (document.body.classList.contains('page-passport')) {
            loadPassport();
        }
        return true;
    }
    return false;
}

function updateSuitcaseCount() {
    const suitcase = getSuitcase();
    if (DOM.suitcaseCount) {
        DOM.suitcaseCount.textContent = suitcase.length;
    }
}

// Function to update the 'added' class on dish cards on the flavours page
function updateDishCardState(dishId, isAdded) {
    const dishCard = document.querySelector(`.dish-card[data-id="${dishId}"]`);
    if (dishCard) {
        if (isAdded) {
            dishCard.classList.add('added');
        } else {
            dishCard.classList.remove('added');
        }
    }
}

// --- Modal Functions (Shared) ---
let currentDish = null; // Store the currently displayed dish in the modal

function showModal() {
    DOM.resultModal.classList.add('visible');
    document.body.classList.add('modal-open');
}

function hideModal() {
    DOM.resultModal.classList.remove('visible');
    document.body.classList.remove('modal-open');
    // Reset modal content for next use
    DOM.optionsContainer.innerHTML = '';
    DOM.feedbackMessage.textContent = '';
    DOM.feedbackMessage.classList.remove('correct', 'incorrect');
    DOM.recipeContent.classList.add('hidden');
    DOM.optionsContainer.classList.remove('hidden'); // Ensure options are visible by default
    DOM.modalActionBtn.classList.add('hidden'); // Hide action button by default
}

// --- Spin Page Logic (index.html) ---
if (document.body.classList.contains('page-spin')) {

    // UPDATED: renderWheel function
    function renderWheel() {
        DOM.wheel.innerHTML = ''; // Clear previous segments
        const numSegments = allDishes.length;
        const anglePerSegment = 360 / numSegments;

        allDishes.forEach((dish, index) => {
            const segment = document.createElement('div');
            segment.classList.add('segment');

            // Calculate rotation for each segment
            const rotation = anglePerSegment * index;
            segment.style.transform = `rotate(${rotation}deg) skewY(-${90 - anglePerSegment}deg)`;
            segment.style.backgroundColor = wheelColors[index % wheelColors.length]; // Apply color from array

            // Create inner content for the segment (dish name)
            const segmentContent = document.createElement('div');
            segmentContent.classList.add('segment-content');
            // Counter-rotate text: skewY to un-skew the text, then rotate to align it horizontally
            segmentContent.style.transform = `skewY(${90 - anglePerSegment}deg) rotate(${anglePerSegment / 2}deg)`;
            segmentContent.textContent = dish.name; // Display dish name

            segment.appendChild(segmentContent);
            DOM.wheel.appendChild(segment);
        });
    }


    function spinWheel() {
        DOM.spinBtn.disabled = true;
        DOM.wheel.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0, 1.0)'; // Apply transition
        const randomIndex = Math.floor(Math.random() * allDishes.length);
        const selectedDish = allDishes[randomIndex];
        currentDish = selectedDish; // Set currentDish for the modal
        const totalRotation = (5 * 360) + (360 - (randomIndex * (360 / allDishes.length)) - (360 / allDishes.length) / 2);

        DOM.wheel.style.transform = `rotate(${totalRotation}deg)`;

        // After the spin animation ends
        DOM.wheel.addEventListener('transitionend', () => {
            DOM.spinBtn.disabled = false;
            // Reset transition for next spin (or it accumulates)
            DOM.wheel.style.transition = 'none';
            // Adjust to the minimal rotation needed for the current position, so next spin starts cleanly
            DOM.wheel.style.transform = `rotate(${totalRotation % 360}deg)`;

            showClueModal(currentDish);
        }, { once: true }); // Ensure event listener runs only once
    }

    function showClueModal(dish) {
        showModal();
        DOM.modalImage.src = dish.imageUrl;
        DOM.modalImage.alt = dish.name;
        DOM.modalTitle.textContent = 'Guess the Dish!';
        DOM.modalDescription.textContent = dish.clues[0]; // Start with the first clue
        DOM.recipeContent.classList.add('hidden'); // Hide recipe initially
        DOM.optionsContainer.classList.remove('hidden'); // Show options

        DOM.modalActionBtn.classList.remove('hidden');
        DOM.modalActionBtn.textContent = 'Get Recipe';
        DOM.modalActionBtn.onclick = () => showRecipeDetails(dish);

        renderClueOptions(dish);
    }

    let currentClueIndex = 0; // Track which clue is displayed

    function renderClueOptions(dish) {
        DOM.optionsContainer.innerHTML = '';
        DOM.feedbackMessage.textContent = '';
        DOM.feedbackMessage.classList.remove('correct', 'incorrect');
        DOM.modalDescription.textContent = dish.clues[currentClueIndex];

        // Generate 3 random incorrect options + the correct one
        let incorrectOptions = allDishes.filter(d => d.id !== dish.id);
        const shuffledIncorrect = incorrectOptions.sort(() => 0.5 - Math.random()).slice(0, 2); // Get 2 random incorrect
        const options = [...shuffledIncorrect, dish].sort(() => 0.5 - Math.random()); // Mix in correct, then shuffle

        options.forEach(option => {
            const btn = document.createElement('button');
            btn.classList.add('btn', 'secondary-btn', 'option-btn');
            btn.textContent = option.name;
            btn.onclick = () => checkAnswer(option, dish);
            DOM.optionsContainer.appendChild(btn);
        });

        // Add a "Next Clue" button if not the last clue
        if (currentClueIndex < dish.clues.length - 1) {
            const nextClueBtn = document.createElement('button');
            nextClueBtn.classList.add('btn', 'secondary-btn', 'option-btn');
            nextClueBtn.textContent = 'Next Clue';
            nextClueBtn.onclick = () => {
                currentClueIndex++;
                renderClueOptions(dish);
            };
            DOM.optionsContainer.appendChild(nextClueBtn);
        }
    }

    function checkAnswer(selectedOption, correctDish) {
        DOM.optionsContainer.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true); // Disable all options

        if (selectedOption.id === correctDish.id) {
            DOM.feedbackMessage.textContent = 'Correct! Great job!';
            DOM.feedbackMessage.classList.add('correct');
            DOM.modalActionBtn.classList.remove('hidden'); // Show Get Recipe button
            currentClueIndex = 0; // Reset for next spin
        } else {
            DOM.feedbackMessage.textContent = `Incorrect. It was ${correctDish.name}.`;
            DOM.feedbackMessage.classList.add('incorrect');
            DOM.modalActionBtn.classList.remove('hidden'); // Show Get Recipe button
            currentClueIndex = 0; // Reset for next spin
        }
    }

    function showRecipeDetails(dish) {
        DOM.recipeTitle.textContent = `Recipe: ${dish.name}`;
        DOM.recipeText.textContent = dish.recipe;
        DOM.recipeContent.classList.remove('hidden'); // Show recipe content
        DOM.optionsContainer.classList.add('hidden'); // Hide options
        DOM.modalDescription.textContent = dish.funFact; // Display fun fact instead of clue

        // Change action button to 'Add to Passport'
        const isAdded = getSuitcase().some(item => item.id === dish.id);
        DOM.modalActionBtn.textContent = isAdded ? 'Added to Passport' : 'Add to Passport';
        DOM.modalActionBtn.disabled = isAdded;
        DOM.modalActionBtn.onclick = () => {
            addDishToSuitcase(dish);
            DOM.modalActionBtn.textContent = 'Added to Passport';
            DOM.modalActionBtn.disabled = true;
        };
    }

    // Event Listeners for Spin Page
    if (DOM.spinBtn) {
        DOM.spinBtn.addEventListener('click', spinWheel);
    }
    if (DOM.exploreFlavoursBtn) {
        DOM.exploreFlavoursBtn.addEventListener('click', () => {
            window.location.href = 'flavours.html';
        });
    }

    // Initial render
    renderWheel();
}

// --- Flavours Page Logic (flavours.html) ---
if (document.body.classList.contains('page-flavours')) {

    let activeFilter = 'All'; // Track the currently active filter tag
    let currentSearchQuery = ''; // Track the current search query

    function displayDishes(dishesToDisplay) {
        DOM.dishGrid.innerHTML = ''; // Clear existing dishes

        dishesToDisplay.forEach(dish => {
            const isAdded = getSuitcase().some(item => item.id === dish.id);
            const dishCard = document.createElement('div');
            dishCard.classList.add('dish-card');
            if (isAdded) {
                dishCard.classList.add('added');
            }
            dishCard.dataset.id = dish.id; // Store dish ID for easy lookup

            dishCard.innerHTML = `
                <img src="${dish.imageUrl}" alt="${dish.name}">
                <div class="card-content">
                    <h3 class="dish-title">${dish.name}</h3>
                    <p class="dish-origin">Origin: ${dish.origin}</p>
                    <p class="taste-tags">Taste: ${dish.tasteTags.map(tag => `<span class="tag">${tag}</span>`).join(', ')}</p>
                    <p class="fun-fact">${dish.funFact}</p>
                    <div class="card-buttons">
                        <button class="btn primary-btn add-btn">${isAdded ? 'Added to Passport' : 'Add to Passport'}</button>
                        <button class="btn secondary-btn remove-btn">Remove from Passport</button>
                    </div>
                </div>
            `;
            DOM.dishGrid.appendChild(dishCard);

            // Add event listeners for buttons within the card
            const addBtn = dishCard.querySelector('.add-btn');
            const removeBtn = dishCard.querySelector('.remove-btn');

            addBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click event
                addDishToSuitcase(dish);
                addBtn.textContent = 'Added to Passport';
                addBtn.disabled = true;
            });

            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click event
                removeDishFromSuitcase(dish.id);
                // When removed, enable add button again and change text
                addBtn.textContent = 'Add to Passport';
                addBtn.disabled = false;
            });


            // Click entire card to show modal (for recipe/details)
            dishCard.addEventListener('click', () => {
                showModal();
                DOM.modalImage.src = dish.imageUrl;
                DOM.modalImage.alt = dish.name;
                DOM.modalTitle.textContent = dish.name;
                DOM.modalDescription.textContent = dish.funFact; // Show fun fact directly
                DOM.optionsContainer.classList.add('hidden'); // Hide options for flavour page modal

                DOM.recipeContent.classList.remove('hidden'); // Show recipe
                DOM.recipeTitle.textContent = `Recipe: ${dish.name}`;
                DOM.recipeText.textContent = dish.recipe;

                // Configure modal action button for "Add to Passport"
                const isCurrentAdded = getSuitcase().some(item => item.id === dish.id);
                DOM.modalActionBtn.classList.remove('hidden');
                DOM.modalActionBtn.textContent = isCurrentAdded ? 'Added to Passport' : 'Add to Passport';
                DOM.modalActionBtn.disabled = isCurrentAdded;
                DOM.modalActionBtn.onclick = () => {
                    addDishToSuitcase(dish);
                    DOM.modalActionBtn.textContent = 'Added to Passport';
                    DOM.modalActionBtn.disabled = true;
                    // Also update the card's state immediately
                    updateDishCardState(dish.id, true);
                };
            });
        });
    }

    function filterAndSearchDishes() {
        let filtered = allDishes;

        // Apply filter tag
        if (activeFilter !== 'All') {
            filtered = filtered.filter(dish => dish.tasteTags.includes(activeFilter.toLowerCase()));
        }

        // Apply search query
        if (currentSearchQuery) {
            const query = currentSearchQuery.toLowerCase();
            filtered = filtered.filter(dish =>
                dish.name.toLowerCase().includes(query) ||
                dish.origin.toLowerCase().includes(query) ||
                dish.tasteTags.some(tag => tag.toLowerCase().includes(query))
            );
        }
        displayDishes(filtered);
    }


    function updateFilters() {
        DOM.filterTagsContainer.innerHTML = ''; // Clear previous filter buttons

        allFilterTags.forEach(tag => {
            const btn = document.createElement('button');
            btn.classList.add('filter-btn');
            btn.textContent = tag;
            if (tag === activeFilter) {
                btn.classList.add('active');
            }
            btn.addEventListener('click', () => {
                activeFilter = tag;
                // Clear search bar when filter is applied
                DOM.searchBar.value = '';
                currentSearchQuery = '';
                // Update active state of buttons
                DOM.filterTagsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterAndSearchDishes();
            });
            DOM.filterTagsContainer.appendChild(btn);
        });
    }

    // Event Listeners for Flavours Page
    if (DOM.searchBar) {
        DOM.searchBar.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value;
            // Clear active filter when searching
            activeFilter = 'All';
            DOM.filterTagsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            // Re-apply 'active' to the 'All' button if it exists
            const allBtn = DOM.filterTagsContainer.querySelector('.filter-btn:first-child');
            if (allBtn && allBtn.textContent === 'All') {
                allBtn.classList.add('active');
            }
            filterAndSearchDishes();
        });
    }

 if (DOM.viewPassportBtn) {
        DOM.viewPassportBtn.addEventListener('click', () => {
            // Check if user name is already set
            let userName = localStorage.getItem('userName');

            if (!userName) {
                // Prompt user for name if not set
                userName = prompt("Enter your name to personalize your Passport:");
                if (userName && userName.trim() !== '') {
                    localStorage.setItem('userName', userName.trim());
                    showToast(`Passport personalized for ${userName.trim()}!`);
                } else {
                    // If user cancels or enters empty, default to "Culinary Explorer"
                    localStorage.setItem('userName', 'Culinary Explorer');
                    showToast("No name entered. Using 'Culinary Explorer'.");
                }
            }
            window.location.href = 'passport.html';
        });
    }

    // Initial load for Flavours page
    updateFilters(); // Render filter buttons
    filterAndSearchDishes(); // Display all dishes initially
}

// --- Passport Page Logic (passport.html) ---
if (document.body.classList.contains('page-passport')) {

    function loadPassport() {
        const suitcase = getSuitcase();

        // Update collected dishes list
        DOM.dishesCollectedList.innerHTML = '';
        if (suitcase.length === 0) {
            DOM.dishesCollectedList.innerHTML = '<li>No dishes collected yet. Start your FlavourTrek!</li>';
        } else {
            suitcase.forEach(dish => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${getDishIcon(dish.origin)} ${dish.name}</span>
                    <button class="btn small-btn remove-from-passport-btn" data-id="${dish.id}">&times;</button>
                `;
                DOM.dishesCollectedList.appendChild(li);
            });

            // Add event listeners for remove buttons
            DOM.dishesCollectedList.querySelectorAll('.remove-from-passport-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const dishIdToRemove = e.target.dataset.id;
                    removeDishFromSuitcase(dishIdToRemove);
                });
            });
        }

        // Calculate Cuisine Miles (unique origins)
        const uniqueOrigins = new Set(suitcase.map(dish => dish.origin));
        DOM.cuisineMilesValue.textContent = uniqueOrigins.size;

        // Determine Taste Personality (most frequent taste tag)
        const tasteTagCounts = {};
        suitcase.forEach(dish => {
            dish.tasteTags.forEach(tag => {
                tasteTagCounts[tag] = (tasteTagCounts[tag] || 0) + 1;
            });
        });

        let mostFrequentTag = 'Explorer'; // Default
        let maxCount = 0;
        for (const tag in tasteTagCounts) {
            if (tasteTagCounts[tag] > maxCount) {
                maxCount = tasteTagCounts[tag];
                mostFrequentTag = tag;
            }
        }
        // Set avatar based on most frequent tag (ensure you have corresponding images)
        DOM.tasteCharacter.src = `images/taste_characters/${mostFrequentTag.toLowerCase().replace(/\s/g, '_')}.png`;
        DOM.tasteCharacter.alt = `${mostFrequentTag} Taste Character`;


        // Display Mood Tags (all unique taste tags)
        DOM.moodTagsContainer.innerHTML = '';
        if (Object.keys(tasteTagCounts).length === 0) {
            DOM.moodTagsContainer.innerHTML = '<span>No mood tags yet!</span>';
        } else {
            Object.keys(tasteTagCounts).sort().forEach(tag => {
                const span = document.createElement('span');
                span.textContent = tag;
                DOM.moodTagsContainer.appendChild(span);
            });
        }

        // Set Explorer Name (placeholder for now, could be set by user)
        const userName = localStorage.getItem('userName') || 'Culinary Explorer';
        if (DOM.explorerName) {
             DOM.explorerName.textContent = userName;
        }

    }

    function getDishIcon(origin) {
        // Simple mapping, expand as needed
        const icons = {
            'Italy': '🇮🇹',
            'Japan': '🇯🇵',
            'Mexico': '🇲🇽',
            'India': '🇮🇳',
            'France': '🇫🇷',
            'Thailand': '🇹🇭',
            'China': '🇨🇳',
            'Spain': '🇪🇸',
            'United Kingdom': '🇬🇧',
            'Hungary': '🇭🇺',
            'Vietnam': '🇻🇳',
            'Middle East': '🌍', // Generic for broader regions
            'Poland': '🇵🇱',
            'Turkey': '🇹🇷',
            'South Korea': '🇰🇷',
            'Canada': '🇨🇦'
        };
        return icons[origin] || '🍽️'; // Default icon
    }

    // Event Listener for Download Passport Button
    if (DOM.downloadPassportBtn) {
        DOM.downloadPassportBtn.addEventListener('click', () => {
            showToast('Download Passport functionality coming soon!');
            // Future: Implement PDF generation using html2canvas and jsPDF
        });
    }

    // Initial load for Passport page
    loadPassport();
}


// --- Global Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    updateSuitcaseCount(); // Update suitcase count on every page load

    // Handle modal close
    if (DOM.modalCloseBtn) {
        DOM.modalCloseBtn.addEventListener('click', hideModal);
    }
    if (DOM.resultModal) {
        DOM.resultModal.addEventListener('click', (e) => {
            if (e.target === DOM.resultModal) { // Only close if clicked on backdrop
                hideModal();
            }
        });
    }
});

// For navigation active state on header links
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.page === document.body.classList[0].replace('page-', '')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});