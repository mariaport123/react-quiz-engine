import { Question } from './types';

export const questions: Question[] = [
  {
    id: 1,
    questionText: "Mis on Eesti pealinn?",
    options: [
      { id: 'a', text: "Tallinn" },
      { id: 'b', text: "Tartu" },
      { id: 'c', text: "Narva" }
    ],
    correctAnswerId: 'a'
  },
  {
    id: 2,
    questionText: "Millal asutati Eesti Statistikaamet?",
    options: [
      { id: 'a', text: "1921" },
      { id: 'b', text: "1991" },
      { id: 'c', text: "1918" }
    ],
    correctAnswerId: 'a'
  },
  {
    id: 3,
    questionText: "Kes on Statistikaameti peadirektor?",
    options: [
      { id: 'a', text: "Urmas Reinsalu" },
      { id: 'b', text: "Urmet Lee" },
      { id: 'c', text: "Kaja Kallas" }
    ],
    correctAnswerId: 'b'
  }
];