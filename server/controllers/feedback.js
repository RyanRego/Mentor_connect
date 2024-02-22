const feedback = async (req, res) => {
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
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export { feedback };