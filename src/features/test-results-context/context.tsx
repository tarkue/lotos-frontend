"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

export interface QuestionResult {
  questionId: number;
  correctOptionIds: number[];
  selectedOptionIds: number[];
  isCorrect: boolean;
}

export interface TestResultsContextType {
  results: Map<number, QuestionResult>;
  setResults: (results: Map<number, QuestionResult>) => void;
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
  resetResults: () => void;
}

const TestResultsContext = createContext<TestResultsContextType | undefined>(
  undefined,
);

export const useTestResults = () => {
  const context = useContext(TestResultsContext);
  if (!context) {
    throw new Error("useTestResults must be used within a TestResultsProvider");
  }
  return context;
};

export const TestResultsProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResultsState] = useState<Map<number, QuestionResult>>(
    new Map(),
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const setResults = useCallback((newResults: Map<number, QuestionResult>) => {
    setResultsState(newResults);
    setIsSubmitted(true);
  }, []);

  const resetResults = useCallback(() => {
    setResultsState(new Map());
    setIsSubmitted(false);
  }, []);

  const setIsSubmittedCallback = useCallback((submitted: boolean) => {
    setIsSubmitted(submitted);
  }, []);

  return (
    <TestResultsContext.Provider
      value={{
        results,
        setResults,
        isSubmitted,
        setIsSubmitted: setIsSubmittedCallback,
        resetResults,
      }}
    >
      {children}
    </TestResultsContext.Provider>
  );
};
