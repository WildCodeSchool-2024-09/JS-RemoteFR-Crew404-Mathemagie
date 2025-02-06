import animals from "../assets/images/Animals.png";
import busBus from "../assets/images/BusBus.png";
import moto from "../assets/images/Moto.png";
import billets from "../assets/images/billets.png";
import caisse from "../assets/images/caisse.png";
import decapo from "../assets/images/decapo.png";
import enfants from "../assets/images/enfants.png";
import s from "../assets/images/s.png";
import somme from "../assets/images/somme.png";

const questionsCarGame = [
  {
    question: "Il y'a combien de voitures ?",
    answer: 10,
    image: caisse,
    options: [4, 5, 10, "Je ne sais pas"],
  },
  {
    question: "Il y'a combien de voitures noires ?",
    answer: 2,
    image: caisse,
    options: [4, 5, 2, "Je ne sais pas"],
  },

  {
    question: "Compte les billets de 20€ ?",
    answer: 7,
    image: s,
    options: [7, 6, 5, "Je ne sais pas"],
  },
  {
    question: "Compte le nombre d'animaux ?",
    answer: 9,
    image: animals,
    options: [11, 8, 9, "Je ne sais pas"],
  },
  {
    question: "Quelle est la somme des 2 billets ?",
    answer: 100,
    image: somme,
    options: [90, 100, 73, "Je ne sais pas"],
  },
  {
    question: "Quel est le nombre de voitures décapotables ?",
    answer: 4,
    image: decapo,
    options: [2, 4, 6, "Je ne sais pas"],
  },
  {
    question: "Combien d'enfants ont les cheveux de couleur noire' ?",
    answer: 3,
    image: enfants,
    options: [8, 6, 3, "Je ne sais pas"],
  },
  {
    question: "Quelle est la somme de ces 2 billets ?",
    answer: 35,
    image: billets,
    options: [32, 35, 43, "Je ne sais pas"],
  },
  {
    question: "Combien de roues possède chaque moto ?",
    answer: 2,
    image: moto,
    options: [2, 3, 7, "Je ne sais pas"],
  },
  {
    question: "Combien de vitres possède ce bus ?",
    answer: 10,
    image: busBus,
    options: [8, 12, 10, "Je ne sais pas"],
  },
];

export default questionsCarGame;
