import Sentiment from 'sentiment';
import Mentor from '../model/mentor.model.js';
import OpenAI from 'openai';
const feedback = async (req, res) => {
    const openai = new OpenAI()
    openai.api_key = process.env.OPENAI_API_KEY;
    try {
        const { mentorId,emoji, experience, preparation, communication, engagement, relevant, suggestion, review } = req.body;
        console.log(mentorId, "mentorId")
        console.log(emoji, "emoji")
        console.log(experience, "experience")
        console.log(preparation, "preparation")
        console.log(communication, "communication")
        console.log(engagement, "engagement")
        console.log(relevant, "relevant")
        console.log(suggestion, "suggestion")
        console.log(review, "review")

        const mentor = await Mentor.findById(mentorId);

        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }

        const prompt = `You recently had a session with a mentee who provided the following feedback: "${suggestion}". Here are some suggestions to help you improve and continue providing a great experience for your mentees:`;

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

        const calculateRating = (emoji, experience, preparation, communication, engagement, relevant, sentimentScore) => {
            // Weightage for each parameter
            const weights = {
                emoji: 0.05,
                experience: 0.08,
                preparation: 0.08,
                communication: 0.08,
                engagement: 0.5,
                relevant: 0.05,
                sentiment: 0.07, // Adjust weight based on importance
            };
        
            // Calculate weighted sum
            const weightedSum = (weights.emoji * emoji) +
                               (weights.experience * experience) +
                               (weights.preparation * preparation) +
                               (weights.communication * communication) +
                               (weights.engagement * engagement) +
                               (weights.relevant * relevant) +
                               (weights.sentiment * sentimentScore);
        
            // Normalize the weighted sum to get a rating between 0 and 10
            const maxWeightedSum = Object.values(weights).reduce((acc, val) => acc + val, 0);
            const normalizedRating = (weightedSum / maxWeightedSum) * 5;
            console.log(normalizedRating, "normalizedRating")
            // Ensure the rating is within the desired range
            const rating = Math.min(Math.max(normalizedRating, 0), 10);
        
            return rating/2;
        };
        

        const rating = calculateRating(emoji, experience, preparation, communication, engagement, relevant, result.score);
        console.log(rating);

        mentor.rating = {
            numberOfRatings: mentor.rating.numberOfRatings + 1,
            totalRating: mentor.rating.totalRating + rating,
        }

        await mentor.save();
        
        console.log(mentor.rating, "mentor.rating")

        mentor.feedback.unshift(
            {
                review:summary,
            }
        );

        await mentor.save();
        console.log(mentor.feedback, "mentor.feedback")
        res.status(200).json({ message: "Feedback received" , summary : summary});

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export { feedback };