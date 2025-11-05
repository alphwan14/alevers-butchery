"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Phone, 
  MessageCircle, 
  Truck, 
  Shield, 
  Star, 
  Clock, 
  Award,
  Utensils,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  Leaf,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
<head>
  <meta name="google-site-verification" content="D9h8qRAfBDA-dhJpE62MgpcCPE4_zqwb3daEgi5VQB0" />
  <meta name="keywords" content="Voi butchery, Alevers butchery, fresh meat Voi, goat meat, beef, chicken, meat delivery Voi" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://alevers-butchery.vercel.app/" />
</head>

const PHONE_E164 = "+254703638425";
const PHONE_DISPLAY = "+254 703 638 425";

// Navigation Component
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#products", label: "Products" },
    { href: "#offers", label: "Special Offers" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#order", label: "Order Now" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-700 to-red-800 rounded-full flex items-center justify-center">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 font-playfair">Alevers Butchery</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-gray-700 hover:text-amber-700 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact Icons */}
          <div className="flex items-center space-x-4">
            <a 
              href={`https://wa.me/${PHONE_E164.replace("+", "")}`}
              className="bg-accent text-white p-2 rounded-full hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a 
              href={`tel:${PHONE_E164}`}
              className="bg-primary text-white p-2 rounded-full hover:bg-hover transition-colors duration-200 shadow-lg hover:shadow-xl"
              aria-label="Call"
            >
              <Phone className="h-5 w-5" />
            </a>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="flex flex-col space-y-4 border-t border-amber-200 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-amber-700 hover:bg-amber-50 py-2 px-4 rounded-lg transition-all duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
            
            {/* Additional Mobile-Only Quick Actions */}
            <div className="flex space-x-4 pt-2">
              <a
                href={`https://wa.me/${PHONE_E164.replace("+", "")}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 bg-accent text-white py-2 px-4 rounded-lg text-center font-semibold hover:bg-green-700 transition-colors"
              >
                WhatsApp Order
              </a>
              <a
                href={`tel:${PHONE_E164}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-center font-semibold hover:bg-hover transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// WhatsApp message function
function buildWhatsAppOrderMessage(order: {
  meat: string;
  qty: string;
  name: string;
  phone: string;
  delivery: string;
  specialInstructions?: string;
}) {
  const { meat, qty, name, phone, delivery, specialInstructions } = order;
  
  const unit = meat === "Chicken" ? "whole chicken(s)" : "kg";
  
  return `🥩 *NEW ORDER - Alevers Butchery*

👤 *Customer Details:*
• Name: ${name}
• Phone: ${phone}
• Delivery: ${delivery}

📦 *Order Summary:*
• Meat Type: ${meat}
• Quantity: ${qty} ${unit}

${specialInstructions ? `📝 *Special Instructions:*\n${specialInstructions}\n` : ''}
💬 *Message Sent Via Website*
🚚 *Please confirm availability and delivery time*`;
}

// Price Calculator Component
function PriceCalculator() {
  const [meatType, setMeatType] = useState("Goat");
  const [quantity, setQuantity] = useState(1);

  const prices = {
    Goat: 550,
    Beef: 650,
    Chicken: 850
  };

  const totalPrice = prices[meatType as keyof typeof prices] * quantity;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-red-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Quick Price Calculator</h2>
          <p className="text-gray-600">Calculate your order total instantly</p>
        </motion.div>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 border border-amber-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meat Type</label>
              <select
                value={meatType}
                onChange={(e) => setMeatType(e.target.value)}
                className="w-full rounded-lg border border-amber-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Goat">Goat Meat (KSh 550/kg)</option>
                <option value="Beef">Beef (KSh 650/kg)</option>
                <option value="Chicken">Chicken (KSh 850/whole)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity {meatType === "Chicken" ? "(whole chickens)" : "(kg)"}
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                className="w-full rounded-lg border border-amber-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Price:</span>
                <span className="text-red-700">KSh {totalPrice.toLocaleString()}</span>
              </div>
              {meatType !== "Chicken" && (
                <p className="text-sm text-gray-600 mt-1">
                  {quantity} kg × KSh {prices[meatType as keyof typeof prices]}/kg
                </p>
              )}
            </div>
            
            <a
              href={`https://wa.me/${PHONE_E164.replace("+", "")}?text=Hi! I'd like to order ${quantity} ${meatType === "Chicken" ? 'whole chicken' : 'kg of ' + meatType.toLowerCase() + ' meat'} for KSh ${totalPrice}`}
              className="btn-primary w-full text-center block"
            >
              Order Now on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Order Section Component
function OrderSection() {
  const [meat, setMeat] = useState("Goat");
  const [qty, setQty] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [delivery, setDelivery] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const handleWhatsApp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = buildWhatsAppOrderMessage({ meat, qty, name, phone, delivery, specialInstructions });
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${PHONE_E164.replace("+", "")}?text=${encoded}`, "_blank");
  };

  return (
    <section id="order" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-amber-50">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Place Your Order</h2>
          <p className="text-gray-600">Fill out the form below and we'll get back to you immediately</p>
        </motion.div>

        <form onSubmit={handleWhatsApp} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-amber-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-amber-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="e.g., 0703 638 425"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="meat" className="block text-sm font-medium text-gray-700 mb-2">
                Meat Type *
              </label>
              <select
                id="meat"
                required
                value={meat}
                onChange={(e) => setMeat(e.target.value)}
                className="w-full rounded-lg border border-amber-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Goat">Goat Meat</option>
                <option value="Beef">Beef</option>
                <option value="Chicken">Chicken</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="qty" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity {meat === "Chicken" ? "(whole chickens)" : "(kg)"} *
              </label>
              <input
                type="number"
                id="qty"
                required
                step={meat === "Chicken" ? "1" : "0.1"}
                min="0.1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-full rounded-lg border border-amber-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder={meat === "Chicken" ? "e.g., 2" : "e.g., 1.5"}
              />
            </div>
          </div>

          <div>
            <label htmlFor="delivery" className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Location *
            </label>
            <input
              type="text"
              id="delivery"
              required
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              className="w-full rounded-lg border border-amber-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter your exact location in Voi"
            />
          </div>

          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              id="instructions"
              rows={3}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full rounded-lg border border-amber-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Any specific cuts, preferences, or delivery instructions..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              type="submit" 
              className="btn-secondary flex-1 text-center"
            >
              <MessageCircle className="inline h-5 w-5 mr-2" />
              Place Order via WhatsApp
            </button>
            <a
              href={`tel:${PHONE_E164}`}
              className="btn-primary flex-1 text-center block"
            >
              <Phone className="inline h-5 w-5 mr-2" />
              Call to Order
            </a>
          </div>

          <p className="text-center text-sm text-gray-600">
            💰 Payment: Cash on Delivery | 🚚 Free delivery within Voi town
          </p>
        </form>
      </div>
    </section>
  );
}

// SikukuuOffers Component
function SikukuuOffers() {
  const offers = [
    { 
      title: "Festival Goat Package", 
      old: "KSh 600/kg", 
      price: "KSh 550/kg", 
      emoji: "🐐",
      image: "https://i.pinimg.com/1200x/6a/5d/60/6a5d60a3f9d8a8d1878c7b54ec364046.jpg",
      description: "Premium goat meat for your family gatherings",
      saving: "Save KSh 50/kg",
      popular: true
    },
    { 
      title: "Celebration Chicken Deal", 
      old: "Whole Chicken", 
      price: "KSh 850 only!", 
      emoji: "🐔",
      image: "https://i.pinimg.com/736x/60/c4/fb/60c4fb2f611d7e2f153735ee2b147be1.jpg",
      description: "Whole fresh chicken perfect for festivities",
      saving: "Special Price",
      popular: false
    },
    { 
      title: "Holiday Beef Bonanza", 
      old: "KSh 700/kg", 
      price: "KSh 650/kg", 
      emoji: "🐄",
      image: "https://i.pinimg.com/736x/4a/1a/62/4a1a6204f635db5b959033e677b7665e.jpg",
      description: "Tender boneless beef for special occasions",
      saving: "Save KSh 50/kg",
      popular: false
    }
  ];

  return (
    <section id="offers" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50 to-amber-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="h-8 w-8 text-red-600" />
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-red-800">
              🎉 Sikukuu Special Offers 🎉
            </h2>
          </div>
          <p className="text-gray-700 text-lg">Limited time holiday specials - Perfect for your celebrations!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${
                offer.popular ? 'border-red-500 shadow-xl' : 'border-amber-200'
              } card-hover`}
            >
              {offer.popular && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                  Most Popular
                </div>
              )}
              
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4 text-3xl">
                  {offer.emoji}
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-500 line-through">{offer.old}</div>
                  <div className="text-2xl font-bold text-red-700">{offer.price}</div>
                  <div className="text-sm text-green-600 font-semibold">{offer.saving}</div>
                </div>
                
                <a
                  href={`https://wa.me/${PHONE_E164.replace("+", "")}?text=Hi! I'm interested in the ${offer.title} - ${offer.price}`}
                  className="btn-primary text-sm w-full block"
                >
                  Grab This Offer
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-600">⏰ Offers valid until end of month | 📞 Call for bulk orders</p>
        </motion.div>
      </div>
    </section>
  );
}

