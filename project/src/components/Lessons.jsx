import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  RotateCcw,
  Volume2,
  Mic,
  Send,
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  Star
} from 'lucide-react';
import { apiService, audioUtils, voiceIds } from '../services/api';

const currentLesson = {
  id: 3,
  title: "French Greetings & Politeness",
  character: "Pierre Dubois",
  characterImage: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400",
  progress: 60,
  totalSteps: 5,
  currentStep: 3,
  steps: [
    { id: 1, title: "Basic Greetings", completed: true },
    { id: 2, title: "Formal vs Informal", completed: true },
    { id: 3, title: "Polite Expressions", completed: false, current: true },
    { id: 4, title: "Cultural Context", completed: false },
    { id: 5, title: "Practice Conversation", completed: false }
  ]
};

const lessonContent = {
  question: "Comment allez-vous?",
  english: "How are you? (formal)",
  answer: "Je vais bien, merci",
  englishAnswer: "I am well, thank you",
  hint: "Remember to use the formal 'vous' form when speaking to someone you don't know well",
  pronunciation: "koh-mahn tah-lay voo",
  culturalNote: "In France, this formal greeting is used in professional settings or when meeting someone for the first time."
};

const pierreVoiceId = '7c65Pcpdzr0GkR748U7h'; // Pierre Dubois (French chef) ElevenLabs voice ID

