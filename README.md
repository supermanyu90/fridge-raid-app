# 🧑‍🍳 Fridge Raid & Budget Planner

                                                                      **https://fridge-raid-app.vercel.app/**
> Turn what's in your fridge into a budget-friendly feast! Reduce food waste, save money, and let **Chef Fridge** guide you to your next delicious meal. 🥦🥕🍗


Welcome to the **Fridge Raid & Budget Planner**! This is a modern, interactive web application built with Vanilla JS and Vite. It is designed to tackle a universal problem: *looking into a half-empty fridge and having no idea what to cook, while trying to stick to a grocery budget.*

---

## ✨ Features

- 🧊 **Meet Chef Fridge**: An interactive, animated SVG mascot that lives on the home page! Chef Fridge bobs around and drops zero-waste cooking facts to keep you inspired while you plan your meals.
- 💸 **Interactive Quick-Commerce Budget Tracker**: Got a ₹500 budget? The app tracks your grocery list against your budget in real-time. The progress bar dynamically changes from green to amber to red as you approach your spending limit!
- 🔄 **Smart Substitutions**: Chicken breast too expensive? Click the **Substitute** button to swap it for a budget-friendly alternative (like Soya Chunks). The budget recalculates instantly. Prices are localized to INR and reflect real-world quick-commerce platforms (like Blinkit, Zepto, or Swiggy Instamart).
- 🎨 **Premium Aesthetic**: Enjoy a beautifully designed light mode UI inspired by English watercolors and peacock feathers, featuring frosted glassmorphism cards and smooth micro-animations.
- 📋 **Prep To-Do List**: Generates a synchronized step-by-step checklist to help you prep your generated meals efficiently based on how much time you have.

---

## 🚀 Getting Started

This project is super lightweight and requires zero complex backend setup to run locally. It uses a "Mock AI" state engine to demonstrate functionality.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/supermanyu90/fridge-raid-app.git
   cd fridge-raid-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:5173` (or the URL provided in your terminal) to meet Chef Fridge and start planning!

---

## 🛠️ How It Works (Under the Hood)

The application relies on a robust Vanilla JavaScript architecture:
- **`index.html`**: Houses the semantic structure, the SVG architecture for our beloved Chef Fridge, and the Floating Action Button (FAB) for the FAQ modal.
- **`style.css`**: Powers the "Peacock & English" aesthetic using CSS Variables, Keyframe animations (`@keyframes hover-bob`), and backdrop filters for that sweet frosted glass look.
- **`main.js`**: The brains of the operation! It handles:
  - **State Management**: Tracks your `budget`, `spent` amount, and dynamic arrays for `groceryList` and `todoList`.
  - **Mock AI Logic**: `generateMockPlan()` simulates an API response that intelligently links user inputs (like "Spinach, Eggs") to specific outputs.
  - **DOM Manipulation**: Re-renders the UI instantly when items are checked off or substituted.

---

## 🔮 Future Roadmap

- [ ] **Real AI Integration**: Swap out the `generateMockPlan` with a live call to the Google Gemini API to generate an infinite variety of recipes based on *exact* fridge contents.
- [ ] **PWA Support**: Turn it into a Progressive Web App so users can use it offline while standing in the grocery store aisle.
- [ ] **Shareable Lists**: Add a button to export the Grocery List directly to WhatsApp or a Notes app.

---

## 🤝 Contributing

Got an idea to make Chef Fridge even smarter? Feel free to fork the repository, make your tweaks, and submit a Pull Request! We love community contributions, especially if they help people reduce food waste.

---

*Built with ❤️ (and leftovers) for the modern home cook.*
