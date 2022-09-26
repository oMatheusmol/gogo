import { createContext, useReducer } from 'react';
// import questions from '../data/questions_complete';
import axios from 'axios';
import http from 'http';

const STAGES = ['Start', 'Category', 'Playing', 'End'];
const questions = async () => {
  const result = await (await axios.get('http://localhost:3000/questions')).data;
  const facil = result.filter((i) => {
    if (i.categoria === 'facil') return i;
  });
  const dificil = result.filter((i) => {
    if (i.categoria === 'dificil') return i;
  });
  const medio = result.filter((i) => {
    if (i.categoria === 'medio') return i;
  });
  return [
    {
      category: facil[0].categoria,
      questions: facil.map((e) => {
        return {
          question: e.pergunta,
          options: [e.opcoes_a, e.opcao_b, e.opcao_c, e.opcao_d],
          answer: e.resposta,
        };
      }),
    },
    {
      category: medio[0].categoria,
      questions: medio.map((e) => {
        return {
          question: e.pergunta,
          options: [e.opcoes_a, e.opcao_b, e.opcao_c, e.opcao_d],
          answer: e.resposta,
        };
      }),
    },
    {
      category: dificil[0].categoria,
      questions: dificil.map((e) => {
        return {
          question: e.pergunta,
          options: [e.opcoes_a, e.opcao_b, e.opcao_c, e.opcao_d],
          answer: e.resposta,
        };
      }),
    },
  ];
};

const initialState = {
  gameStage: STAGES[0],
  questions: await questions(),
  currentQuestion: 0,
  answerSelected: false,
  score: 0,
  help: false,
  optionToHide: null,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_STAGE':
      return {
        ...state,
        gameStage: STAGES[1],
      };

    case 'START_GAME':
      let quizQuestions = null;

      state.questions.forEach((question) => {
        if (question.category === action.payload) {
          quizQuestions = question.questions;
        }
      });

      return {
        ...state,
        questions: quizQuestions,
        gameStage: STAGES[2],
      };

    case 'REORDER_QUESTIONS':
      const reorderedQuestions = state.questions.sort(() => {
        return Math.random() - 0.5;
      });

      return {
        ...state,
        questions: reorderedQuestions,
      };

    case 'CHANGE_QUESTION': {
      const nextQuestion = state.currentQuestion + 1;
      let endGame = false;

      if (!state.questions[nextQuestion]) {
        endGame = true;
      }

      return {
        ...state,
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[3] : state.gameStage,
        answerSelected: false,
        help: false,
      };
    }

    case 'NEW_GAME': {
      return initialState;
    }

    case 'CHECK_ANSWER': {
      if (state.answerSelected) return state;

      const answer = action.payload.answer;
      const option = action.payload.option;
      let correctAnswer = 0;

      if (answer === option) correctAnswer = 1;

      return {
        ...state,
        score: state.score + correctAnswer,
        answerSelected: option,
      };
    }

    case 'SHOW_TIP': {
      return {
        ...state,
        help: 'tip',
      };
    }

    default:
      return state;
  }
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(quizReducer, initialState);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
