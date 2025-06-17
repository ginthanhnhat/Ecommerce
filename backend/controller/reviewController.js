import reviewModel from "../models/reviewModel.js";

// List review
const getReview = async (req, res) => {
    try {
        
        const { parent_asin } = req.body

        const reviews = await reviewModel.find({ parent_asin })
        .sort({ helpful_vote: -1 })
        .limit(20);

        res.json({success: true, reviews})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Get rating numbers
const getRatingNumber = async (req, res) => {
    try {
        const { parent_asin } = req.body;

        const ratingData = await reviewModel.aggregate([
            { $match: { parent_asin } },
            {
                $group: {
                    _id: "$rating",
                    count: { $sum: 1 }
                }
            }
        ]);

        const ratings = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        };

        ratingData.forEach(item => {
            const rating = Math.round(item._id);
            if (ratings[rating] !== undefined) {
                ratings[rating] = item.count;
            }
        });

        const total = Object.values(ratings).reduce((acc, cur) => acc + cur, 0);

        res.json({ success: true, ratings, total });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { getReview, getRatingNumber } 