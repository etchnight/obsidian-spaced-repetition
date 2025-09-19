import { Card } from "src/card";
import { Deck } from "src/deck";

export function randomReview(deck: Deck, count: number) {
    const allFlashcards = getFlashcardsInDeck(deck);
    const randomFlashcards = allFlashcards.sort(() => Math.random() - 0.5).slice(0, count);
    const randomFlashcardsText = card2text(randomFlashcards);
    console.log(randomFlashcardsText);
}

function getFlashcardsInDeck(deck: Deck, flashcards: Card[] = []) {
    deck.dueFlashcards.forEach((card) => {
        flashcards.push(card);
    });
    deck.newFlashcards.forEach((card) => {
        flashcards.push(card);
    });

    deck.subdecks.forEach((subdeck) => {
        flashcards.push(...getFlashcardsInDeck(subdeck));
    });
    return flashcards;
}

function card2text(cards: Card[]) {
    let question = "";
    let answer = "";
    for (let i = 0; i < cards.length; i++) {
        question +=
            `### 第${i + 1}题 \n\n` +
            ` ${cards[i].front}\n\n` +
            `### 第${i + 1}题 答案\n\n` +
            `---\n\n`;
        answer += `### 第${i + 1}题 \n\n ${cards[i].back}\n\n ---\n\n`;
    }
    return `问题\n\n${question}\n\n答案\n\n${answer}`;
}
