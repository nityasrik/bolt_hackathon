import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import frenchChefImg from '../assets/french-chef.png';
import spanishTeacherImg from '../assets/spanish-teacher.png';
import koreanActorImg from '../assets/korean-actor.png';

export default function Chat() {
  const { character } = useParams();
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [pronunciationFeedback, setPronunciationFeedback] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAttempts, setUserAttempts] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isCheckingPronunciation, setIsCheckingPronunciation] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const audioRef = useRef(null);
  const isAudioPlayingRef = useRef(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const hasPlayedIntroRef = useRef({});
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();
  const [hasPlayedCompletion, setHasPlayedCompletion] = useState(false);

  const characterData = {
    'french-basics': {
      name: 'Pierre the French Chef',
      image: frenchChefImg,
      intro: "Bonjour! I'm Pierre, your friendly French chef. Together, we'll cook up some delicious French phrases and have fun learning! Did you know? In France, people greet each other with a kiss on each cheek!"
    },
    'spanish-conversation': {
      name: 'María the Spanish Teacher',
      image: spanishTeacherImg,
      intro: "¡Hola! I'm María, your Spanish teacher. Let's have fun practicing Spanish conversation together! Did you know? In Spain, people often have dinner as late as 10pm!"
    },
    'korean-basics': {
      name: 'Minjun the Korean Actor',
      image: koreanActorImg,
      intro: "안녕하세요! I'm Minjun, your Korean actor friend. Let's learn Korean basics and pronunciation! Did you know? Bowing is a common way to greet people in Korea!"
    }
  };

  const prompts = {
    'french-basics': [
      { text: "Bonjour", answer: "bonjour", english: "Hello", hint: "Try saying: 'bonjour' (bon-zhoor).", funFact: "‘Bonjour’ is used both in the morning and afternoon in France!", culturalNote: "A friendly 'Bonjour' is the key to starting any conversation in France." },
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

  // Voice IDs for each language
  const voiceIds = {
    'french-basics': '7c65Pcpdzr0GkR748U7h',
    'spanish-conversation': 'wHiOjOiwglSlcqGt7GVl',
    'korean-basics': '2gbExjiWDnG1DMGr81Bx',
  };
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
      audio.play();
    } catch (error) {
      if (retries > 0 && error.response?.data?.toString().includes('system_busy')) {
        setTimeout(() => playAudioAndWait(text, skipTeach, retries - 1), 1000); // Retry after 1 sec
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
      // Play both the character's name and their intro for a friendlier experience
      playAudioAndWait(`${characterData[character].name}. ${characterData[character].intro}`, true);
    }
    // eslint-disable-next-line
  }, [showIntro, character]);

  // Remove the first-prompt 'let's learn some basics today' TTS effect
  // Only play the per-prompt intro ("Okay, let's learn how to say ...")
  useEffect(() => {
    if (currentPrompt && !hasPlayedIntroRef.current[currentPromptIndex]) {
      setShowAnswer(false);
      setFeedback('');
      setUserAttempts([]);
      (async () => {
        stopCurrentAudio();
        hasPlayedIntroRef.current[currentPromptIndex] = true; // Set before playing!
        await playAudioAndWait(`Okay, let's learn how to say '${currentPrompt.text}' today!`, true);
      })();
    }
    // eslint-disable-next-line
  }, [currentPrompt]);

  const stopCurrentAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      isAudioPlayingRef.current = false;
      setIsAudioPlaying(false);
    }
  };

  // Play question audio (repeat) - only on button click
  const playQuestionAudio = async () => {
    if (isAudioPlaying) return;
    await playAudioAndWait(currentPrompt.text, false);
  };

  // Play answer audio - only on button click
  const speakAnswer = async () => {
    if (!currentPrompt || isAudioPlaying) return;
    await playAudioAndWait(currentPrompt.answer, true);
  };

  const speakPronunciation = async (slow = false) => {
    if (!currentPrompt) return;
    let textToSpeak = currentPrompt.text;
    if (slow) {
      // Use pronunciation field if available, else space out the text
      if (currentPrompt.pronunciation) {
        textToSpeak = currentPrompt.pronunciation.split('').join(' ');
      } else {
        textToSpeak = currentPrompt.text.split('').join(' ');
      }
    }
    await playAudioAndWait(textToSpeak, true);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setPronunciationFeedback('🎤 Audio recorded! (Speech-to-text would analyze pronunciation here)');
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      setPronunciationFeedback('❌ Error accessing microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  // Feedback message pools for variety
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
    setUserAttempts(prev => [...prev, userInput]);
    setShowAnswer(true);

    const normalize = str => str.toLowerCase().replace(/[^a-zA-Z0-9À-ÿ'’\s]/g, '').replace(/\s+/g, ' ').trim();
    const userNorm = normalize(userInput);
    const answerNorm = normalize(currentPrompt.answer);

    if (userNorm === answerNorm) {
      const feedbackMsg = getRandomFeedback(true);
      setFeedback('✅ ' + feedbackMsg);
      setUserInput('');
      try {
        const geminiRes = await axios.post('http://localhost:5000/chat', {
          message: userInput,
          context: `The correct answer is: ${currentPrompt.answer}`
        });
        (async () => {
          await playAudioAndWait(currentPrompt.text, true);
          setFeedback(`✅ ${feedbackMsg}\n${geminiRes.data.reply}`);
          await playAudioAndWait(geminiRes.data.reply, true);
          await playAudioAndWait("That's right!", true);
          setTimeout(() => {
            setFeedback('');
            setShowAnswer(false);
            setCurrentPromptIndex((prev) => prev + 1);
          }, 500);
        })();
      } catch (err) {
        setFeedback('✅ ' + feedbackMsg + '\n(Could not get teacher feedback)');
        await playAudioAndWait(currentPrompt.text, true);
        await playAudioAndWait("That's right!", true);
        setTimeout(() => {
          setFeedback('');
          setShowAnswer(false);
          setCurrentPromptIndex((prev) => prev + 1);
        }, 500);
      }
      return;
    }
    setFeedback('Checking your answer...');
    try {
      const geminiRes = await axios.post('http://localhost:5000/chat', {
        message: userInput,
        context: `The correct answer is: ${currentPrompt.answer}`
      });
      await playAudioAndWait(currentPrompt.text, true);
      const feedbackMsg = getRandomFeedback(false);
      setFeedback(feedbackMsg + '\n' + geminiRes.data.reply);
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

  // Add this function to check pronunciation
  const checkPronunciation = async () => {
    // Use Web Speech API instead of backend
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
        }, 500);
      } else {
        setPronunciationFeedback(`❌ Try again. You said: "${transcript}"\nTip: Speak slowly and clearly for the best results.`);
      }
    };

    recognition.onerror = (event) => {
      setPronunciationFeedback(`❌ Error: ${event.error}`);
    };

    recognition.onend = () => {
      setIsRecognizing(false);
    };

    recognition.start();
  };

  useEffect(() => {
    if (!currentPrompt && !hasPlayedCompletion) {
      stopCurrentAudio();
      playAudioAndWait("🎉 Félicitations! You've completed the French basics lesson. Keep practicing, and you'll be speaking like a local in no time! Would you like to try another language or review this lesson?", true);
      setHasPlayedCompletion(true);
    }
    if (currentPrompt) {
      setHasPlayedCompletion(false);
    }
    // eslint-disable-next-line
  }, [currentPrompt]);

  if (showIntro && character && characterData[character]) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <img src={characterData[character].image} alt={characterData[character].name} style={{ width: 160, height: 160, borderRadius: '50%', marginBottom: 24 }} />
        <h2 style={{ fontSize: '2rem', marginBottom: 8 }}>{characterData[character].name}</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: 24 }}>{characterData[character].intro}</p>
        <button onClick={() => setShowIntro(false)} style={{ fontSize: '1.1rem', padding: '12px 32px', borderRadius: 8, background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer' }}>
          Start Lesson
        </button>
        <button onClick={() => navigate('/')} style={{ marginTop: 16, fontSize: '1rem', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}>Back to Home</button>
      </div>
    );
  }

  if (!currentPrompt) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Course Complete!</h2>
        <p className="text-xl mb-4">Félicitations! You've completed the French basics lesson. Keep practicing, and you'll be speaking like a local in no time!<br />Would you like to try another language or review this lesson?</p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Choose Another Language
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Demo Mode Banner */}
      {demoMode && (
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <span className="text-yellow-800 font-medium">🎤 Demo Mode</span>
            <span className="text-yellow-600 ml-2 text-sm">
              Text-to-speech is in demo mode. Add ElevenLabs credits for full audio experience.
            </span>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Learning {getCharacterName()}</h2>
        <div className="text-sm text-gray-600">
          Progress: {currentPromptIndex + 1} / {prompts[character]?.length}
        </div>
      </div>

      {/* Question Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-2">
          <h3 className="text-xl font-semibold text-gray-800">Question:</h3>
          <button
            onClick={playQuestionAudio}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
            disabled={isLoading || isAudioPlaying}
          >
            {isLoading || isAudioPlaying ? 'Speaking...' : '🔊 Repeat the question'}
          </button>
        </div>
        <div className="text-2xl font-medium text-gray-900 mb-2">{currentPrompt.text}</div>
        <div className="text-sm text-gray-500 mb-2">{currentPrompt.english}</div>
        <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded mb-2">
          💡 Hint: {currentPrompt.hint}
        </div>
        {currentPrompt.pronunciation && (
          <div className="text-sm text-purple-600 bg-purple-50 p-3 rounded flex items-center gap-2">
            🗣️ Pronunciation: {currentPrompt.pronunciation}
            <button
              onClick={() => speakPronunciation(false)}
              className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 disabled:opacity-50"
              disabled={isLoading || isAudioPlaying}
            >
              {isLoading || isAudioPlaying ? '...' : '🔊 Hear It'}
            </button>
            {currentPrompt.slowPrompt && (
              <button
                onClick={() => speakPronunciation(true)}
                className="bg-purple-700 text-white px-3 py-1 rounded hover:bg-purple-800 disabled:opacity-50"
                disabled={isLoading || isAudioPlaying}
              >
                {isLoading || isAudioPlaying ? '...' : '🐢 Hear Slower'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* User Attempts Section */}
      <div className="bg-gray-50 rounded-lg p-4 h-32 overflow-y-auto mb-6">
        {userAttempts.map((attempt, idx) => (
          <div key={idx} className="mb-2 text-right">
            <div className="inline-block max-w-xs px-4 py-2 rounded-lg bg-blue-500 text-white">
              <div className="font-medium">{attempt}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg px-4 py-3 text-lg"
            placeholder={character === 'korean-basics' ? "Type in English..." : "Type your reply..."}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            Send
          </button>
        </form>

        {/* Feedback and Answer Section */}
        {showAnswer && (
          <div className="mt-4">
            <div className="text-center p-3 rounded-lg font-medium bg-gray-100 text-gray-800">{feedback}</div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-green-700 font-semibold">Correct Answer: {currentPrompt.answer}</span>
              <button
                onClick={speakAnswer}
                className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 disabled:opacity-50"
                disabled={isLoading || isAudioPlaying}
              >
                {isLoading || isAudioPlaying ? 'Speaking...' : '🔊 Hear Answer'}
              </button>
            </div>
          </div>
        )}

        {/* Practice Speaking Section (for all languages) */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <h4 className="font-semibold text-yellow-800 mb-2">🎤 Practice Speaking</h4>
          <div className="flex gap-2">
            {/* This button now directly triggers browser speech recognition */}
            <button
              onClick={checkPronunciation}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              disabled={isRecognizing}
            >
              {isRecognizing ? 'Listening...' : 'Check My Pronunciation'}
            </button>
          </div>
          {pronunciationFeedback && (
            <p className="mt-2 text-sm text-yellow-700">{pronunciationFeedback}</p>
          )}
        </div>

        {feedback && (
          <div className={`text-center p-3 rounded-lg font-medium ${feedback.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}
