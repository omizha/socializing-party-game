import { Query } from '../../../../hook';
import QuizSelectAnswer from './QuizSelectAnswer';

const Quiz = () => {
  Query.useQuiz();

  return <QuizSelectAnswer />;
};

export default Quiz;
