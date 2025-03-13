# **AI vs. Traditional Search: Brand Visibility Experiment**  

🔍 **Compare how brands appear in AI-generated search responses vs. traditional search engines.**  

## 📌 **Overview**  
This project explores how AI-powered search models (like OpenAI) compare to traditional search engines (Google) in displaying brand mentions. It helps businesses understand:  
- **Brand visibility** across different search ecosystems  
- **Search result accuracy** and completeness  
- **How AI-generated answers differ** from organic search rankings  

## 🚀 **Features**  
✅ AI-generated search results using OpenAI's API  
✅ Traditional search results retrieved via SerpAPI (or alternative scraping methods)  
✅ Side-by-side comparison of brand mentions  
✅ Mock data toggle for debugging without API limits  
✅ Interactive UI for real-time brand search queries  

## 🛠️ **Tech Stack**  
- **Frontend:** React + TypeScript  
- **UI Components:** TailwindCSS, Lucide React Icons  
- **Search APIs:** OpenAI API, SerpAPI (Google Search)  
- **State Management:** React Hooks  
- **Data Handling:** Mock service fallback for testing  

## 🔧 **Setup Instructions**  
- 1️⃣ Clone the Repository  
git clone https://github.com/yourusername/ai-brand-visibility-experiment.git
cd ai-brand-visibility-experiment
- 2️⃣ Install Dependencies
npm install
- 3️⃣ Set Up API Keys
Create a .env file in the root directory and add:
- OPENAI_API_KEY=your_openai_api_key
- SERPAPI_KEY=your_serpapi_api_key
- (Or use the mock data toggle for local testing.)
- 4️⃣ Run the App
npm run dev
Then visit http://localhost:3000 in your browser.

## 📊 How It Works
- 1️⃣ Choose an Industry from the dropdown (e.g., Travel & Hospitality)
- 2️⃣ Pick a Brand to analyze (e.g., Airbnb)
- 3️⃣ Select an AI Model (e.g., OpenAI GPT-4)
- 4️⃣ Choose a Query Type (e.g., General Query)
- 5️⃣ Pick a Search Keyword (e.g., "Short-term rentals")
- 6️⃣ Click "Analyze AI Search Results" to compare AI-generated vs. traditional search results
- 7️⃣ View brand visibility insights side by side

## 🚧 Troubleshooting
- Live Search Results Not Displaying?
- Check the SerpAPI key and ensure it’s valid
- Enable mock data in settings for debugging
- Use a web-scraping fallback if API requests fail
- Check browser console logs for API errors

## 📜 License
MIT License – Free to use and modify.

## 👥 Contributing
Contributions are welcome!

Fork the repo
Create a feature branch (feature/new-feature)
Submit a pull request