export default function Lessons() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [pronunciationFeedback, setPronunciationFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newAttempt = {
      text: userInput,
      isCorrect: userInput.toLowerCase().includes('je vais bien')
    };

    setAttempts([...attempts, newAttempt]);
    setShowAnswer(true);

    if (newAttempt.isCorrect) {
      setFeedback('Excellent! Perfect pronunciation and grammar!');
    } else {
      setFeedback('Good try! Let\'s practice the correct pronunciation.');
    }

    setUserInput('');
  };

  const handlePronunciationCheck = () => {
    setIsListening(true);
    setPronunciationFeedback('🎤 Listening...');

    // Simulate pronunciation check
    setTimeout(() => {
      setIsListening(false);
      setPronunciationFeedback('✅ Great pronunciation! Your accent is improving!');
    }, 2000);
  };

  // Determine the character ID for this lesson
  const characterId = 'french-basics'; // Update this if dynamic per lesson
  const handlePlayAudio = async () => {
    try {
      const audioBlob = await apiService.speak(lessonContent.question, voiceIds[characterId], true);
      await audioUtils.playAudio(audioBlob);
    } catch (error) {
      alert('Audio playback failed: ' + error.message);
    }
  };

  const nextStep = () => {
    if (currentLesson.currentStep < currentLesson.totalSteps) {
      // Navigate to next step
      console.log('Moving to next step');
    }
  };

  const previousStep = () => {
    if (currentLesson.currentStep > 1) {
      // Navigate to previous step
      console.log('Moving to previous step');
    }
  };

  return (
    <div className="min-h-screen pt-6 sm:pt-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl transition-all duration-300 text-slate-300 bg-slate-800/50 hover:bg-slate-700 text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            Back to Home
          </button>

          <div className="text-center">
            <h1 className="text-lg sm:text-2xl font-bold text-white">{currentLesson.title}</h1>
            <p className="text-slate-400 text-sm sm:text-base">with {currentLesson.character}</p>
          </div>

          <div className="w-20 sm:w-32"></div>
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-700">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="font-semibold text-white text-sm sm:text-base">Lesson Progress</span>
            <span className="text-slate-400 text-sm sm:text-base">{currentLesson.progress}% Complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3 mb-3 sm:mb-4">
            <div
              className="h-2 sm:h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-400 to-cyan-400"
              style={{ width: `${currentLesson.progress}%` }}
            ></div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between">
            {currentLesson.steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${step.completed ? 'text-white bg-gradient-to-r from-blue-400 to-cyan-400' :
                    step.current ? 'text-slate-900 bg-gradient-to-r from-yellow-400 to-orange-400' :
                      'text-slate-400 bg-slate-700'
                    }`}
                >
                  {step.completed ? <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" /> : step.id}
                </div>
                <span className="text-xs mt-1 sm:mt-2 text-center max-w-12 sm:max-w-16 text-slate-400">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Character Section */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 mb-6 sm:mb-8 border border-slate-700">
          <div className="flex items-center mb-4 sm:mb-6">
            <img
              src={currentLesson.characterImage}
              alt={currentLesson.character}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mr-3 sm:mr-4"
            />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{currentLesson.character}</h2>
              <p className="text-slate-400 text-sm sm:text-base">Your French tutor</p>
            </div>
          </div>

          {/* Question Section */}
          <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 bg-slate-700/50 border border-slate-600">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-3">
              <h3 className="text-base sm:text-lg font-semibold text-white">Listen and Repeat:</h3>
              <button
                onClick={handlePlayAudio}
                className="flex items-center px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 text-sm sm:text-base"
              >
                <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Play Audio
              </button>
            </div>

            <div className="text-2xl sm:text-3xl font-bold mb-2 text-blue-300">
              {lessonContent.question}
            </div>
            <div className="text-base sm:text-lg mb-3 sm:mb-4 text-slate-400">
              {lessonContent.english}
            </div>

            <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 bg-slate-600/50 border border-slate-500">
              <div className="flex items-center mb-2">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-400" />
                <span className="font-medium text-white text-sm sm:text-base">Pronunciation:</span>
              </div>
              <p className="text-blue-300 text-sm sm:text-base">{lessonContent.pronunciation}</p>
            </div>

            <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 bg-yellow-500/20 border border-yellow-400/30">
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-400" />
                <span className="font-medium text-white text-sm sm:text-base">Cultural Note:</span>
              </div>
              <p className="text-yellow-200 text-sm sm:text-base">{lessonContent.culturalNote}</p>
            </div>
          </div>

          {/* User Attempts */}
          <div className="mb-4 sm:mb-6">
            <h4 className="font-semibold mb-2 sm:mb-3 text-white text-sm sm:text-base">Your Attempts:</h4>
            <div className="space-y-2 max-h-24 sm:max-h-32" style={{ overflowY: 'auto' }}>
              {attempts.length === 0 ? (
                <p className="text-center py-3 sm:py-4 italic text-slate-400 text-sm sm:text-base">
                  Your attempts will appear here...
                </p>
              ) : (
                attempts.map((attempt, index) => (
                  <div key={index} className="flex items-center justify-end">
                    <div className={`max-w-xs px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl flex items-center text-sm sm:text-base ${attempt.isCorrect ? 'bg-green-500/20 border border-green-400/30' : 'bg-red-500/20 border border-red-400/30'
                      }`}>
                      {attempt.isCorrect ? (
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-green-400" />
                      ) : (
                        <XCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-red-400" />
                      )}
                      <span className="text-white">{attempt.text}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Input Section */}
          <form onSubmit={handleSubmit} className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your response in French..."
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-slate-600 focus:outline-none transition-colors bg-slate-700/50 text-white placeholder-slate-400 focus:border-blue-400 text-sm sm:text-base"
              />
              <button
                type="submit"
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 text-sm sm:text-base"
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Send
              </button>
            </div>
          </form>

          {/* Feedback */}
          {feedback && (
            <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl mb-4 sm:mb-6 ${feedback.includes('Excellent') ? 'bg-green-500/20 border border-green-400/30' : 'bg-yellow-500/20 border border-yellow-400/30'
              }`}>
              <p className="font-medium text-white text-sm sm:text-base">{feedback}</p>
              {showAnswer && (
                <div className="mt-2 sm:mt-3 p-2 sm:p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                  <p className="font-semibold text-blue-300 text-sm sm:text-base">
                    Correct Answer: {lessonContent.answer}
                  </p>
                  <p className="text-slate-400 text-xs sm:text-sm">({lessonContent.englishAnswer})</p>
                </div>
              )}
            </div>
          )}

          {/* Pronunciation Practice */}
          <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-orange-500/20 border border-orange-400/30">
            <h4 className="font-semibold mb-2 sm:mb-3 flex items-center text-white text-sm sm:text-base">
              <Mic className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Practice Speaking
            </h4>
            <p className="mb-3 sm:mb-4 text-slate-300 text-sm sm:text-base">
              Click the button below and speak the French phrase aloud for pronunciation feedback.
            </p>
            <button
              onClick={handlePronunciationCheck}
              disabled={isListening}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex items-center bg-gradient-to-r from-red-400 to-orange-400 text-white disabled:opacity-50 text-sm sm:text-base"
            >
              <Mic className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              {isListening ? 'Listening...' : 'Check Pronunciation'}
            </button>
            {pronunciationFeedback && (
              <p className="mt-2 sm:mt-3 font-medium text-orange-200 text-sm sm:text-base">
                {pronunciationFeedback}
              </p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-3">
          <button
            onClick={previousStep}
            disabled={currentLesson.currentStep === 1}
            className="flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 bg-slate-700 text-slate-300 hover:bg-slate-600 text-sm sm:text-base order-2 sm:order-1"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Previous Step
          </button>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 order-1 sm:order-2">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 bg-slate-600 text-white hover:bg-slate-500 text-sm sm:text-base"
            >
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Practice Again
            </button>

            <button
              onClick={nextStep}
              disabled={currentLesson.currentStep === currentLesson.totalSteps}
              className="flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 text-sm sm:text-base"
            >
              Next Step
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}