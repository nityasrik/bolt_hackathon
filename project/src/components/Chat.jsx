import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  ArrowLeft,
  Volume2,
  Mic,
  Send,
  RotateCcw,
  Play,
  Pause,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  MessageSquare
} from 'lucide-react';
import { voiceIds } from '../services/api';

export default function Chat() {
  const { character } = useParams();
  const navigate = useNavigate();
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pronunciationFeedback, setPronunciationFeedback] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAttempts, setUserAttempts] = useState([]);
  const [demoMode, setDemoMode] = useState(false);
  const audioRef = useRef(null);
  const isAudioPlayingRef = useRef(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const hasPlayedIntroRef = useRef({});
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [hasPlayedCompletion, setHasPlayedCompletion] = useState(false);
  const [hasPlayedFirstQuestion, setHasPlayedFirstQuestion] = useState(false);

  const characterData = {
    'french-basics': {
      name: 'Pierre the French Chef',
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400",
      intro: "Bonjour! I'm Pierre, your friendly French chef. Together, we'll cook up some delicious French phrases and have fun learning! Did you know? In France, people greet each other with a kiss on each cheek!",
      color: "from-blue-400 via-cyan-400 to-teal-400"
    },
    'spanish-conversation': {
      name: 'María the Spanish Teacher',
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      intro: "¡Hola! I'm María, your Spanish teacher. Let's have fun practicing Spanish conversation together! Did you know? In Spain, people often have dinner as late as 10pm!",
      color: "from-orange-400 via-red-400 to-pink-400"
    },
    'korean-basics': {
      name: 'Minjun the Korean Actor',
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      intro: "안녕하세요! I'm Minjun, your Korean actor friend. Let's learn Korean basics and pronunciation! Did you know? Bowing is a common way to greet people in Korea!",
      color: "from-purple-400 via-pink-400 to-rose-400"
    }
  };

  const prompts = {
    'french-basics': [
      { text: "Bonjour", answer: "bonjour", english: "Hello", hint: "Try saying: 'bonjour' (bon-zhoor).", funFact: "'Bonjour' is used both in the morning and afternoon in France!", culturalNote: "A friendly 'Bonjour' is the key to starting any conversation in France." },
      { text: "Comment ça va?", answer: "ça va bien", english: "How are you? -> I am well.", hint: "Reply with: 'ça va bien' (sah vah byan).", funFact: "French people often ask 'Ça va?' even if they just met you.", culturalNote: "It's polite to ask 'How are you?' when greeting someone in France." },
      { text: "Merci", answer: "merci", english: "Thank you", hint: "Say: 'merci' (mehr-see).", funFact: "Saying 'merci' with a smile goes a long way!", culturalNote: "Gratitude is highly valued in French culture." },
      { text: "Au revoir", answer: "au revoir", english: "Goodbye", hint: "Say: 'au revoir' (oh ruh-vwar).", funFact: "'Au revoir' literally means 'until we see each other again.'", culturalNote: "Parting words are important in French etiquette." }
    ],
    'spanish-conversation': [
      { text: "Hola, ¿cómo estás?", answer: "estoy bien", english: "Hello, how are you? -> I am fine.", hint: "Reply: 'estoy bien' (eh-stoy byen).", funFact: "'Hola' is used any time of day in Spanish-speaking countries.", culturalNote: "A warm greeting is a big part of Spanish culture." },
      { text: "¿De dónde eres?", answer: "soy de", english: "Where are you from? -> I am from...", hint: "Say: 'soy de...' (soy deh).", funFact: "People love to talk about their hometowns in Spanish-speaking countries.", culturalNote: "Asking about someone's origin is a common way to make friends." },
      { text: "¿Qué te gusta hacer?", answer: "me gusta", english: "What do you like to do? -> I like to...", hint: "Start with: 'me gusta...' (meh goos-tah).", funFact: "Sharing hobbies is a great way to connect!", culturalNote: "Spanish speakers often bond over shared interests." },
      { text: "Adiós", answer: "adiós", english: "Goodbye", hint: "Say: 'adiós' (ah-dee-os).", funFact: "'Adiós' is used for both short and long goodbyes.", culturalNote: "Goodbyes are often accompanied by a hug or handshake." }
    ],
    'korean-basics': [
      { text: "안녕하세요", answer: "안녕하세요", english: "Hello", pronunciation: "annyeonghaseyo", slowPrompt: "Pronounce '안녕하세요' slowly.", hint: "Say: 'annyeonghaseyo' (ahn-nyoung-ha-se-yo).", funFact: "'안녕하세요' can be used any time of day.", culturalNote: "A polite bow often accompanies this greeting." },
      { text: "이름이 뭐예요?", answer: "제 이름은", english: "What is your name? -> My name is...", pronunciation: "ireumi mwoyeyo? -> je ireumeun...", slowPrompt: "Pronounce '이름이 뭐예요?' slowly.", hint: "Reply: 'je ireumeun ...' (jeh ee-reum-eun ...).", funFact: "Koreans often ask your age after your name!", culturalNote: "Names are exchanged with a bow in Korea." },
      { text: "감사합니다", answer: "감사합니다", english: "Thank you", pronunciation: "gamsahamnida", slowPrompt: "Pronounce '감사합니다' slowly.", hint: "Say: 'gamsahamnida' (gam-sa-ham-ni-da).", funFact: "There are several ways to say thank you in Korean.", culturalNote: "Expressing thanks is very important in Korean culture." },
      { text: "안녕히 가세요", answer: "안녕히 가세요", english: "Goodbye", pronunciation: "annyeonghi gaseyo", slowPrompt: "Pronounce '안녕히 가세요' slowly.", hint: "Say: 'annyeonghi gaseyo' (an-nyoung-hee ga-se-yo).", funFact: "There are different goodbyes depending on who is leaving.", culturalNote: "Use this when someone else is leaving; use '안녕히 계세요' if you are leaving." }
    ],
  };

  const currentPrompt = prompts[character]?.[currentPromptIndex];

  // Add hints dynamically if they don't exist
  if (currentPrompt && !currentPrompt.hint) {
    currentPrompt.hint = `Try saying: "${currentPrompt.answer}"`;
  }

  // Voice IDs for each language (now imported)
  const currentVoiceId = voiceIds[character];

  // Helper function to play audio and wait for it to finish, with retry logic
  const playAudioAndWait = async (text, skipTeach = false, retries = 3) => {
    if (isAudioPlayingRef.current) return;
    isAudioPlayingRef.current = true;
    setIsAudioPlaying(true);
    setIsLoading(true);
    stopCurrentAudio();
    try {
      const response = await axios.post('http://localhost:5000/speak', {
        text,
        voiceId: currentVoiceId,
        teach: skipTeach ? false : true,
      }, {
        responseType: 'blob',
        headers: { 'Content-Type': 'application/json' }
      });
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
        setIsLoading(false);
        setIsAudioPlaying(false);
        isAudioPlayingRef.current = false;
      };
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
        setIsLoading(false);
        setIsAudioPlaying(false);
        isAudioPlayingRef.current = false;
      };
      await audio.play();
    } catch (error) {
      if (retries > 0 && error.response?.data?.toString().includes('system_busy')) {
        setTimeout(() => playAudioAndWait(text, skipTeach, retries - 1), 1000);
        return;
      }
      setDemoMode(true);
      let msg = '🔊 Demo Mode: Audio would play here. (ElevenLabs credits needed for real audio)';
      if (error.response?.data) {
        let errorDetails = 'Could not get audio. Please try again.';
        try {
          const errorJson = JSON.parse(await error.response.data.text());
          errorDetails = errorJson.detail?.message || errorDetails;
        } catch { }
        msg = `🔊 Audio Error: ${errorDetails}`;
      }
      setFeedback(msg);
      setTimeout(() => setFeedback(''), 5000);
      setIsLoading(false);
      setIsAudioPlaying(false);
      isAudioPlayingRef.current = false;
    }
  };

  // Play character intro TTS when intro screen is shown
  useEffect(() => {
    if (showIntro && character && characterData[character]) {
      playAudioAndWait(`${characterData[character].name}. ${characterData[character].intro}`, true);
    }
  }, [showIntro, character]);

  // Play per-prompt intro and first question
  useEffect(() => {
    if (currentPrompt && !hasPlayedIntroRef.current[currentPromptIndex] && !showIntro) {
      setShowAnswer(false);
      setFeedback('');
      setUserAttempts([]);
      (async () => {
        stopCurrentAudio();
        hasPlayedIntroRef.current[currentPromptIndex] = true;

        // Play intro for the question
        await playAudioAndWait(`Okay, let's learn how to say '${currentPrompt.text}' today!`, true);

        // Play the actual question after intro
        if (!hasPlayedFirstQuestion || currentPromptIndex > 0) {
          await playAudioAndWait(currentPrompt.text, false);
          setHasPlayedFirstQuestion(true);
        }
      })();
    }
  }, [currentPrompt, currentPromptIndex, showIntro]);

  const stopCurrentAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      isAudioPlayingRef.current = false;
      setIsAudioPlaying(false);
    }
  };

  const playQuestionAudio = async () => {
    if (isAudioPlaying) return;
    await playAudioAndWait(currentPrompt.text, false);
  };

  const speakAnswer = async () => {
    if (!currentPrompt || isAudioPlaying) return;
    await playAudioAndWait(currentPrompt.answer, true);
  };

  const speakPronunciation = async (slow = false) => {
    if (!currentPrompt) return;
    let textToSpeak = currentPrompt.text;
    if (slow) {
      if (currentPrompt.pronunciation) {
        textToSpeak = currentPrompt.pronunciation.split('').join(' ');
      } else {
        textToSpeak = currentPrompt.text.split('').join(' ');
      }
    }
    await playAudioAndWait(textToSpeak, true);
  };

  const correctFeedbacks = [
    "Bravo! That's perfect pronunciation!",
    "Excellent! You sound just like a native speaker!",
    "Great job! You nailed it!",
    "Fantastic! Your accent is impressive!",
    "Superb! Keep it up!"
  ];
  const incorrectFeedbacks = [
    "Almost there! Try listening to the pronunciation again.",
    "Don't worry, practice makes perfect. Give it another shot!",
    "Not quite, but you're getting closer!",
    "Keep trying! You'll get it soon!",
    "Let's try that one more time together."
  ];

  function getRandomFeedback(isCorrect) {
    const arr = isCorrect ? correctFeedbacks : incorrectFeedbacks;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setUserAttempts(prev => [...prev, userInput]);
    setShowAnswer(true);

    const normalize = str => str.toLowerCase().replace(/[^a-zA-Z0-9À-ÿ''\s]/g, '').replace(/\s+/g, ' ').trim();
    const userNorm = normalize(userInput);
    const answerNorm = normalize(currentPrompt.answer);

    stopCurrentAudio();

    if (userNorm === answerNorm) {
      const feedbackMsg = getRandomFeedback(true);
      setFeedback('✅ ' + feedbackMsg);
      setUserInput('');

      // Play feedback only once - removed duplicate audio calls
      try {
        const geminiRes = await axios.post('http://localhost:5000/chat', {
          message: userInput,
          context: `The correct answer is: ${currentPrompt.answer}`
        });
        await playAudioAndWait(geminiRes.data.reply, true);
      } catch (err) {
        await playAudioAndWait("That's right! Great job!", true);
      }

      setTimeout(() => {
        setFeedback('');
        setShowAnswer(false);
        setCurrentPromptIndex((prev) => prev + 1);
      }, 2000);
      return;
    }

    setFeedback('Checking your answer...');
    try {
      const geminiRes = await axios.post('http://localhost:5000/chat', {
        message: userInput,
        context: `The correct answer is: ${currentPrompt.answer}`
      });
      await playAudioAndWait(geminiRes.data.reply, true);
    } catch (err) {
      setFeedback('Could not check answer with Gemini.');
    }
    setUserInput('');
  };

  const getCharacterName = () => {
    switch (character) {
      case 'french-basics': return 'French Basics';
      case 'spanish-conversation': return 'Spanish Conversation';
      case 'korean-basics': return 'Korean Basics';
      default: return 'Language Tutor';
    }
  };

  const checkPronunciation = async () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setPronunciationFeedback('❌ Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = character.startsWith('french') ? 'fr-FR' : (character.startsWith('spanish') ? 'es-ES' : 'en-US');
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsRecognizing(true);
    setPronunciationFeedback('🎤 Listening...');

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript.trim().toLowerCase();
      const answerNorm = currentPrompt.answer.toLowerCase().replace(/[^a-zA-Z0-9À-ÿ'\s]/g, '').trim();

      if (transcript.includes(answerNorm)) {
        setPronunciationFeedback(`✅ Good pronunciation! You said: "${transcript}"\nWould you like to try saying it faster?`);
        let ttsText = '';
        if (character.startsWith('french')) ttsText = 'Bien! Prochaine question!';
        else if (character.startsWith('spanish')) ttsText = '¡Bien! Siguiente pregunta!';
        else if (character.startsWith('korean')) ttsText = '좋아요! 다음 질문!';
        else ttsText = 'Good! Next question!';
        await playAudioAndWait(ttsText, true);
        setTimeout(() => {
          setPronunciationFeedback('');
          setCurrentPromptIndex((prev) => prev + 1);
        }, 1500);
      } else {
        setPronunciationFeedback(`❌ Try again. You said: "${transcript}"\nTip: Speak slowly and clearly for the best results.`);
      }
    };

    recognition.onerror = (event) => {
      setPronunciationFeedback(`❌ Error: ${event.error}`);
      setIsRecognizing(false);
    };

    recognition.onend = () => {
      setIsRecognizing(false);
    };

    try {
      recognition.start();
    } catch (error) {
      setPronunciationFeedback('❌ Could not start speech recognition.');
      setIsRecognizing(false);
    }
  };

  useEffect(() => {
    if (!currentPrompt && !hasPlayedCompletion) {
      stopCurrentAudio();
      playAudioAndWait("🎉 Félicitations! You've completed the lesson. Keep practicing, and you'll be speaking like a local in no time! Would you like to try another language or review this lesson?", true);
      setHasPlayedCompletion(true);
    }
    if (currentPrompt) {
      setHasPlayedCompletion(false);
    }
  }, [currentPrompt]);

  // Handle invalid character routes
  if (!characterData[character]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Character Not Found</h2>
          <p className="text-slate-400 mb-6">The character you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 px-6 py-3 rounded-full font-semibold"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (showIntro && character && characterData[character]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
        <div className="max-w-2xl mx-auto p-6 sm:p-8 text-center">
          <div className="relative mb-6 sm:mb-8">
            <div className={`absolute inset-0 bg-gradient-to-r ${characterData[character].color} rounded-full blur-2xl opacity-30`}></div>
            <img
              src={characterData[character].image}
              alt={characterData[character].name}
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover mx-auto shadow-2xl border-4 border-slate-700"
            />
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">{characterData[character].name}</h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto">
            {characterData[character].intro}
          </p>

          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={() => setShowIntro(false)}
              className={`bg-gradient-to-r ${characterData[character].color} text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              <Play className="h-4 w-4 sm:h-5 sm:w-5 inline mr-2" />
              Start Lesson
            </button>
            <br />
            <button
              onClick={() => navigate('/')}
              className="text-slate-400 hover:text-white font-medium transition-colors duration-300 text-sm sm:text-base"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 inline mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentPrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
        <div className="max-w-2xl mx-auto p-6 sm:p-8 text-center">
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 border border-slate-700">
            <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">🎉</div>
            <h2 className="text-2xl sm:text-4xl font-bold text-green-400 mb-4 sm:mb-6">Course Complete!</h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed">
              Félicitations! You've completed the lesson. Keep practicing, and you'll be speaking like a local in no time!<br />Would you like to try another language or review this lesson?
            </p>
            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-green-400 to-emerald-400 text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Choose Another Language
              </button>
              <br />
              <button
                onClick={() => window.location.reload()}
                className="text-slate-400 hover:text-white font-medium transition-colors duration-300 text-sm sm:text-base"
              >
                <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 inline mr-2" />
                Restart This Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto p-3 sm:p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-700">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-slate-300 hover:text-white transition-colors duration-300 text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            Back to Home
          </button>

          <div className="text-center">
            <h1 className="text-lg sm:text-2xl font-bold text-white">Learning {getCharacterName()}</h1>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">
              Progress: {currentPromptIndex + 1} / {prompts[character]?.length}
            </div>
          </div>

          <div className="w-16 sm:w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Demo Mode Banner */}
        {demoMode && (
          <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 backdrop-blur-xl">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-2 sm:mr-3 flex-shrink-0" />
              <div>
                <span className="text-yellow-300 font-medium text-sm sm:text-base">Demo Mode</span>
                <span className="text-yellow-400 ml-2 text-xs sm:text-sm">
                  Text-to-speech is in demo mode. Add ElevenLabs credits for full audio experience.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Question Section */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 mb-6 sm:mb-8 border border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mr-2" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">Question:</h3>
            </div>
            <button
              onClick={playQuestionAudio}
              className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl hover:bg-green-600 disabled:opacity-50 transition-all duration-300 flex items-center text-sm sm:text-base"
              disabled={isLoading || isAudioPlaying}
            >
              {isLoading || isAudioPlaying ? (
                <>
                  <Pause className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Speaking...
                </>
              ) : (
                <>
                  <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Repeat
                </>
              )}
            </button>
          </div>

          <div className="text-2xl sm:text-3xl font-medium text-white mb-3 sm:mb-4">{currentPrompt.text}</div>
          <div className="text-base sm:text-lg text-slate-400 mb-4 sm:mb-6">{currentPrompt.english}</div>

          <div className="bg-blue-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 border border-blue-400/30">
            <div className="flex items-center mb-2">
              <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-2" />
              <span className="font-medium text-blue-300 text-sm sm:text-base">Hint:</span>
            </div>
            <p className="text-blue-200 text-sm sm:text-base">{currentPrompt.hint}</p>
          </div>

          {currentPrompt.pronunciation && (
            <div className="bg-purple-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-purple-400/30">
              <div>
                <div className="flex items-center mb-2">
                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 mr-2" />
                  <span className="font-medium text-purple-300 text-sm sm:text-base">Pronunciation:</span>
                </div>
                <p className="text-purple-200 text-sm sm:text-base">{currentPrompt.pronunciation}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => speakPronunciation(false)}
                  className="bg-pink-500 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl hover:bg-pink-600 disabled:opacity-50 transition-all duration-300 text-xs sm:text-sm"
                  disabled={isLoading || isAudioPlaying}
                >
                  {isLoading || isAudioPlaying ? '...' : '🔊 Hear It'}
                </button>
                {currentPrompt.slowPrompt && (
                  <button
                    onClick={() => speakPronunciation(true)}
                    className="bg-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl hover:bg-purple-800 disabled:opacity-50 transition-all duration-300 text-xs sm:text-sm"
                    disabled={isLoading || isAudioPlaying}
                  >
                    {isLoading || isAudioPlaying ? '...' : '🐢 Slower'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Attempts Section */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-700">
          <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Your Attempts:</h4>
          <div className="h-24 sm:h-32 space-y-2" style={{ overflowY: 'auto' }}>
            {userAttempts.length === 0 ? (
              <p className="text-slate-400 italic text-center py-6 sm:py-8 text-sm sm:text-base">Your attempts will appear here...</p>
            ) : (
              userAttempts.map((attempt, idx) => (
                <div key={idx} className="flex justify-end">
                  <div className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl max-w-xs text-sm sm:text-base">
                    {attempt}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 mb-6 sm:mb-8 border border-slate-700">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-grow border-2 border-slate-600 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg focus:border-blue-400 focus:outline-none transition-colors duration-300 bg-slate-700/50 text-white placeholder-slate-400"
              placeholder={character === 'korean-basics' ? "Type in English..." : "Type your reply..."}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 transition-all duration-300 flex items-center justify-center text-sm sm:text-base"
              disabled={isLoading || !userInput.trim()}
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Send
            </button>
          </form>

          {/* Feedback and Answer Section */}
          {showAnswer && (
            <div className="mt-4 sm:mt-6">
              <div className={`text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base ${feedback.includes('✅') ? 'bg-green-500/20 text-green-300 border border-green-400/30' : 'bg-slate-700/50 text-slate-300'
                }`}>
                {feedback}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-4 mt-3 sm:mt-4 p-3 sm:p-4 bg-green-500/20 rounded-xl sm:rounded-2xl border border-green-400/30">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />
                <span className="text-green-300 font-semibold text-sm sm:text-base">Correct Answer: {currentPrompt.answer}</span>
                <button
                  onClick={speakAnswer}
                  className="bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl hover:bg-purple-600 disabled:opacity-50 transition-all duration-300 flex items-center text-xs sm:text-sm"
                  disabled={isLoading || isAudioPlaying}
                >
                  <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  {isLoading || isAudioPlaying ? 'Speaking...' : 'Hear Answer'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Practice Speaking Section */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-xl mb-6">
          <div className="flex items-center mb-3 sm:mb-4">
            <Mic className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mr-2 sm:mr-3" />
            <h4 className="font-semibold text-yellow-300 text-lg sm:text-xl">Practice Speaking</h4>
          </div>

          <button
            onClick={checkPronunciation}
            className="bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 px-4 sm:px-6 py-3 rounded-xl sm:rounded-2xl font-semibold hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 transition-all duration-300 flex items-center text-sm sm:text-base"
            disabled={isRecognizing}
          >
            <Mic className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            {isRecognizing ? 'Listening...' : 'Check My Pronunciation'}
          </button>

          {pronunciationFeedback && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-slate-800/50 rounded-xl sm:rounded-2xl border border-slate-600">
              <p className="text-yellow-200 whitespace-pre-line text-sm sm:text-base">{pronunciationFeedback}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}