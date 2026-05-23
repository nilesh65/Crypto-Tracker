export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { coins } = req.body;

  const prompt = `
You are a crypto market analyst.

Analyze this market data and give a short "at a glance" summary:

Coins data:
${JSON.stringify(coins.slice(0, 10))}

Return:
1. Market sentiment (bullish / bearish / neutral)
2. Top 1 gainer
3. Top 1 loser
4. 2 line simple human summary
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";
    console.log(result)
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: "Gemini API failed" });
  }
}