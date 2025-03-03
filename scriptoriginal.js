// ---------------------- FOX: FINANCIAL INTELLIGENCE ----------------------

// FOX AI class for financial intelligence
class FoxFinancialAI {
    constructor() {
        // Initialize FOX AI with investment categories and reasoning
        this.riskFactors = {
            "Russian Oil": {
                risk: "⚠️ High Risk",
                reason: "Ongoing war and international sanctions make this investment highly volatile and unpredictable."
            },
            "Oil companies located in Russia": {
                risk: "⚠️ High Risk",
                reason: "Ongoing war and international sanctions make this investment highly volatile and unpredictable."
            },
            "Cryptocurrency": {
                risk: "⚠️ Moderate Risk",
                reason: "Crypto markets are highly volatile, and regulatory crackdowns could impact prices."
            },
            "Tech Stocks": {
                risk: "✅ Low Risk",
                reason: "Technology companies show stable growth, but beware of market corrections."
            },
            "Real Estate": {
                risk: "✅ Stable Investment",
                reason: "Real estate offers long-term stability, but location and market cycles matter."
            },
            "AI Companies": {
                risk: "✅ Promising Investment",
                reason: "AI is shaping the future, but there are regulatory risks and market speculation."
            },
            "Green Energy": {
                risk: "🌱 Ethical & Growing Investment",
                reason: "Governments and corporations are pushing for sustainability, but upfront costs are high."
            },
            "Gold": {
                risk: "🏆 Safe Haven Asset",
                reason: "Gold remains stable during economic downturns but has slower long-term growth."
            },
            "Bonds": {
                risk: "✅ Low Risk",
                reason: "Bonds provide steady returns, but inflation can reduce real profits."
            },
            "Silver": {
                risk: "⚠️ Moderate Risk",
                reason: "Silver is influenced by industrial demand and inflation, making it more volatile than gold."
            },
            "Index Funds": {
                risk: "✅ Low Risk",
                reason: "Index funds track the market, offering diversification and lower volatility."
            }
        };
    }

    // Fetch real-time stock price from Yahoo Finance API
    async getRealStockPrice(ticker) {
        const apiKey = "8a5a6d83aemshc1932fb3028c609p117effjsn769029e7fd22";  // Replace with your actual RapidAPI key
        const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?symbols=${ticker}&region=US`;
      
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": apiKey,
                    "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
                }
            });

            if (!response.ok) {
                throw new Error(`Stock API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            if (data.quoteResponse && data.quoteResponse.result.length > 0) {
                let stock = data.quoteResponse.result[0];
                let price = stock.regularMarketPrice.toFixed(2);
                return `📈 Live price of ${ticker}: $${price}`;
            } else {
                return `❌ Could not fetch stock price for ${ticker}.`;
            }
        } catch (error) {
            console.error("Error fetching stock price:", error);
            return `❌ Could not fetch stock price. Error: ${error.message}`;
        }
    }

    // Fetch latest business news from NewsAPI
    async fetchLiveMarketNews_old() {
        const newsApiKey = "ba8186f17c2b4545869eebe25700a2db";  // Replace with your actual NewsAPI key
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsApiKey}`;
alert("1")          
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`News API Error: ${response.status} ${response.statusText}`);
            }
alert("2")          
            const newsData = await response.json();
alert("3")          
            let headlines = newsData.articles.slice(0, 3).map(article => `🔹 ${article.title}`);
            document.getElementById("news").innerHTML = headlines;
            return headlines.length ? headlines : ["❌ No recent news found."];
alert("4")          
        } catch (error) {
alert("5")          
             document.getElementById("news").innerHTML = "Error fetching news:", error;
            console.error("Error fetching news:", error);
            return ["❌ Could not fetch live news."];
        }
    }




    //--------------------------


async fetchLiveMarketNews_old1() {
    const newsApiKey = "ba8186f17c2b4545869eebe25700a2db";  // Replace with a valid API key
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsApiKey}`;
      alert(url);
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Accept": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`News API Error: ${response.status} ${response.statusText}`);
        }

        const newsData = await response.json();
        let headlines = newsData.articles.slice(0, 3).map(article => `🔹 ${article.title}`);
        document.getElementById("news").innerHTML = headlines.join("<br>");
        return headlines.length ? headlines : ["❌ No recent news found."];

    } catch (error) {
        document.getElementById("news").innerHTML = "Error fetching news - " + error ;
        console.error("Error fetching news:", error);
        return ["❌ Could not fetch live news."];
    }
}

async  fetchLiveMarketNews() {
try {
        const response = await fetch("http://localhost:3000/get-news");
        if (!response.ok) {
            throw new Error(`News API Error: ${response.status} ${response.statusText}`);
        }

        const newsData = await response.json();
        let headlines = newsData.articles.slice(0, 3).map(article => `🔹 ${article.title}`);
        document.getElementById("news").innerHTML = headlines.join("<br>");
    } catch (error) {
        document.getElementById("news").innerHTML = "Error fetching news - " + error;
        console.error("Error fetching news:", error);
    }
}



    
    // Provides investment recommendations based on risk assessment
    investmentAdvice(investmentChoice) {
        if (this.riskFactors[investmentChoice]) {
            let data = this.riskFactors[investmentChoice];
            return `${data.risk} - ${data.reason}`;
        } else {
            return `⚠️ No specific risk data found for '${investmentChoice}'. Proceed with due diligence.`;
        }
    }
}
// ---------------------- MAIN PROGRAM ----------------------

// Initialize FOX AI
const foxAI = new FoxFinancialAI();

// Function to run FOX AI in the web interface
async function getStockData1() {
    let ticker = document.getElementById("stockTicker").value.toUpperCase().trim();
    
    if (!ticker) {
        alert("Please enter a stock ticker!");
        return;
    }

    document.getElementById("result").innerHTML = "⏳ Fetching stock price...";
    let stockPrice = await foxAI.getRealStockPrice(ticker);
    document.getElementById("result").innerHTML = stockPrice;

    document.getElementById("news").innerHTML = "⏳ Fetching latest news...";
    let newsHeadlines = await foxAI.fetchLiveMarketNews();
    document.getElementById("news").innerHTML = newsHeadlines.join("<br>");
}

async function getInvestmentAdvice() {
    let investmentChoice = document.getElementById("investmentChoice").value.trim();
    if (!investmentChoice) {
        alert("Please enter an investment type!");
        return;
    }

    document.getElementById("advice").innerHTML = `💡 FOX Advice: ${foxAI.investmentAdvice(investmentChoice)}`;
}
