# Statistics Estonia Quiz Application (React + TypeScript)

This project is a React-based interactive quiz application developed as a home assignment for the Web Development Internship 2026. The application tests users' knowledge about Estonian statistics while following the official brand guidelines of Statistics Estonia (Statistikaamet).

## Features

- **Interactive Quiz:** 5 questions with 3+ options each, including randomized option ordering.
- **Instant Feedback:** Immediate visual feedback (Correct/Wrong) after each selection.
- **Detailed Results:** A final summary table showing the question, your answer, and the status.
- **Personalized Feedback:** Score-based messages ranging from encouraging to expert-level.
- **CVI Compliance:** Styled according to [brand.stat.ee](https://brand.stat.ee/?lang=et), featuring the official grid pattern, Roboto typography, and specific color palette.
- **Bonus:** Fully implemented using **TypeScript** for better type safety and developer experience.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repository-link>
   cd <project-folder>
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```
The app will be available at http://localhost:5173.

## Testing

The project includes End-to-End (E2E) tests written with Playwright.

### Running Tests
To run the tests, ensure the development server is running, then use:

```bash
npx playwright test
```

#### The tests cover:

- Successful application loading.
- Correct answer logic (score increment).
- Incorrect answer handling.
- Display of the final results table and personalized message.

## Project Links

- **Code Repository:** [GitHub](https://github.com/mariaport123/react-quiz-engine)
- **Live Demo:** [Vercel](https://react-quiz-engine.vercel.app/)

## Tech Stack 

- **Framework:** React 18 (Vite)
- **Language:** TypeScript
- **Styling:** CSS3 (Custom properties & Grid system)
- **Testing:** Playwright E2E

## Author

- **Maria Port** – [GitHub](https://github.com/mariaport123)