function MeatQualityStandards() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Our Quality Promise</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We maintain the highest standards to ensure you get the best quality meat</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Shield,
              title: "Hygienic Processing",
              description: "All meats processed in certified clean facilities following health standards"
            },
            {
              icon: Leaf,
              title: "Fresh Daily",
              description: "We source and prepare fresh meats daily, no frozen storage"
            },
            {
              icon: CheckCircle,
              title: "Quality Inspection",
              description: "Every cut undergoes strict quality checks before delivery"
            },
            {
              icon: Users,
              title: "Family Trusted",
              description: "Trusted by Voi families since 2015 for consistent quality"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-amber-50 rounded-2xl border border-amber-200"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecipeSuggestions() {
  const recipes = [
    {
      name: "Traditional Goat Stew",
      description: "Perfect for family gatherings and special occasions",
      ingredients: ["Goat meat", "Tomatoes", "Onions", "Garlic", "Traditional spices"],
      cookingTime: "2 hours",
      difficulty: "Medium"
    },
    {
      name: "Grilled Beef Skewers",
      description: "Quick and delicious for weekend barbecues",
      ingredients: ["Beef cubes", "Bell peppers", "Onions", "Marinade spices"],
      cookingTime: "30 mins",
      difficulty: "Easy"
    },
    {
      name: "Whole Roasted Chicken",
      description: "Classic family meal with crispy skin and tender meat",
      ingredients: ["Whole chicken", "Lemon", "Herbs", "Garlic", "Butter"],
      cookingTime: "1.5 hours",
      difficulty: "Medium"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Utensils className="h-8 w-8 text-amber-600" />
            <h2 className="text-3xl md:text-4xl font-bold font-playfair">Recipe Suggestions</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">Get inspired with these delicious recipes using our premium meats</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-200 card-hover"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
                <p className="text-gray-600 mb-4">{recipe.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Ingredients:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">⏱️ {recipe.cookingTime}</span>
                    <span className="text-gray-600">📊 {recipe.difficulty}</span>
                  </div>
                </div>
                
                <button className="w-full bg-amber-100 hover:bg-amber-200 text-amber-700 font-semibold py-2 px-4 rounded-lg transition-colors">
                  Get Full Recipe
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Home Component
export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Alphonse Lincoln",
      location: "Voi Town",
      comment: "The quality of meat from Alevers is exceptional! Always fresh and delivered on time. My family has been buying from them for years.",
      rating: 5,
      orders: 24
    },
    {
      name: "Anna Waswani",
      location: "Mwatunge",
      comment: "Best butchery in Voi. Their goat meat is tender and flavorful. Highly recommended for family gatherings!",
      rating: 5,
      orders: 18
    },
    {
      name: "Mathius Kiprono",
      location: "Mbololo",
      comment: "Reliable service and premium quality. The beef cuts are always perfect for nyama choma. My go-to butchery!",
      rating: 5,
      orders: 32
    },
    {
      name: "Timo Mwamburi",
      location: "Mwakingali",
      comment: "Fresh chicken every time! The delivery is fast and the prices are very reasonable. Great customer service too.",
      rating: 5,
      orders: 15
    },
    {
      name: "Ryan Waniala",
      location: "Voi Central",
      comment: "Consistently excellent quality. I've tried other butcheries but none match Alevers' freshness and taste.",
      rating: 5,
      orders: 28
    },
    {
      name: "Grace Wambua",
      location: "Sagalla",
      comment: "The sikukuu offers are amazing! Great value for money and the meat is always fresh. My family won't buy meat anywhere else.",
      rating: 5,
      orders: 21
    }
  ];

  const products = [
    {
      name: "Premium Goat Meat",
      price: "KSh 550/kg",
      originalPrice: "KSh 600/kg",
      desc: "Tender, fresh goat meat perfect for traditional dishes and special occasions.",
      img: "https://i.pinimg.com/736x/89/8d/29/898d29f1907f8fc2418e0dc058c7d64d.jpg",
      features: ["Fresh Daily", "Tender Cuts", "Perfect for Stews"]
    },
    {
      name: "Quality Beef",
      price: "KSh 650/kg",
      originalPrice: "KSh 700/kg",
      desc: "Boneless beef cuts, carefully selected for flavor and tenderness.",
      img: "https://i.pinimg.com/1200x/0d/d5/b1/0dd5b11803c579a48ad641d60b1f7f0a.jpg",
      features: ["Boneless", "Aged Perfectly", "Versatile Cuts"]
    },
    {
      name: "Fresh Chicken",
      price: "KSh 850/whole",
      desc: "Whole fresh chicken, ideal for family meals and celebrations.",
      img: "https://i.pinimg.com/736x/a8/91/52/a89152d9a1aef907b13eafdc1ca649d0.jpg",
      features: ["Whole Chicken", "Fresh Daily", "Family Size"]
    }
  ];

  const totalReviews = testimonials.length;
  const totalOrders = testimonials.reduce((sum, testimonial) => sum + testimonial.orders, 0);

  return (
    <div className="min-h-screen">
      {/* Use the new Navigation component */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-900 via-red-800 to-amber-800">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Utensils className="h-10 w-10 text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-playfair">
              Premium <span className="text-amber-300">Quality</span> Meats
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-amber-100">
              Fresh goat, beef, and chicken delivered daily in Voi. Experience the difference quality makes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#order" 
                className="btn-primary text-lg"
              >
                🥩 Order Now
              </a>
              <a 
                href="#offers" 
                className="border-2 border-amber-300 text-amber-100 hover:bg-amber-300 hover:text-amber-900 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                View Offers
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-amber-200">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <span>Free Voi Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Daily Fresh</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-amber-50 py-12 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Clock, text: "Daily Fresh Delivery", color: "text-amber-600" },
              { icon: Shield, text: "Quality Guaranteed", color: "text-amber-600" },
              { icon: Truck, text: "Free Delivery in Voi", color: "text-amber-600" },
              { icon: Award, text: "Since 2015", color: "text-amber-600" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sikukuu Offers */}
      <SikukuuOffers />

      {/* Featured Products */}
      <section id="products" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-gray-800">Our Premium Selection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Carefully selected and prepared to ensure the highest quality and freshness for your family.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-amber-200 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-600 to-red-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Save KSh 50
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{product.desc}</p>
                  
                  <div className="space-y-2 mb-4">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-amber-700">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                      )}
                    </div>
                    <a
                      href={`https://wa.me/${PHONE_E164.replace("+", "")}?text=Hi! I'd like to order ${product.name}`}
                      className="btn-secondary text-sm"
                    >
                      Order Now
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <MeatQualityStandards />

      {/* Order Calculator */}
      <PriceCalculator />

      {/* Recipe Suggestions */}
      <RecipeSuggestions />

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600">{totalReviews}+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600">{totalOrders}+</div>
                <div className="text-sm text-gray-600">Orders Delivered</div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-gray-800">What Our Customers Say</h2>
            <p className="text-gray-600">Join hundreds of satisfied customers in Voi</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div 
              key={activeTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-amber-200"
            >
              <div className="flex items-center mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-lg font-semibold text-amber-600">5.0</span>
                <span className="ml-2 text-sm text-gray-500">({testimonials[activeTestimonial].orders} orders)</span>
              </div>
              
              <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">
  &ldquo;{testimonials[activeTestimonial].comment}&rdquo;
</p>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{testimonials[activeTestimonial].name}</div>
                  <div className="text-gray-600 text-sm">{testimonials[activeTestimonial].location}</div>
                </div>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === activeTestimonial ? 'bg-amber-600' : 'bg-amber-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional mini testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-amber-200 shadow-sm"
              >
                <div className="flex items-center mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
  &ldquo;{testimonial.comment}&rdquo;
</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{testimonial.name}</div>
                    <div className="text-gray-500 text-xs">{testimonial.location}</div>
                  </div>
                  <div className="text-xs text-gray-500">{testimonial.orders} orders</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Section */}
      <OrderSection />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-amber-900 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <Utensils className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold font-playfair">Alevers Butchery</span>
              </div>
              <p className="text-amber-100 leading-relaxed">
                Providing Voi with premium quality meats since 2015. Quality you can taste, service you can trust.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-amber-200">Contact Info</h3>
              <div className="space-y-3 text-amber-100">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-amber-300" />
                  <a href={`tel:${PHONE_E164}`} className="hover:text-amber-300 transition-colors">{PHONE_DISPLAY}</a>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-3 text-amber-300" />
                  <a href={`https://wa.me/${PHONE_E164.replace("+", "")}`} className="hover:text-amber-300 transition-colors">WhatsApp Orders</a>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-amber-300" />
                  <span>Voi, Kenya</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-amber-200">Hours</h3>
              <div className="space-y-2 text-amber-100">
                <div>Monday - Saturday</div>
                <div className="text-amber-300">7:00 AM - 9:00 PM</div>
                <div className="mt-2">Sunday</div>
                <div className="text-amber-300">8:00 AM - 8:00 PM</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-amber-200">Quick Links</h3>
              <div className="space-y-3 text-amber-100">
                <a href="#products" className="block hover:text-amber-300 transition-colors">Products</a>
                <a href="#offers" className="block hover:text-amber-300 transition-colors">Special Offers</a>
                <a href="#order" className="block hover:text-amber-300 transition-colors">Order Now</a>
                <a href="#testimonials" className="block hover:text-amber-300 transition-colors">Reviews</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-amber-700 mt-12 pt-8 text-center text-amber-200">
            <p>
              &copy; 2025 Alevers Butchery. All rights reserved. Developed with ❤️ by{" "}
              <a 
                href="https://wa.me/254769196669" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-white underline transition-colors"
              >
                Alphonse Lincoln +254769196669
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}