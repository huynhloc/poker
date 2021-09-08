import _ from "lodash";

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

const count = (c, face) => {
  c[face] = (c[face] || 0) + 1;
  return c;
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
  return _.shuffle(deck);
};

export const getTop5Cards = (deck) => {
  return deck.length - 5 >= 0 ? deck.splice(0, 5) : [];
};

export const getRank = (cards) => {
  const suitsInOrder = cards.map((card) => card.suit).sort();
  const facesInOrder = cards.map((card) => card.compareFace).sort();
  const counts = facesInOrder.reduce(count, {});
  const compareCountAndFacec = (face1, face2) => {
    const countDiff = counts[face2] - counts[face1];
    if (countDiff) return countDiff;

    // if 2 faces are same count
    if (face2 > face1) return -1;
    // face1 should before face2
    else if (face2 === face1) return 0;
    else return 1; // face1 should after face2
  };

  const duplicates = _.values(counts).reduce(count, {});
  const flush = suitsInOrder[0] === suitsInOrder[4];
  const first = facesInOrder[0].charCodeAt(0);
  const straight = facesInOrder.every(
    (f, index) => f.charCodeAt(0) - first === index
  );
  const rank =
    (flush && straight && facesInOrder[0] === "A" && 1) ||
    (flush && straight && 2) ||
    (duplicates[4] && 3) ||
    (duplicates[3] && duplicates[2] && 4) ||
    (flush && 5) ||
    (straight && 6) ||
    (duplicates[3] && 7) ||
    (duplicates[2] > 1 && 8) ||
    (duplicates[2] && 9) ||
    10;
  const value = [...facesInOrder].sort(compareCountAndFacec).join("");
  return { rank, value };
};
