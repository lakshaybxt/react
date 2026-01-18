const Chatbot = {
  defaultResponses: {
    'hello hi': `Hello! How can I help you?`,
    'how are you': `I'm doing great! How can I help you?`,
    'flip a coin': () => Math.random() < 0.5
      ? 'Sure! You got heads'
      : 'Sure! You got tails',
    'roll a dice': () => `Sure! You got ${Math.floor(Math.random() * 6) + 1}`,
    'what is the date today': () => {
      const now = new Date();
      return `Today is ${now.toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric'
      })}`;
    },
    'thank': 'No problem! Let me know if you need help with anything else!',
  },

  additionalResponses: {},

  unsuccessfulResponse:
    `Sorry, I didn't quite understand that.`,

  emptyMessageResponse:
    `Sorry, it looks like your message is empty.`,

  addResponses(additionalResponses) {
    this.additionalResponses = {
      ...this.additionalResponses,
      ...additionalResponses
    };
  },

  getResponse(message) {
    if (!message) return this.emptyMessageResponse;

    const responses = {
      ...this.defaultResponses,
      ...this.additionalResponses,
    };

    const { ratings, bestMatchIndex } =
      this.stringSimilarity(message, Object.keys(responses));

    if (ratings[bestMatchIndex].rating <= 0.3) {
      return this.unsuccessfulResponse;
    }

    const response = responses[ratings[bestMatchIndex].target];
    return typeof response === 'function' ? response() : response;
  },

  getResponseAsync(message) {
    return new Promise(resolve =>
      setTimeout(() => resolve(this.getResponse(message)), 1000)
    );
  },

  compareTwoStrings(first, second) {
    first = first.replace(/\s+/g, '');
    second = second.replace(/\s+/g, '');

    if (first === second) return 1;
    if (first.length < 2 || second.length < 2) return 0;

    const bigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const bg = first.substring(i, i + 2);
      bigrams.set(bg, (bigrams.get(bg) || 0) + 1);
    }

    let intersection = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const bg = second.substring(i, i + 2);
      const count = bigrams.get(bg) || 0;
      if (count > 0) {
        bigrams.set(bg, count - 1);
        intersection++;
      }
    }

    return (2 * intersection) / (first.length + second.length - 2);
  },

  stringSimilarity(main, targets) {
    const ratings = targets.map(t => ({
      target: t,
      rating: this.compareTwoStrings(main, t)
    }));

    let bestMatchIndex = 0;
    ratings.forEach((r, i) => {
      if (r.rating > ratings[bestMatchIndex].rating) {
        bestMatchIndex = i;
      }
    });

    return { ratings, bestMatchIndex };
  },
};

export default Chatbot;
