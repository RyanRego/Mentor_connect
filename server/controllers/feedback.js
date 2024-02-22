import Sentiment from 'sentiment';
import OpenAI from 'openai';
const feedback = async (req, res) => {
    const openai = new OpenAI()
    openai.api_key = process.env.OPENAI_API_KEY;
    try {
        const { emoji, experience, preparation, communication, engagement, relevant, suggestion, review } = req.body;
        console.log(emoji, "emoji")
        console.log(experience, "experience")
        console.log(preparation, "preparation")
        console.log(communication, "communication")
        console.log(engagement, "engagement")
        console.log(relevant, "relevant")
        console.log(suggestion, "suggestion")
        console.log(review, "review")

        const prompt = `You recently had a session with a mentee who provided the following feedback: "${review}". Here are some suggestions to help you improve and continue providing a great experience for your mentees:`;

        const response = await openai.chat.completions.create({
            messages:[
                {
                    role: 'system',
                    content: prompt
                }
            ],
            model: 'gpt-3.5-turbo',
        });

        const summary = response.choices[0].message.content;
        console.log(summary);

        const sentiment = new Sentiment();
        const result = sentiment.analyze(review);  
        console.log(result);      
        
        res.status(200).json({ message: "Feedback received" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export { feedback };