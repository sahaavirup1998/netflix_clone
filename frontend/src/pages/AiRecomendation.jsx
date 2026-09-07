import React, { useState } from "react";
import { toast } from "react-toastify";
import { getAiRecommendation } from "../lib/AIModel";

const AiRecommendation = () => {
  const steps = [
    {
      name: "genre",
      label: "What's your favorite genre?",
      options: [
        "Action",
        "Comedy",
        "Drama",
        "Horror",
        "Romance",
        "Sci-Fi",
        "Animation",
      ],
    },
    {
      name: "mood",
      label: "What's your current mood?",
      options: [
        "Excited",
        "Relaxed",
        "Thoughtful",
        "Scared",
        "Inspired",
        "Romantic",
      ],
    },
    {
      name: "decade",
      label: "Preferred decade?",
      options: ["2020s", "2010s", "2000s", "1990s", "Older"],
    },
    {
      name: "language",
      label: "Preferred language?",
      options: ["English", "Hindi", "Korean", "Spanish", "French", "Other"],
    },
    {
      name: "length",
      label: "Preferred movie length?",
      options: ["Short (<90 min)", "Standard (90-120 min)", "Long (>120 min)"],
    },
  ];

  // Initial form state
  const initialState = steps.reduce((acc, currentStep) => {
    acc[currentStep.name] = "";
    return acc;
  }, {});

  const [input, setInput] = useState(initialState);
  const [step, setStep] = useState(0);
  const [recommendation, setRecommendation] = useState([]);
  const [loading, setLoading] = useState(false);

  // Current question
  const currentStep = steps[step];

  // Select option
  const handleOptionSelect = (option) => {
    setInput((prev) => ({
      ...prev,
      [currentStep.name]: option,
    }));
  };

  // Generate recommendation
  const generateRecommendation = async () => {
    if (
      !input.genre ||
      !input.mood ||
      !input.decade ||
      !input.language ||
      !input.length
    ) {
      toast.error(
        "Please answer all questions before generating a recommendation!",
      );
      return;
    }

    setLoading(true);

    const userPrompt = `
      You are a movie recommendation assistant.

      Based on the user's preferences below, recommend 15 movies.

      Genre: ${input.genre}
      Mood: ${input.mood}
      Preferred decade: ${input.decade}
      Preferred language: ${input.language}
      Preferred movie length: ${input.length}

      Return ONLY valid JSON.

      The response must be an array of objects using exactly this structure:

      [
        {
          "title": "Movie title",
          "year": 2020,
          "language": "English",
          "genre": "Action",
          "reason": "Why this movie matches the user's preferences"
        }
      ]
    `;

    try {
      const response = await getAiRecommendation(userPrompt);

      if (!response) {
        toast.error("No recommendation received.");
        return;
      }

      console.log("AI Response:", response);

      const recommendationResponse = JSON.parse(response);

      if (!Array.isArray(recommendationResponse)) {
        throw new Error("Invalid recommendation format");
      }

      setRecommendation(recommendationResponse);

      toast.success("Recommendations generated!");
    } catch (error) {
      console.error("Error parsing AI recommendation:", error);
      toast.error("Failed to generate recommendation.");
    } finally {
      setLoading(false);
    }
  };

  // Next button
  const handleNext = () => {
    if (!input[currentStep.name]) {
      toast.error("Please select an option!");
      return;
    }

    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      generateRecommendation();
    }
  };

  // Back button
  const handleBack = () => {
    if (step > 0 && !loading) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#141414] flex flex-col items-center justify-start relative px-4 py-8">
      {/* Background Image */}
      <img
        src="/bg_banner.jpg"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover opacity-20 blur-[2px] pointer-events-none"
      />

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md mx-auto rounded-2xl bg-[#181818] shadow-2xl border border-[#333333] px-8 py-10 flex flex-col items-center gap-4 min-h-[550px]">
        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-8 text-center text-white tracking-tight drop-shadow-lg">
          AI Movie Recommendations
        </h2>

        {/* Progress Bar */}
        <div className="w-full flex items-center justify-between mb-8">
          <div className="h-2 flex-1 bg-[#232323] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#e50914] transition-all duration-300 ease-in-out"
              style={{
                width: `${((step + 1) / steps.length) * 100}%`,
              }}
            />
          </div>

          <span className="text-white font-bold ml-4 text-sm">
            {step + 1}/{steps.length}
          </span>
        </div>

        {/* Question */}
        <div className="flex flex-col items-center flex-1 gap-4 w-full">
          <div className="flex-1 mb-6 w-full">
            <h3 className="text-lg font-bold text-white mb-4 text-center">
              {currentStep.label}
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 gap-4">
              {currentStep.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  disabled={loading}
                  className={`w-full py-3 rounded-xl border-2 font-semibold text-base text-white flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    input[currentStep.name] === option
                      ? "bg-[#e50914] border-[#e50914]"
                      : "bg-[#232323] border-[#333333] hover:border-[#e50914]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-6 w-full">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0 || loading}
                className={`py-2 px-6 text-white font-semibold rounded-lg border-2 transition-colors duration-300 ${
                  step === 0 || loading
                    ? "opacity-40 cursor-not-allowed"
                    : "bg-[#181818] hover:bg-[#232323] border-[#444444] cursor-pointer"
                }`}
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="py-2 px-6 bg-[#e50914] text-white font-semibold rounded-lg hover:bg-[#f40612] border-2 border-[#e50914] transition-colors duration-300 cursor-pointer disabled:opacity-50"
              >
                {loading
                  ? "Generating..."
                  : step === steps.length - 1
                    ? "Submit"
                    : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations List Container */}
      {recommendation.length > 0 && (
        <div className="relative z-10 w-full mt-8 max-w-7xl mx-auto rounded-2xl bg-[#181818] shadow-2xl border border-[#333333] px-6 py-8">
          {/* Heading */}
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Recommended Movies
          </h3>

          {/* Movie Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {recommendation.map((movie, index) => (
              <div
                key={`${movie.title}-${index}`}
                className="group bg-[#232323] border border-[#333333] rounded-xl p-5 text-white 
                     min-h-[230px] flex flex-col
                     transition-all duration-300
                     hover:-translate-y-1 hover:border-[#e50914]
                     hover:shadow-lg hover:shadow-red-900/20"
              >
                {/* Movie Number */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500">
                    #{index + 1}
                  </span>

                  <span className="text-xs px-2 py-1 rounded-full bg-[#333333] text-gray-300">
                    {movie.year}
                  </span>
                </div>

                {/* Movie Title */}
                <h4 className="text-lg font-bold text-[#e50914] group-hover:text-red-500">
                  {movie.title}
                </h4>

                {/* Movie Info */}
                <p className="text-sm text-gray-400 mt-2">
                  {movie.language} • {movie.genre}
                </p>

                {/* Reason */}
                <p className="text-sm text-gray-300 mt-4 leading-relaxed">
                  {movie.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiRecommendation;
