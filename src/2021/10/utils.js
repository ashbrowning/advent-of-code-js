const tagPairs = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<'
};

const openTags = new Set();
Object.values(tagPairs).forEach(t => openTags.add(t));

const closeTags = new Set();
Object.keys(tagPairs).forEach(t => closeTags.add(t));

const scores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};

const incompleteScores = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4
};

export { closeTags, incompleteScores, openTags, scores, tagPairs };
