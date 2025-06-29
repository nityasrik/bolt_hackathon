import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Filter, 
  Search, 
  Volume2, 
  Star,
  ChevronRight,
  Users,
  Globe
} from 'lucide-react';

const characters = [
  {
    id: "french-basics",
    name: "Pierre Dubois",
    title: "French Chef",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Master French cuisine vocabulary and dining etiquette with a passionate Parisian chef",
    level: "Beginner",
    language: "French",
    accent: "🇫🇷 Parisian",
    personality: "Warm, encouraging, loves sharing cultural stories",
    backstory: "Pierre has been cooking in Michelin-starred restaurants for over 15 years. He believes that learning French through food culture creates lasting memories and deeper understanding.",
    specialties: ["Culinary French", "Dining Etiquette", "Food Culture"],
    rating: 4.9,
    students: 12500,
    tone: "Encouraging",
    gradient: "from-blue-400 via-cyan-400 to-teal-400",
    glowColor: "shadow-cyan-500/25"
  },
  {
    id: "spanish-conversation",
    name: "María González",
    title: "Spanish Teacher",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Practice natural Spanish conversations with an energetic teacher from Madrid",
    level: "Intermediate",
    language: "Spanish",
    accent: "🇪🇸 Madrileño",
    personality: "Enthusiastic, patient, loves cultural exchange",
    backstory: "María taught Spanish literature at Universidad Complutense before becoming a language coach. She's passionate about helping students connect with Hispanic cultures worldwide.",
    specialties: ["Conversational Spanish", "Grammar", "Cultural Context"],
    rating: 4.8,
    students: 18200,
    tone: "Energetic",
    gradient: "from-orange-400 via-red-400 to-pink-400",
    glowColor: "shadow-red-500/25"
  },
  {
    id: "korean-basics",
    name: "Minjun Kim",
    title: "Korean Actor",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Learn Korean pronunciation and K-culture with a friendly Seoul-based actor",
    level: "Beginner",
    language: "Korean",
    accent: "🇰🇷 Seoul",
    personality: "Creative, fun-loving, pop culture enthusiast",
    backstory: "Minjun starred in several K-dramas before becoming a language educator. He combines entertainment with education, making Korean learning fun and culturally relevant.",
    specialties: ["Pronunciation", "K-Culture", "Entertainment Korean"],
    rating: 4.9,
    students: 9800,
    tone: "Fun",
    gradient: "from-purple-400 via-pink-400 to-rose-400",
    glowColor: "shadow-purple-500/25"
  },
  {
    id: "italian-romance",
    name: "Sofia Romano",
    title: "Italian Artist",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Discover the beauty of Italian through art, music, and romantic expressions",
    level: "Intermediate",
    language: "Italian",
    accent: "🇮🇹 Tuscan",
    personality: "Artistic, passionate, romantic",
    backstory: "Sofia is a Renaissance art historian from Florence who believes Italian is best learned through the country's rich artistic heritage and emotional expressions.",
    specialties: ["Art Vocabulary", "Romantic Italian", "Cultural History"],
    rating: 4.7,
    students: 7300,
    tone: "Passionate",
    gradient: "from-green-400 via-emerald-400 to-teal-400",
    glowColor: "shadow-green-500/25"
  },
  {
    id: "german-business",
    name: "Hans Mueller",
    title: "Business Consultant",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Master professional German for business and formal communications",
    level: "Advanced",
    language: "German",
    accent: "🇩🇪 Bavarian",
    personality: "Professional, precise, supportive",
    backstory: "Hans has 20 years of experience in international business consulting. He specializes in helping professionals communicate effectively in German business environments.",
    specialties: ["Business German", "Formal Communication", "Professional Etiquette"],
    rating: 4.6,
    students: 5400,
    tone: "Professional",
    gradient: "from-slate-400 via-gray-400 to-zinc-400",
    glowColor: "shadow-slate-500/25"
  },
  {
    id: "japanese-anime",
    name: "Yuki Tanaka",
    title: "Anime Voice Actor",
    image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Learn Japanese through anime, manga, and pop culture references",
    level: "Beginner",
    language: "Japanese",
    accent: "🇯🇵 Tokyo",
    personality: "Energetic, otaku-friendly, expressive",
    backstory: "Yuki has voiced characters in popular anime series and understands how Japanese pop culture can make language learning exciting and relatable for fans.",
    specialties: ["Anime Japanese", "Pop Culture", "Casual Conversation"],
    rating: 4.8,
    students: 11600,
    tone: "Energetic",
    gradient: "from-pink-400 via-rose-400 to-red-400",
    glowColor: "shadow-pink-500/25"
  }
];

