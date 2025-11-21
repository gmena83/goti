// Mock Learning Recommender
export const LearningRecommender = {
    analyze: (userMessage) => {
        const keywords = ["api", "react", "next.js", "workflow"];
        const recommendations = [];

        if (userMessage.toLowerCase().includes("api")) {
            recommendations.push({
                type: "video",
                title: "Understanding REST APIs",
                url: "https://youtube.com/watch?v=mock-api-video"
            });
        }

        return recommendations;
    }
};
