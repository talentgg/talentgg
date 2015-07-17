var testData = [
    {
        questionText: "While taking on a good team, it becomes clear that one of your teammates is by far the weakest player in the game. Your opponents have noticed and are successfully exploiting his lane. Which of these is most similar to your response?",
        answers: [
        {label: "Make it clear that the player should find a new team for the next match, and get their head out of their ass for this one.", value: 0, effects: [10, 10, 2, -2, 10], categories: ["troll", "loud", "ambition", "adaptable", "dominance"]},
        {label: "Direct the player on how to play better.", value: 1, effects: [5, 1, 5, 2], categories: ["dominance", "adaptable", "blunt", "ambition"]},
        {label: "Direct your team to compensate for your weak teammate.", value: 2, effects: [5, 3, 5], categories: ["dominance", "adaptable", "collaborative"]},
        {label: "Keep an eye on their area of the board, and hop over whenever need be.", value: 3, effects: [5, 2, -10, -10, -5, -5], categories: ["adaptable", "collaborative", "loud", "dominance", "blunt", "troll"]},
        {label: "Stay in your lane. If the other team is focused on your teammate, they'll be too distracted to deal with your plans.", value: 4, effects: [5, -5, -5, -10, -5, -3], categories: ["adaptable", "blunt", "collaborative", "loud", "dominance", "troll"]}
        ],
        potential: [{
            categories: ["troll", "loud", "dominance", "adaptable", "collaborative"],
            values: [10, 10, 10, 5, 5]
        }]
      },
      {
        questionText: "What’s your take on trolling and trash talking?",
        answers: [
        {label: "It’s part of the game. It heightens the spirit of competition and throws the other team off their game.", value: 0, effects: [10, 5, 10, 10], categories: ["troll", "dominance", "loud", "blunt"]},
        {label: "It’s part of the game, but I only respond when others initiate.", value: 1, effects: [5, 5, 5, 5], categories: ["troll", "dominance", "loud", "blunt"]},
        {label: "It doesn’t bother me. I don’t respond.", value: 2, effects: [-5, 5, -5, -10, -10], categories: ["troll", "adaptable", "dominance", "loud", "blunt"]},
        {label: "I'd rather not see it.", value: 3, effects: [-10, -5, -5], categories: ["troll", "adaptable", "blunt"]}
        ],
        potential: [{
            categories: ["troll", "dominance", "loud", "blunt", "adaptable"],
            values: [10, 5, 10, 10, 5]
        }]
      },
            {
        questionText: "Which of these is closest to your feelings about lanes?",
        answers: [
        {label: "I have a specific role I always like to play. It’s the best use of my talents, and other roles aren’t fun for me.", value: 0, effects: [5, -10, -10], categories: ["dominance", "collaborative", "adaptable"]},
        {label: "There are a range of roles I’m comfortable with, but one or two that I’m not. Don’t ask me to go there. Otherwise I’m flexible.", value: 1, effects: [5, 5], categories: ["adaptable", "collaborative"]},
        {label: "I would enjoy playing extensively in any slot that makes the most sense for the team.", value: 2, effects: [10, -5, 10], categories: ["adaptable", "dominance", "collaborative"]}
        ],
        potential: [{
            categories: ["adaptable", "collaborative", "dominance"],
            values: [10, 10, 5]
        }]
      },
            {
        questionText: "You’re looking at several teams to apply to. The best one is looking for a support player. Does that appeal to you?",
        answers: [
        {label: "It wouldn’t be a good situation for me. I’d prefer a more aggressive role somewhere else.", value: 0, effects: [-10, -10, 5], categories: ["ambition", "adaptable", "dominance"]},
        {label: "I’d apply and have a conversation about it. I can support sometimes, but only if they’re flexible about switching it up down the road.", value: 1, effects: [2, 2], categories: ["adaptable", "dominance"]},
        {label: "Yes. My only criteria is whatever takes me highest up the ranks.", value: 2, effects: [10, 10, -5], categories: ["ambition", "adaptable", "dominance"]}
        ],
        potential: [{
            categories: ["ambition", "adaptable", "dominance"],
            values: [10, 10, 5]
        }]
      },
            {
        questionText: "What are your goals as a player?",
        answers: [
        {label: "To go professional. I schedule playing time every day and voluntarily sacrifice other activities to improve.", value: 0, effects: [10, 10], categories: ["ambition", "committed"]},
        {label: "To get really good. I’m already a pretty good player, and if it ever looks like I’d have a chance to go pro, I’d rearrange other aspects of my life to make that happen.", value: 1, effects: [1, -1], categories: ["ambition", "committed"]},
        {label: "If someone wants to pay me to play, I’m not gonna turn them down, but realistically those people who make a career out of it are younger, better, and/or have more time and resources than I can manage. Let’s just have fun.", value: 2, effects: [-10, -10], categories: ["ambition", "committed"]}
        ],
        potential: [{
            categories: ["ambition", "committed"],
            values: [10, 10]
        }]
      }

      ];