import React, { useState } from 'react';
import { 
  Globe, 
  BookOpen, 
  Star, 
  Calendar,
  Trophy,
  Users,
  Lightbulb,
  Heart,
  Coffee,
  Music,
  Camera,
  MapPin
} from 'lucide-react';

const culturalFacts = [
  {
    language: 'French',
    title: 'The Art of French Dining',
    content: 'In France, meals are considered sacred time. The average French lunch lasts 1.5 hours, and it\'s considered rude to eat while walking or standing.',
    icon: '🍷',
    category: 'Culture'
  },
  {
    language: 'Spanish',
    title: 'La Siesta Tradition',
    content: 'The Spanish siesta isn\'t just about napping - it\'s a cultural practice that allows families to gather for lunch and rest during the hottest part of the day.',
    icon: '😴',
    category: 'Lifestyle'
  },
  {
    language: 'Korean',
    title: 'Bowing Etiquette',
    content: 'In Korea, the depth of your bow matters! A 15-degree bow is for casual greetings, while a 45-degree bow shows deep respect.',
    icon: '🙇',
    category: 'Etiquette'
  },
  {
    language: 'Italian',
    title: 'Coffee Culture',
    content: 'Italians never drink cappuccino after 11 AM - it\'s considered a breakfast drink. Ordering one after lunch might get you strange looks!',
    icon: '☕',
    category: 'Food'
  },
  {
    language: 'German',
    title: 'Punctuality is Sacred',
    content: 'Being on time in Germany isn\'t just polite - it\'s essential. Arriving even 5 minutes late is considered disrespectful.',
    icon: '⏰',
    category: 'Business'
  },
  {
    language: 'Japanese',
    title: 'Gift Wrapping Art',
    content: 'In Japan, how you wrap a gift is as important as the gift itself. The art of furoshiki (cloth wrapping) has been practiced for over 1,000 years.',
    icon: '🎁',
    category: 'Tradition'
  }
];

const dailyWords = [
  { language: 'French', word: 'Flâner', pronunciation: 'flah-NAY', meaning: 'To stroll aimlessly through the city', example: 'J\'aime flâner dans Paris le dimanche.' },
  { language: 'Spanish', word: 'Sobremesa', pronunciation: 'so-breh-MEH-sa', meaning: 'The time spent talking after a meal', example: 'La sobremesa es muy importante en España.' },
  { language: 'Korean', word: '정', pronunciation: 'jeong', meaning: 'Deep affection and emotional bond', example: '우리는 정이 많아요.' },
  { language: 'Italian', word: 'Sprezzatura', pronunciation: 'spret-sa-TOO-ra', meaning: 'Effortless elegance', example: 'Ha una sprezzatura naturale.' },
  { language: 'German', word: 'Gemütlichkeit', pronunciation: 'geh-MUET-likh-kite', meaning: 'Cozy, warm atmosphere', example: 'Das Café hat viel Gemütlichkeit.' },
  { language: 'Japanese', word: '木漏れ日', pronunciation: 'komorebi', meaning: 'Sunlight filtering through leaves', example: '木漏れ日がきれいですね。' }
];

const challenges = [
  {
    title: 'Global Greetings Challenge',
    description: 'Learn how to say "hello" in 10 different languages this week',
    progress: 70,
    participants: 1250,
    timeLeft: '3 days',
    reward: '500 XP + Cultural Explorer Badge',
    difficulty: 'Easy',
    gradient: 'from-green-400 to-emerald-400'
  },
  {
    title: 'Pronunciation Perfect Week',
    description: 'Complete 5 pronunciation exercises with 90% accuracy',
    progress: 40,
    participants: 890,
    timeLeft: '5 days',
    reward: '750 XP + Speaking Star Badge',
    difficulty: 'Medium',
    gradient: 'from-yellow-400 to-orange-400'
  },
  {
    title: 'Polyglot Marathon',
    description: 'Study 3 different languages in one month',
    progress: 33,
    participants: 456,
    timeLeft: '18 days',
    reward: '1500 XP + Polyglot Master Badge',
    difficulty: 'Hard',
    gradient: 'from-red-400 to-pink-400'
  }
];

