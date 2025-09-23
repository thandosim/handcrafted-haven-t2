
import { NextResponse } from 'next/server';

export async function GET() {
  const sellers = [
    {
      "_id": "64a1s2c3d4e5f6789012001a",
      "userId": "seller_001",
      "displayName": "Luna's Fiber Arts",
      "imageUrl": "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "bio": "Creating beautiful macrame and fiber art pieces that bring natural beauty into your home. Each piece is handcrafted with sustainable materials and lots of love.",
      "story": "Hi! I'm Luna, and I've been creating macrame art for over 8 years. What started as a hobby during college has become my passion and full-time craft business. I source all my materials from sustainable suppliers and love creating pieces that connect people with nature. Every wall hanging tells a story of patience, creativity, and the meditative art of knotting. When I'm not crafting, you'll find me hiking trails for inspiration or tending to my garden.",
      "socialLinks": {
        "ig": "https://instagram.com/lunasfiberarts",
        "fb": "https://facebook.com/lunafiberarts",
        "web": "https://lunafiberarts.com"
      },
      "badges": ["Eco-Friendly", "Featured Artisan", "Top Rated"],
      "ratingAvg": 4.8,
      "ratingCount": 127
    },
    {
      "_id": "64a1s2c3d4e5f6789012001b",
      "userId": "seller_002",
      "displayName": "Clay & Fire Studio",
      "imageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      "bio": "Handcrafted ceramics made in small batches. From coffee mugs to dinner sets, each piece is wheel-thrown and glazed with care in my home studio.",
      "story": "Welcome to Clay & Fire Studio! I'm Marcus, a ceramic artist with 12 years of experience. After leaving my corporate job in 2018, I transformed my garage into a pottery studio and haven't looked back. I specialize in functional ceramics that bring joy to everyday moments. My glazes are all lead-free and food-safe, and I fire each piece in my electric kiln. I believe that handmade pottery connects us to ancient traditions while serving modern needs. Every mug has been touched by human hands and carries the imperfections that make it perfectly unique.",
      "socialLinks": {
        "ig": "https://instagram.com/clayandfirestudio",
        "fb": "https://facebook.com/clayandfirestudio",
        "web": "https://clayandfirestudio.etsy.com"
      },
      "badges": ["Master Craftsperson", "Local Favorite", "Food Safe Certified"],
      "ratingAvg": 4.9,
      "ratingCount": 203
    },
    {
      "_id": "64a1s2c3d4e5f6789012001c",
      "userId": "seller_003",
      "displayName": "Nordic Knits by Astrid",
      "imageUrl": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      "bio": "Cozy Scandinavian-inspired knitwear using premium natural fibers. Each piece is hand-knitted with traditional techniques passed down through generations.",
      "story": "Greetings! I'm Astrid, and knitting has been in my family for four generations. My grandmother taught me the traditional Norwegian patterns when I was just seven years old. Now, 25 years later, I create modern interpretations of classic Nordic designs using the finest merino wool and alpaca fibers. Each piece takes weeks to complete and represents hours of meditative knitting by the fireplace. I source my wool from ethical farms and use only natural dyes when possible. My goal is to create heirloom pieces that will keep you warm for decades to come.",
      "socialLinks": {
        "ig": "https://instagram.com/nordicknitsastrid",
        "fb": "https://facebook.com/astridnordicknits",
        "web": "https://nordicknits.no"
      },
      "badges": ["Heritage Craft", "Premium Materials", "Slow Fashion"],
      "ratingAvg": 4.7,
      "ratingCount": 89
    },
    {
      "_id": "64a1s2c3d4e5f6789012001d",
      "userId": "seller_004",
      "displayName": "Reclaimed Wood Co.",
      "imageUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      "bio": "Giving new life to old wood through functional art. Specializing in cutting boards, furniture, and home decor made from reclaimed and salvaged timber.",
      "story": "I'm Jake, a third-generation woodworker who believes in the beauty of reclaimed materials. What others see as waste, I see as potential. My workshop is filled with barn wood, old fence posts, and salvaged timbers, each with their own history and character. I started Reclaimed Wood Co. to combine my love of woodworking with environmental consciousness. Every cutting board, shelf, and piece of furniture I create prevents beautiful wood from ending up in landfills. I use traditional joinery techniques combined with modern food-safe finishes. The result? Functional art that tells the story of American craftsmanship while protecting our forests.",
      "socialLinks": {
        "ig": "https://instagram.com/reclaimedwoodco",
        "fb": "https://facebook.com/reclaimedwoodcompany",
        "web": "https://reclaimedwoodco.com"
      },
      "badges": ["Eco-Warrior", "Reclaimed Materials", "Traditional Craft"],
      "ratingAvg": 4.8,
      "ratingCount": 156
    },
    {
      "_id": "64a1s2c3d4e5f6789012001e",
      "userId": "seller_005",
      "displayName": "Crystal Moon Jewelry",
      "imageUrl": "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      "bio": "Handcrafted wire-wrapped jewelry featuring natural gemstones and crystals. Each piece is designed to connect you with the healing energy of the earth.",
      "story": "Hello, beautiful souls! I'm Sage, and I've been creating wire-wrapped jewelry for 6 years. My journey began when I was going through a difficult time and found solace in working with crystals and gemstones. What started as personal healing became a calling to share these beautiful creations with others. I hand-select each stone for its unique properties and beauty, then wrap it in sterling silver or gold-filled wire using techniques I've learned from various artisans around the world. I believe that each piece finds its way to the person who needs its energy most. All my stones are ethically sourced, and I cleanse each piece under the full moon before shipping.",
      "socialLinks": {
        "ig": "https://instagram.com/crystalmoonjewelry",
        "fb": "https://facebook.com/crystalmoondesigns",
        "web": "https://crystalmoonjewelry.com"
      },
      "badges": ["Spiritual Artisan", "Ethically Sourced", "Energy Healing"],
      "ratingAvg": 4.9,
      "ratingCount": 234
    },
    {
      "_id": "64a1s2c3d4e5f6789012001f",
      "userId": "seller_006",
      "displayName": "Zen Garden Candles",
      "imageUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      "bio": "Natural soy candles in handmade ceramic vessels. Creating peaceful ambiance through the combination of clean-burning candles and artisanal pottery.",
      "story": "Namaste! I'm River, and Zen Garden Candles was born from my love of meditation and mindful living. After years of buying commercial candles filled with synthetic fragrances and paraffin, I decided to create something better. I hand-pour each candle using 100% soy wax and essential oils, then house them in ceramic vessels that I throw on my pottery wheel. The process is deeply meditative for me - from mixing the wax to trimming the ceramic vessels. My studio overlooks a small zen garden where I find inspiration for new scent combinations. Each candle is designed to transform your space into a sanctuary of peace and tranquility.",
      "socialLinks": {
        "ig": "https://instagram.com/zengardencandles",
        "fb": "https://facebook.com/zengardencandles",
        "web": "https://zengardencandles.com"
      },
      "badges": ["Mindful Creator", "All Natural", "Meditation Inspired"],
      "ratingAvg": 4.6,
      "ratingCount": 178
    },
    {
      "_id": "64a1s2c3d4e5f6789012001g",
      "userId": "seller_007",
      "displayName": "Vintage Leather Works",
      "imageUrl": "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      "bio": "Traditional leather crafting meets timeless design. Creating journals, bags, and accessories that age beautifully and tell your story alongside you.",
      "story": "Greetings, I'm Samuel, a leather craftsman carrying on a 100-year family tradition. My great-grandfather was a saddle maker, and his tools still hang in my workshop today. I learned the trade from my father, who taught me that true leather work is about patience, precision, and respect for the material. Every journal I bind, every bag I stitch, is made to last generations. I source full-grain leather from a family tannery that's been operating since 1892, and I still hand-stitch everything using techniques that haven't changed in centuries. In our digital world, there's something profound about putting pen to paper in a journal that's been crafted by human hands.",
      "socialLinks": {
        "ig": "https://instagram.com/vintageleatherworks",
        "fb": "https://facebook.com/vintageleatherworks",
        "web": "https://vintageleatherworks.com"
      },
      "badges": ["Heritage Craft", "Family Tradition", "Hand Stitched"],
      "ratingAvg": 4.8,
      "ratingCount": 145
    },
    {
      "_id": "64a1s2c3d4e5f6789012001h",
      "userId": "seller_008",
      "displayName": "Woodland Spoon Co.",
      "imageUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      "bio": "Hand-carved wooden utensils from sustainably harvested North American hardwoods. Simple tools for the modern kitchen, carved with traditional techniques.",
      "story": "Hi there! I'm Forest (yes, that's really my name), and I've been carving spoons for 15 years. It all started when I was camping and needed to make eating utensils from a fallen branch. That first rough spoon opened my eyes to the meditative art of spoon carving. Now I work exclusively with locally sourced hardwoods - cherry, maple, and walnut from trees that have been sustainably harvested or naturally fallen. Each spoon is carved entirely by hand using traditional tools: gouges, knives, and sandpaper. No machines, no shortcuts. The result is a utensil that connects you to the wood, the tree it came from, and the ancient tradition of creating tools with your hands. Every spoon has a unique grain pattern and will develop a beautiful patina with use.",
      "socialLinks": {
        "ig": "https://instagram.com/woodlandspoonco",
        "fb": "https://facebook.com/woodlandspoons",
        "web": "https://woodlandspoonco.com"
      },
      "badges": ["Sustainable Harvest", "Hand Carved", "Traditional Methods"],
      "ratingAvg": 4.7,
      "ratingCount": 198
    },
    {
      "_id": "64a1s2c3d4e5f6789012001i",
      "userId": "seller_009",
      "displayName": "Little Lamb Nursery",
      "imageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      "bio": "Soft, organic baby items crocheted with love. Creating heirloom pieces for your little ones using only the finest organic cotton and hypoallergenic materials.",
      "story": "Hello, sweet families! I'm Emma, a mother of three and grandmother of five. Little Lamb Nursery began when I was pregnant with my first child and couldn't find baby items that met my standards for softness, safety, and beauty. I learned to crochet from my grandmother's old pattern books and fell in love with creating tiny treasures. Now, 20 years later, I specialize in organic cotton baby blankets, booties, and clothing. Every stitch is made with love and the understanding that these pieces will be cherished family heirlooms. I only use certified organic cotton yarn that's been tested for harmful chemicals. Many of my customers return for each new baby, and I've even made blankets for second-generation babies!",
      "socialLinks": {
        "ig": "https://instagram.com/littlelambnursery",
        "fb": "https://facebook.com/littlelambnursery",
        "web": "https://littlelambnursery.com"
      },
      "badges": ["Certified Organic", "Baby Safe", "Multi-Generational"],
      "ratingAvg": 4.9,
      "ratingCount": 267
    },
    {
      "_id": "64a1s2c3d4e5f6789012001j",
      "userId": "seller_010",
      "displayName": "Island Basket Weaving",
      "imageUrl": "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      "bio": "Traditional basket weaving using natural materials. Creating functional art for modern homes while preserving ancient techniques learned from master weavers.",
      "story": "Aloha! I'm Kai, and I learned basket weaving from my Filipino grandmother who immigrated to Hawaii in the 1960s. She taught me that baskets aren't just containers - they're vessels of culture, tradition, and practical beauty. I use traditional techniques passed down through generations, working with natural rattan, bamboo, and native grasses. Each basket is woven entirely by hand, taking several days to complete. The process requires patience and meditation, qualities that are woven into every piece along with the natural fibers. My baskets serve modern storage needs while connecting you to ancient traditions of craftsmanship. I source all my materials sustainably and work with local farmers who grow rattan specifically for traditional crafts.",
      "socialLinks": {
        "ig": "https://instagram.com/islandbasketweaving",
        "fb": "https://facebook.com/islandbaskets",
        "web": "https://islandbaskets.com"
      },
      "badges": ["Cultural Heritage", "Traditional Techniques", "Sustainable Materials"],
      "ratingAvg": 4.6,
      "ratingCount": 112
    }
  ];

  return NextResponse.json(sellers);
}
