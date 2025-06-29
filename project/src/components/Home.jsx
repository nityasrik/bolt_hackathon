import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  Star,
  Trophy,
  Flame,
  BookOpen,
  ChevronRight,
  Sparkles,
  Award,
  Target,
  Zap,
  TrendingUp
} from 'lucide-react';

const characters = [
  {
    id: "french-basics",
    name: "Pierre",
    title: "French Chef",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Master French cuisine vocabulary and dining etiquette with a passionate Parisian chef",
    level: "Beginner",
    accent: "🇫🇷 French",
    personality: "Warm, encouraging, loves sharing cultural stories",
    gradient: "from-blue-400 via-cyan-400 to-teal-400",
    glowColor: "shadow-cyan-500/25"
  },
  {
    id: "spanish-conversation",
    name: "María",
    title: "Spanish Teacher",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Practice natural Spanish conversations with an energetic teacher from Madrid",
    level: "Intermediate",
    accent: "🇪🇸 Spanish",
    personality: "Enthusiastic, patient, loves cultural exchange",
    gradient: "from-orange-400 via-red-400 to-pink-400",
    glowColor: "shadow-red-500/25"
  },
  {
    id: "korean-basics",
    name: "Minjun",
    title: "Korean Actor",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Learn Korean pronunciation and K-culture with a friendly Seoul-based actor",
    level: "Beginner",
    accent: "🇰🇷 Korean",
    personality: "Creative, fun-loving, pop culture enthusiast",
    gradient: "from-purple-400 via-pink-400 to-rose-400",
    glowColor: "shadow-purple-500/25"
  },
];

const userProgress = {
  lastLesson: "French Basics - Lesson 3",
  streak: 7,
  xp: 2450,
  completedLessons: 18,
  totalLessons: 60
};

const motivationalQuotes = [
  "Learning a new language is like gaining a new soul. – Czech Proverb",
  "The limits of my language mean the limits of my world. – Ludwig Wittgenstein",
  "To have another language is to possess a second soul. – Charlemagne",
  "Language is the road map of a culture. – Rita Mae Brown"
];

const funFacts = [
  "Did you know? The French language has over 100,000 words, but most French speakers only use about 3,000 in daily conversation! 🇫🇷",
  "Spanish is spoken by over 500 million people worldwide, making it the 2nd most spoken language! 🌍",
  "Korean has 14 basic consonants and 10 basic vowels, creating a surprisingly logical writing system. 한글",
  "Learning a second language can delay dementia by up to 5 years and improve cognitive flexibility! 🧠"
];