const tutorTips = [
  {
    tutor: 'Pierre Dubois',
    avatar: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=100',
    tip: 'When learning French pronunciation, practice with your mouth slightly more open than in English. French vowels need more space!',
    language: 'French'
  },
  {
    tutor: 'María González',
    avatar: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100',
    tip: 'Roll your Rs by placing your tongue lightly against the roof of your mouth and letting air flow over it. Start with "rr" sounds!',
    language: 'Spanish'
  },
  {
    tutor: 'Minjun Kim',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100',
    tip: 'Korean has no stress accent like English. Keep all syllables at the same level of emphasis for natural-sounding speech.',
    language: 'Korean'
  }
];

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const categories = ['All', 'Culture', 'Lifestyle', 'Etiquette', 'Food', 'Business', 'Tradition'];
  
  const filteredFacts = selectedCategory === 'All' 
    ? culturalFacts 
    : culturalFacts.filter(fact => fact.category === selectedCategory);

  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % dailyWords.length);
  };

  const prevWord = () => {
    setCurrentWordIndex((prev) => (prev - 1 + dailyWords.length) % dailyWords.length);
  };

  return (
    <div className="min-h-screen pt-6 sm:pt-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 text-white">Explore Languages</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-slate-400">
            Discover fascinating cultural insights, learn new words, and join exciting challenges
          </p>
        </div>

        {/* Word of the Day */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 mb-8 sm:mb-12 border border-slate-700">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-yellow-400" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Word Discovery</h2>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <button 
                  onClick={prevWord}
                  className="p-2 sm:p-3 rounded-full transition-all duration-300 bg-slate-700 text-blue-400 hover:bg-slate-600 text-lg sm:text-xl"
                >
                  ←
                </button>
                
                <div className="flex-1 mx-4 sm:mx-8">
                  <span className="px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 inline-block bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900">
                    {dailyWords[currentWordIndex].language}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 text-blue-300">
                    {dailyWords[currentWordIndex].word}
                  </h3>
                  <p className="text-sm sm:text-lg mb-2 text-slate-400">
                    /{dailyWords[currentWordIndex].pronunciation}/
                  </p>
                  <p className="text-base sm:text-xl mb-3 sm:mb-4 text-white">
                    {dailyWords[currentWordIndex].meaning}
                  </p>
                  <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 bg-slate-700/50 border border-slate-600">
                    <p className="italic text-blue-300 text-sm sm:text-base">
                      "{dailyWords[currentWordIndex].example}"
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={nextWord}
                  className="p-2 sm:p-3 rounded-full transition-all duration-300 bg-slate-700 text-blue-400 hover:bg-slate-600 text-lg sm:text-xl"
                >
                  →
                </button>
              </div>
              
              <div className="flex justify-center space-x-1 sm:space-x-2 mt-4 sm:mt-6">
                {dailyWords.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                      index === currentWordIndex ? 'bg-blue-400' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Facts */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Cultural Insights</h2>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm ${
                    selectedCategory === category 
                      ? 'text-slate-900 bg-gradient-to-r from-blue-400 to-cyan-400' 
                      : 'text-slate-300 bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {filteredFacts.map((fact, index) => (
              <div key={index} className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">{fact.icon}</span>
                  <div>
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-slate-700 text-blue-300">
                      {fact.language}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">{fact.title}</h3>
                <p className="leading-relaxed text-slate-300 text-sm sm:text-base">{fact.content}</p>
                <div className="mt-3 sm:mt-4">
                  <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900">
                    {fact.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white">Active Challenges</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 border border-slate-700 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                    challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
                    challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' :
                    'bg-red-500/20 text-red-300 border border-red-400/30'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">{challenge.title}</h3>
                <p className="mb-3 sm:mb-4 text-slate-300 text-sm sm:text-base">{challenge.description}</p>
                
                <div className="mb-3 sm:mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400 text-sm sm:text-base">Progress</span>
                    <span className="text-slate-400 text-sm sm:text-base">{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3">
                    <div 
                      className={`h-2 sm:h-3 rounded-full transition-all duration-500 bg-gradient-to-r ${challenge.gradient}`}
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-slate-400" />
                      <span className="text-xs sm:text-sm text-slate-400">{challenge.participants} participants</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-slate-400" />
                      <span className="text-xs sm:text-sm text-slate-400">{challenge.timeLeft} left</span>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg sm:rounded-xl p-2 sm:p-3 mb-3 sm:mb-4 bg-slate-700/50 border border-slate-600">
                  <p className="text-xs sm:text-sm font-medium text-blue-300">
                    🏆 Reward: {challenge.reward}
                  </p>
                </div>
                
                <button className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${challenge.gradient} text-slate-900 text-sm sm:text-base`}>
                  Join Challenge
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tutor Tips */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white">Tips from Your Tutors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {tutorTips.map((tip, index) => (
              <div key={index} className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-3 sm:mb-4">
                  <img 
                    src={tip.avatar} 
                    alt={tip.tutor}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">{tip.tutor}</h3>
                    <span className="text-xs sm:text-sm text-slate-400">{tip.language} Tutor</span>
                  </div>
                </div>
                <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 bg-slate-700/50 border border-slate-600">
                  <p className="italic leading-relaxed text-blue-300 text-sm sm:text-base">
                    "{tip.tip}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}