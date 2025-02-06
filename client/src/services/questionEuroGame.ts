import piece from "../assets/images/Piece.png";
import ad from "../assets/images/ad.png";
import ae from "../assets/images/ae.png";
import cen from "../assets/images/cen.png";
import cent from "../assets/images/cent.png";
import centi from "../assets/images/centi.png";
import ces from "../assets/images/ces.png";
import cinq from "../assets/images/cinq.png";
import jep from "../assets/images/jep.png";
import un from "../assets/images/un.png";

const questionsEuroGame = [
  {
    question: "Combien de centimes valent ces pièces ?",
    answer: 80,
    image: cent,
    options: [45, 50, 80, "Je ne sais pas"],
  },
  {
    question: "Quelle est la somme de ces trois pièces ?",
    answer: 1.22,
    image: centi,
    options: [3, 2.2, 1.22, "Je ne sais pas"],
  },

  {
    question: "Combien de centimes valent toutes les pièces en bronze ?",
    answer: 8,
    image: cen,
    options: [3, 8, 5, "Je ne sais pas"],
  },
  {
    question: "Quelle est la somme totale ?",
    answer: 385,
    image: ces,
    options: [350, 385, 380, "Je ne sais pas"],
  },
  {
    question: "Combien valent ces billets ?",
    answer: 885,
    image: ad,
    options: [880, 885, 888, "Je ne sais pas"],
  },
  {
    question: "Donnez la somme totale ?",
    answer: 300,
    image: jep,
    options: [200, 300, 250, "Je ne sais pas"],
  },
  {
    question: "Combien de billets de 50€ y'a t-il ?",
    answer: 1,
    image: ae,
    options: [5, 6, 1, "Je ne sais pas"],
  },
  {
    question: "Donnez la somme de toutes les pièces contenant de l'or ?",
    answer: 3.8,
    image: piece,
    options: [4.5, 3.5, 3.8, "Je ne sais pas"],
  },
  {
    question: "Combien valent les 5 pièces d'1€?",
    answer: 5,
    image: un,
    options: [6, 4, 5, "Je ne sais pas"],
  },
  {
    question: "Quelle est la somme des billets?",
    answer: 200,
    image: cinq,
    options: [250, 150, 200, "Je ne sais pas"],
  },
];

export default questionsEuroGame;
