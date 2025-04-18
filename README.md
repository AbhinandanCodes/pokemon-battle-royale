# Pokémon Battle Royale

A fun little project where Pokémon fight it out in a battle royale format! Built with **React**, **Redux Toolkit**, and styled using **Tailwind CSS**, this app simulates a showdown between randomly chosen Pokémon from the original 151.

## ⚙️ Features

- 🔄 Fetch Pokémon from the PokéAPI (with caching for speed!)
- 🎴 Displays each Pokémon card one by one
- 🧠 Assigns a random move to each Pokémon from their available move pool
- 🏁 "Start Battle" button appears only when the data is ready
- 🧹 Clear existing data and fetch new Pokémon anytime


## 🚀 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/abhinandanCodes/pokemon-battle-royale.git
   cd pokemon-battle-royale
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the app**
   ```bash
   npm run dev
   ```

## 📁 Folder Structure (Highlights)
```
src/
├── components/         # Reusable components like PokemonCard
├── features/pokemon/   # Redux slice, API logic, and types
├── utils/              # Caching, colours, etc
├── app/                # Store configuration and hooks
├── pages/              # Home and BattleRoyale page
```

## 💡 Notes

- You can choose how many Pokémon to fetch (between 2 and 151)
- The app fetches slowly from cache using `sleep()` to avoid burst render lag


## 🧠 Learnings & Takeaways

- Handling async logic in Redux Thunks
- Caching strategy using `localStorage`
- Creating a retro-style UI using Tailwind
- Conditional UI rendering with good UX feedback

## 🤝 Want to Contribute?

Here are a few ideas to make the project even cooler:

- Add a leaderboard for all Pokémon
- Implement a complex battle system with more than one move and varying move logics
- Add functionality to cancel Pokémon fetching mid-way
- Show the rank of each Pokémon over fainted cards
- Or... anything else you'd love to see or build!

