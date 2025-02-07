import { useEffect, useState } from "react";
import Question from "./Question";
import toast from "react-hot-toast";

const Home = () => {
  const [allData, setData] = useState();
  const [loading, setLoading]=useState(false)

  //loading Data
  useEffect(() => {
    setLoading(true);
    fetch("/api/Uw5CrX#")
      .then((res) => res.json())
      .then((data) => {
        setData(data?.questions);
        setLoading(false);
      });
  }, []);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // Handle option selection
  const handleOptionChange = (questionId, optionId) => {
    if (!submitted) {
      setSelectedAnswers((prev) => {
        const prevOptions = prev[questionId] || [];
        return {
          ...prev,
          [questionId]: prevOptions?.includes(optionId)
            ? prevOptions?.filter((id) => id !== optionId)
            : [...prevOptions, optionId],
        };
      });
    }
  };

  // Submit all questions at once
  const handleSubmit = () => {
    // Check if all questions are answered
    const allAnswered = allData?.every(
      (q) => selectedAnswers[q?.id] && selectedAnswers[q?.id].length > 0
    );

    if (!allAnswered) {
      toast.error("🚨 Please complete all questions before submitting!")
      return;
    }

    let correctCount = 0;
    let incorrectCount = 0;

    allData?.forEach((question) => {
      const correctAnswers = question?.options
        .filter((opt) => opt?.is_correct)
        .map((opt) => opt?.id);

      const selected = selectedAnswers[question.id] || [];

      const hasWrongSelection = selected?.some(
        (optId) => !correctAnswers?.includes(optId)
      );
      const hasAllCorrect =
        correctAnswers?.every((optId) => selected?.includes(optId)) &&
        selected?.length === correctAnswers?.length;

      if (hasWrongSelection) {
        incorrectCount++; // Mark the question as incorrect if any wrong option is selected
      } else if (hasAllCorrect) {
        correctCount++; // Mark the question as correct if all correct options are chosen
      }
    });

    setScore({
      correct: correctCount,
      incorrect: incorrectCount,
      total: allData.length,
    });
    setSubmitted(true);
    toast.success(`�� Quiz submitted successfully! }`);
  };

  if (loading) {
    return <div className="text-4xl font-bold text-blue-600 m-4 md:m-20">Loading...</div>;
  }

  return (
    <div className="mb-10 md:mx-6">
      {allData?.map(( question) => (
        <Question
          key={question?.id}
          q={(question)}
          selectedOptions={selectedAnswers[question?.id] || []}
          handleOptionChange={handleOptionChange}
          submitted={submitted}
        ></Question>
      ))}

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit Quiz
        </button>
      )}

      {score !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
            Final Result
          </h1>
          <p className="text-green-600">
            ✅ Correct: {score.correct} / {score.total}
          </p>
          <p className="text-red-600">❌ Incorrect: {score.incorrect}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
