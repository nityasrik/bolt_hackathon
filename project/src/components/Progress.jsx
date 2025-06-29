import React from 'react';
import { 
  Trophy, 
  Flame, 
  BookOpen, 
  Target, 
  Star, 
  Award,
  TrendingUp,
  Calendar,
  Clock,
  Users
} from 'lucide-react';

const progressData = {
  overall: {
    xp: 2450,
    streak: 7,
    lessonsCompleted: 18,
    totalLessons: 60,
    studyTime: 24, // hours
    rank: 'Intermediate Explorer'
  },
  languages: [
    {
      name: 'French',
      progress: 65,
      xp: 1200,
      lessonsCompleted: 12,
      totalLessons: 25,
      currentLevel: 'A2',
      nextLevel: 'B1',
      character: 'Pierre Dubois',
      gradient: 'from-blue-400 to-cyan-400'
    },
    {
      name: 'Spanish',
      progress: 30,
      xp: 800,
      lessonsCompleted: 6,
      totalLessons: 20,
      currentLevel: 'A1',
      nextLevel: 'A2',
      character: 'María González',
      gradient: 'from-orange-400 to-red-400'
    },
    {
      name: 'Korean',
      progress: 15,
      xp: 450,
      lessonsCompleted: 3,
      totalLessons: 15,
      currentLevel: 'Beginner',
      nextLevel: 'A1',
      character: 'Minjun Kim',
      gradient: 'from-purple-400 to-pink-400'
    }
  ],
  badges: [
    { name: 'First Steps', description: 'Complete your first lesson', earned: true, icon: '🎯' },
    { name: 'Week Warrior', description: 'Maintain a 7-day streak', earned: true, icon: '🔥' },
    { name: 'Conversation Starter', description: 'Complete 10 speaking exercises', earned: true, icon: '💬' },
    { name: 'Grammar Guru', description: 'Master 50 grammar rules', earned: false, icon: '📚' },
    { name: 'Culture Explorer', description: 'Learn 25 cultural facts', earned: false, icon: '🌍' },
    { name: 'Polyglot', description: 'Study 3 different languages', earned: true, icon: '🗣️' }
  ],
  weeklyActivity: [
    { day: 'Mon', xp: 120, lessons: 2 },
    { day: 'Tue', xp: 200, lessons: 3 },
    { day: 'Wed', xp: 150, lessons: 2 },
    { day: 'Thu', xp: 180, lessons: 3 },
    { day: 'Fri', xp: 220, lessons: 4 },
    { day: 'Sat', xp: 100, lessons: 1 },
    { day: 'Sun', xp: 160, lessons: 2 }
  ]
};

export default function Progress() {
  const maxWeeklyXP = Math.max(...progressData.weeklyActivity.map(day => day.xp));

  return (
    <div className="min-h-screen pt-6 sm:pt-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 text-white">Your Progress</h1>
          <p className="text-lg sm:text-xl text-slate-400">
            Track your learning journey and celebrate your achievements
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center shadow-lg border border-slate-700 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-yellow-500/20">
            <div className="rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 shadow-xl shadow-yellow-500/25">
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-yellow-400">{progressData.overall.xp}</h3>
            <p className="font-medium text-xs sm:text-base text-slate-300">Total XP</p>
          </div>
          
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center shadow-lg border border-slate-700 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-red-500/20">
            <div className="rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-4 bg-gradient-to-r from-red-400 to-orange-400 shadow-xl shadow-red-500/25">
              <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-red-400">{progressData.overall.streak}</h3>
            <p className="font-medium text-xs sm:text-base text-slate-300">Day Streak</p>
          </div>
          
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center shadow-lg border border-slate-700 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-blue-500/20">
            <div className="rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-xl shadow-blue-500/25">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-blue-400">{progressData.overall.lessonsCompleted}</h3>
            <p className="font-medium text-xs sm:text-base text-slate-300">Lessons Done</p>
          </div>
          
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center shadow-lg border border-slate-700 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-purple-500/20">
            <div className="rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 shadow-xl shadow-purple-500/25">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-purple-400">{progressData.overall.studyTime}h</h3>
            <p className="font-medium text-xs sm:text-base text-slate-300">Study Time</p>
          </div>
        </div>

        {/* Current Rank */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 mb-8 sm:mb-12 text-center border border-slate-700">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4">
            <div className="rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 bg-gradient-to-r from-yellow-400 to-orange-400 shadow-xl shadow-yellow-500/25">
              <Award className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{progressData.overall.rank}</h2>
              <p className="text-slate-400 text-sm sm:text-base">Your current learning level</p>
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between mb-2">
              <span className="text-slate-400 text-sm sm:text-base">Progress to next rank</span>
              <span className="text-slate-400 text-sm sm:text-base">75%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3">
              <div 
                className="h-2 sm:h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-400 to-cyan-400"
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Language Progress */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white">Language Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {progressData.languages.map((language, index) => (
              <div key={index} className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 border border-slate-700 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-white">{language.name}</h3>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r ${language.gradient} text-slate-900`}>
                    {language.currentLevel}
                  </span>
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400 text-sm sm:text-base">Progress</span>
                    <span className="text-slate-400 text-sm sm:text-base">{language.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3">
                    <div 
                      className={`h-2 sm:h-3 rounded-full transition-all duration-500 bg-gradient-to-r ${language.gradient}`}
                      style={{ width: `${language.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm sm:text-base">XP Earned:</span>
                    <span className="font-semibold text-white text-sm sm:text-base">{language.xp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm sm:text-base">Lessons:</span>
                    <span className="font-semibold text-white text-sm sm:text-base">{language.lessonsCompleted}/{language.totalLessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm sm:text-base">Tutor:</span>
                    <span className="font-semibold text-white text-sm sm:text-base">{language.character}</span>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-700">
                  <p className="text-xs sm:text-sm text-center text-slate-400">
                    Next level: <span className="font-semibold text-slate-300">{language.nextLevel}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 mb-8 sm:mb-12 border border-slate-700">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white">Weekly Activity</h2>
          <div className="grid grid-cols-7 gap-2 sm:gap-4">
            {progressData.weeklyActivity.map((day, index) => (
              <div key={index} className="text-center">
                <div className="mb-2">
                  <div 
                    className="w-full rounded-lg transition-all duration-300 hover:opacity-80 bg-gradient-to-t from-blue-400 to-cyan-400"
                    style={{ 
                      height: `${(day.xp / maxWeeklyXP) * 80 + 20}px`
                    }}
                  ></div>
                </div>
                <p className="text-xs sm:text-sm font-medium mb-1 text-white">{day.day}</p>
                <p className="text-xs text-slate-400">{day.xp} XP</p>
                <p className="text-xs text-slate-400">{day.lessons} lessons</p>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white">Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {progressData.badges.map((badge, index) => (
              <div 
                key={index} 
                className={`bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border transition-all duration-300 ${
                  badge.earned ? 'border-blue-400/50 transform hover:-translate-y-2 hover:shadow-blue-500/20' : 'border-slate-700 opacity-60'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{badge.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">
                    {badge.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">{badge.description}</p>
                  {badge.earned && (
                    <div className="mt-2 sm:mt-3">
                      <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-slate-900 bg-gradient-to-r from-blue-400 to-cyan-400">
                        Earned!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}