export default function Characters() {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('All');
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterTone, setFilterTone] = useState('All');

  const languages = ['All', ...new Set(characters.map(char => char.language))];
  const levels = ['All', ...new Set(characters.map(char => char.level))];
  const tones = ['All', ...new Set(characters.map(char => char.tone))];

  const filteredCharacters = characters.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         char.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         char.language.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = filterLanguage === 'All' || char.language === filterLanguage;
    const matchesLevel = filterLevel === 'All' || char.level === filterLevel;
    const matchesTone = filterTone === 'All' || char.tone === filterTone;
    
    return matchesSearch && matchesLanguage && matchesLevel && matchesTone;
  });

  const CharacterProfile = ({ character }) => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-slate-800 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] border border-slate-700 shadow-2xl" style={{ overflowY: 'auto' }}>
        <div className="relative">
          <img 
            src={character.image} 
            alt={character.name}
            className="w-full h-48 sm:h-64 object-cover rounded-t-2xl sm:rounded-t-3xl"
          />
          <button
            onClick={() => setSelectedCharacter(null)}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-slate-900/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-slate-800 transition-colors text-lg sm:text-xl"
          >
            ×
          </button>
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
            <span className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r ${character.gradient} text-slate-900`}>
              {character.accent}
            </span>
          </div>
        </div>
        
        <div className="p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{character.name}</h2>
              <p className="text-lg sm:text-xl text-slate-300">{character.title}</p>
            </div>
            <div className="text-left sm:text-right mt-2 sm:mt-0">
              <div className="flex items-center mb-1">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-yellow-400" />
                <span className="font-semibold text-white text-sm sm:text-base">{character.rating}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-slate-400" />
                <span className="text-xs sm:text-sm text-slate-400">{character.students.toLocaleString()} students</span>
              </div>
            </div>
          </div>
          
          <p className="mb-4 sm:mb-6 leading-relaxed text-slate-300 text-sm sm:text-base">{character.description}</p>
          
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">About {character.name}</h3>
            <p className="leading-relaxed text-slate-400 text-sm sm:text-base">{character.backstory}</p>
          </div>
          
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {character.specialties.map((specialty, index) => (
                <span 
                  key={index}
                  className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-slate-700 text-slate-300"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex items-center justify-center bg-slate-700 text-slate-300 hover:bg-slate-600 text-sm sm:text-base`}
            >
              <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Voice Preview
            </button>
            <button
              onClick={() => navigate(`/chat/${character.id}`)}
              className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex items-center justify-center bg-gradient-to-r ${character.gradient} text-slate-900 hover:scale-105 shadow-xl ${character.glowColor} text-sm sm:text-base`}
            >
              <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-6 sm:pt-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 text-white">Meet Your AI Tutors</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-slate-400">
            Choose from our diverse cast of AI language tutors, each with unique personalities and teaching styles
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-700/50">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tutors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-slate-600 focus:outline-none focus:border-blue-400 transition-colors bg-slate-700/50 text-white placeholder-slate-400 text-sm sm:text-base"
                />
              </div>
            </div>
            
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-slate-600 focus:outline-none transition-colors bg-slate-700/50 text-white text-sm sm:text-base"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang} Language</option>
              ))}
            </select>
            
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-slate-600 focus:outline-none transition-colors bg-slate-700/50 text-white text-sm sm:text-base"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level} Level</option>
              ))}
            </select>
            
            <select
              value={filterTone}
              onChange={(e) => setFilterTone(e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-slate-600 focus:outline-none transition-colors bg-slate-700/50 text-white text-sm sm:text-base"
            >
              {tones.map(tone => (
                <option key={tone} value={tone}>{tone} Tone</option>
              ))}
            </select>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCharacters.map((character) => (
            <div 
              key={character.id}
              className={`group bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl ${character.glowColor} transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-slate-700/50`}
            >
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-slate-900 bg-gradient-to-r ${character.gradient}`}>
                    {character.level}
                  </span>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                  <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-slate-800/90 text-white backdrop-blur-sm">
                    {character.accent}
                  </span>
                </div>
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-yellow-400" />
                  <span className="text-white font-semibold text-xs sm:text-sm">{character.rating}</span>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-1 text-white">{character.name}</h3>
                <p className="text-base sm:text-lg font-medium mb-2 sm:mb-3 text-slate-300">{character.title}</p>
                <p className="mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed text-slate-400">{character.description}</p>
                
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-slate-400" />
                    <span className="text-xs sm:text-sm text-slate-400">{character.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-slate-400" />
                    <span className="text-xs sm:text-sm text-slate-400">{character.language}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCharacter(character);
                    }}
                    className="flex-1 py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 border border-slate-600 text-slate-300 hover:bg-slate-700 text-xs sm:text-sm"
                  >
                    View Profile
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/chat/${character.id}`);
                    }}
                    className={`flex-1 py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 flex items-center justify-center bg-gradient-to-r ${character.gradient} text-slate-900 hover:scale-105 text-xs sm:text-sm`}
                  >
                    Start
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCharacters.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-lg sm:text-xl text-slate-400">No tutors found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterLanguage('All');
                setFilterLevel('All');
                setFilterTone('All');
              }}
              className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 text-sm sm:text-base"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {selectedCharacter && <CharacterProfile character={selectedCharacter} />}
    </div>
  );
}