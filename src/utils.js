const suits = ["S", "C", "D", "H"];
const faces = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const compareFaces = [
  "M",
  "L",
  "K",
  "J",
  "I",
  "H",
  "G",
  "F",
  "E",
  "D",
  "C",
  "B",
  "A",
];

export const NUM_OF_CARD_PER_HAND = 5;

export const RANK = {
  ROYAL_FLUSH: { value: 1, title: "royal flush" },
  STRAIGHT_FLUSH: { value: 2, title: "straight flush" },
  FOUR_OF_A_KIND: { value: 3, title: "four of a kind" },
  FULL_HOUSE: { value: 4, title: "full house" },
  FLUSH: { value: 5, title: "flush" },
  STRAIGHT: { value: 6, title: "straight" },
  THREE_OF_A_KIND: { value: 7, title: "three of a kind" },
  TWO_PAIR: { value: 8, title: "two pair" },
  ONE_PAIR: { value: 9, title: "one pair" },
  HIGH_CARD: { value: 10, title: "high card" },
};

export const createDeck = () => {
  const cards = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < faces.length; j++) {
      const card = {
        face: faces[j],
        compareFace: compareFaces[j],
        suit: suits[i],
      };
      cards.push(card);
    }
  }
  return cards;
};

export const shuffle = (deck) => {
  for (let i = 0; i < 1000; i++) {
    const index1 = Math.floor(Math.random() * deck.length);
    const index2 = Math.floor(Math.random() * deck.length);
    const tmp = deck[index1];
    deck[index1] = deck[index2];
    deck[index2] = tmp;
  }
  return [...deck];
};

export const getTopCards = (deck) => {
  return deck.length - NUM_OF_CARD_PER_HAND >= 0
    ? deck.splice(0, NUM_OF_CARD_PER_HAND)
    : [];
};

const count = (c, face) => {
  c[face] = (c[face] || 0) + 1;
  return c;
};

const compareCountAndFacec = (faceCounts) => (face1, face2) => {
  const countDiff = faceCounts[face2] - faceCounts[face1];
  if (countDiff) return countDiff;

  // if 2 faces are same count
  if (face2 > face1) return -1;
  // face1 should before face2
  else if (face2 === face1) return 0;
  else return 1; // face1 should after face2
};

const checkStraight = (facesInOrder) => {
  const firstFaceCharCode = facesInOrder[0].charCodeAt(0);
  return facesInOrder.every(
    (f, index) => f.charCodeAt(0) - firstFaceCharCode === index
  );
};

const checkFlush = (suitsInOrder) => suitsInOrder[0] === suitsInOrder[4];

const getFaceCountsAndFaceValue = (facesInOrder) => {
  const faceCounts = facesInOrder.reduce(count, {});
  const value = [...facesInOrder]
    .sort(compareCountAndFacec(faceCounts))
    .join("");
  return { faceCounts, value };
};

/**
 * This function will return the rank and value of a poker hand
 * value is used in case you want to compare two poker hands of the same rank
 */
export const getRank = (cards) => {
  const suitsInOrder = cards.map((card) => card.suit).sort();
  const facesInOrder = cards.map((card) => card.compareFace).sort();
  const isFlush = checkFlush(suitsInOrder);
  const isStraight = checkStraight(facesInOrder);

  if (isFlush && isStraight && facesInOrder[0] === "A")
    return { rank: RANK.ROYAL_FLUSH, value: "" };

  const { faceCounts, value } = getFaceCountsAndFaceValue(facesInOrder);

  if (isFlush && isStraight) return { rank: RANK.STRAIGHT_FLUSH, value };
  if (isFlush) return { rank: RANK.FLUSH, value };
  if (isStraight) return { rank: RANK.STRAIGHT, value };

  const duplicates = Object.values(faceCounts).reduce(count, {});
  const rank =
    (duplicates[4] && RANK.FOUR_OF_A_KIND) ||
    (duplicates[3] && duplicates[2] && RANK.FULL_HOUSE) ||
    (duplicates[3] && RANK.THREE_OF_A_KIND) ||
    (duplicates[2] > 1 && RANK.TWO_PAIR) ||
    (duplicates[2] && RANK.ONE_PAIR) ||
    RANK.HIGH_CARD;

  return { rank, value };
};