export default function Home() {
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 6000);

    const factInterval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length);
    }, 8000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(factInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24 xl:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-indigo-500/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 sm:w-80 h-40 sm:h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 sm:w-64 h-32 sm:h-64 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-8 sm:mb-12">
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl mb-4 sm:mb-0 sm:mr-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 shadow-2xl shadow-blue-500/25 animate-pulse">
              <Sparkles className="h-10 w-10 sm:h-16 sm:w-16 text-white" />
            </div>
            <h1 className="text-4xl sm:text-7xl lg:text-9xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Voicenar</span><span className="text-indigo-400 align-baseline">y</span>
            </h1>
          </div>
          <p className="text-lg sm:text-2xl lg:text-4xl mb-8 sm:mb-16 max-w-5xl mx-auto leading-relaxed text-slate-300 font-light px-4">
            Your AI-powered language learning adventure awaits! Master new languages with personalized tutors and immersive conversations. ✨
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center px-4">
            <button
              onClick={() => document.getElementById('characters')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 hover:shadow-blue-500/40"
            >
              <Play className="h-5 w-5 sm:h-6 sm:w-6 inline mr-2 sm:mr-3" />
              Start Learning Now
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 inline ml-2 sm:ml-3 group-hover:animate-bounce" />
            </button>
            <button
              onClick={() => navigate('/progress')}
              className="px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl border-2 border-slate-600 text-slate-300 hover:text-white hover:border-blue-400 hover:bg-slate-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 inline mr-2 sm:mr-3" />
              View Progress
            </button>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-white">Your Learning Journey</h2>
            <p className="text-lg sm:text-2xl text-slate-400">Track your progress and celebrate achievements</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center shadow-2xl hover:shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-slate-700/50">
              <div className="rounded-full w-12 h-12 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-6 bg-gradient-to-r from-red-400 to-orange-400 shadow-xl shadow-red-500/25">
                <Flame className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-3 text-red-400">{userProgress.streak}</h3>
              <p className="font-semibold text-xs sm:text-base text-slate-300">Day Streak</p>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-slate-700/50">
              <div className="rounded-full w-12 h-12 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 shadow-xl shadow-yellow-500/25">
                <Trophy className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-3 text-yellow-400">{userProgress.xp}</h3>
              <p className="font-semibold text-xs sm:text-base text-slate-300">XP Points</p>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-slate-700/50">
              <div className="rounded-full w-12 h-12 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-xl shadow-blue-500/25">
                <BookOpen className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-3 text-blue-400">{userProgress.completedLessons}</h3>
              <p className="font-semibold text-xs sm:text-base text-slate-300">Lessons Completed</p>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-slate-700/50">
              <div className="rounded-full w-12 h-12 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 shadow-xl shadow-purple-500/25">
                <Target className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-3 text-purple-400">{Math.round((userProgress.completedLessons / userProgress.totalLessons) * 100)}%</h3>
              <p className="font-semibold text-xs sm:text-base text-slate-300">Course Progress</p>
            </div>
          </div>
        </div>
      </section>

      {/* Character Selection */}
      <section id="characters" className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-white">Choose Your AI Language Tutor</h2>
            <p className="text-lg sm:text-2xl text-slate-400">Meet your personalized learning companions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {characters.map((char) => (
              <div
                key={char.id}
                className={`group bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden hover:shadow-2xl ${char.glowColor} transition-all duration-500 transform hover:-translate-y-4 cursor-pointer border border-slate-700/50`}
                onClick={() => navigate(`/chat/${char.id}`)}
              >
                <div className="relative h-48 sm:h-72 overflow-hidden">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute top-3 sm:top-6 right-3 sm:right-6">
                    <span className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-slate-900 bg-gradient-to-r ${char.gradient} shadow-lg`}>
                      {char.level}
                    </span>
                  </div>
                  <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6">
                    <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold bg-slate-800/90 text-white backdrop-blur-sm">
                      {char.accent}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-8">
                  <h3 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3 text-white">{char.name}</h3>
                  <p className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-slate-300">{char.title}</p>
                  <p className="mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base text-slate-400">{char.description}</p>
                  <p className="text-xs sm:text-sm mb-4 sm:mb-8 italic text-slate-500">"{char.personality}"</p>

                  <button className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center bg-gradient-to-r ${char.gradient} text-slate-900 shadow-xl ${char.glowColor}`}>
                    Start Learning with {char.name}
                    <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 ml-2 sm:ml-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivational Content */}
      <section className="py-12 sm:py-16 lg:py-24 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Quote */}
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl border border-slate-700/50 hover:shadow-blue-500/20 transition-all duration-300">
              <div className="flex items-center mb-4 sm:mb-8">
                <Star className="h-6 w-6 sm:h-10 sm:w-10 mr-3 sm:mr-4 text-yellow-400" />
                <h3 className="text-xl sm:text-3xl font-bold text-white">Daily Inspiration</h3>
              </div>
              <blockquote className="text-lg sm:text-xl lg:text-2xl italic leading-relaxed mb-4 sm:mb-8 text-slate-300">
                "{motivationalQuotes[currentQuote]}"
              </blockquote>
              <div className="flex justify-center space-x-2 sm:space-x-3">
                {motivationalQuotes.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentQuote ? 'bg-blue-400 scale-125' : 'bg-slate-600'
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Fun Fact */}
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl border border-slate-700/50 hover:shadow-cyan-500/20 transition-all duration-300">
              <div className="flex items-center mb-4 sm:mb-8">
                <Award className="h-6 w-6 sm:h-10 sm:w-10 mr-3 sm:mr-4 text-cyan-400" />
                <h3 className="text-xl sm:text-3xl font-bold text-white">Fun Fact</h3>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed mb-4 sm:mb-8 text-slate-300">
                {funFacts[currentFact]}
              </p>
              <div className="flex justify-center space-x-2 sm:space-x-3">
                {funFacts.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentFact ? 'bg-cyan-400 scale-125' : 'bg-slate-600'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Lesson CTA */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-indigo-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-8">
            Ready to Continue Your Journey?
          </h2>
          <p className="text-lg sm:text-2xl text-slate-300 mb-8 sm:mb-12">
            Pick up where you left off: <span className="font-bold text-blue-400">{userProgress.lastLesson}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <button
              onClick={() => navigate('/lessons')}
              className="px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 hover:shadow-blue-500/40"
            >
              <Play className="h-5 w-5 sm:h-6 sm:w-6 inline mr-2 sm:mr-3" />
              Resume Lesson
            </button>
            <button
              onClick={() => navigate('/characters')}
              className="px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl border-2 border-slate-600 text-slate-300 hover:text-white hover:border-blue-400 hover:bg-slate-800/50 transition-all duration-300"
            >
              Explore Characters
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}