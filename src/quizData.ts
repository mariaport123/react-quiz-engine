import { Question } from './types';

// Quiz questions data for the application
export const questions: Question[] = [
  {
    id: 1,
    questionText: "Mitu elanikku elas Eestis 2024. aasta seisuga?",
    options: [
      { id: 'a', text: "1 150 200" },
      { id: 'b', text: "1 374 687" },
      { id: 'c', text: "1 520 000" }
    ],
    correctAnswerId: 'b' // Correct: b (Middle)
  },
  {
    id: 2,
    questionText: "Mis on Statistikaameti peamine andmete kogumise meetod?",
    options: [
      { id: 'a', text: "Erinevad registrid ja küsimustikud" }, // Moved to first
      { id: 'b', text: "Ainult tänavaküsitlused" },
      { id: 'c', text: "Sotsiaalmeedia jälgimine" }
    ],
    correctAnswerId: 'a' // Correct: a (First)
  },
  {
    id: 3,
    questionText: "Kui tihti toimub Eestis tavaliselt rahva ja eluruumide loendus?",
    options: [
      { id: 'a', text: "Iga 5 aasta tagant" },
      { id: 'b', text: "Iga 20 aasta tagant" },
      { id: 'c', text: "Iga 10 aasta tagant" } // Moved to last
    ],
    correctAnswerId: 'c' // Correct: c (Last)
  },
  {
    id: 4,
    questionText: "Mida tähistab lühend SKP statistikas?",
    options: [
      { id: 'a', text: "Sotsiaalne Kogupreemia" },
      { id: 'b', text: "Sisemajanduse Koguprodukt" },
      { id: 'c', text: "Statistiline Kogumisplaan" }
    ],
    correctAnswerId: 'b' // Correct: b (Middle)
  },
  {
    id: 5,
    questionText: "Milline neist on Statistikaameti peamine andmebaas?",
    options: [
      { id: 'a', text: "Statistika andmebaas" }, // Moved to first
      { id: 'b', text: "Riigiteataja" },
      { id: 'c', text: "Rahvastikuregister" }
    ],
    correctAnswerId: 'a' // Correct: a (First)
  }
];