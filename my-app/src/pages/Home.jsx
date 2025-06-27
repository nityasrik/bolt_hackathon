// UI DESIGN PROMPT FOR FRONTEND TEAMMATE:
//
// - Create a visually engaging landing page for a language learning app.
// - The page should have a prominent app title and tagline at the top.
// - Below, display a language/character selection grid or cards (with images, names, and short descriptions).
// - Add a section showing the user's recent progress (e.g., last completed lesson, streak, or XP).
// - Include a "Motivational Quote of the Day" and a "Fun Fact of the Day" (can be in a card or banner).
// - At the bottom, add a user feedback/testimonials carousel or section.
// - Use clear call-to-action buttons for starting or resuming lessons.
// - Make the layout responsive and accessible.
// - Add a "Resume Lesson Button to the bottom of the Page"
// (No styling in this file, just structure and features.)

import { useNavigate } from "react-router-dom";
import frenchChefImg from '../assets/french-chef.png';
import spanishTeacherImg from '../assets/spanish-teacher.png';
import koreanActorImg from '../assets/korean-actor.png';

const characters = [
  {
    id: "french-basics",
    name: "French Basics",
    image: frenchChefImg,
    description: "Learn basic French phrases and greetings",
    level: "Beginner"
  },
  {
    id: "spanish-conversation",
    name: "Spanish Conversation",
    image: spanishTeacherImg,
    description: "Practice conversational Spanish",
    level: "Intermediate"
  },
  {
    id: "korean-basics",
    name: "Korean Basics",
    image: koreanActorImg,
    description: "Learn Korean basics with pronunciation feedback",
    level: "Beginner"
  },
];

// Example data for progress, quote, fun fact, and testimonials
const userProgress = {
  lastLesson: "French Basics",
  streak: 5,
  xp: 1200
};
const motivationalQuote = "Learning a new language is like gaining a new soul. – Czech Proverb";
const funFact = "Did you know? The French language has more than a million words!";
const testimonials = [
  { name: "Ava", feedback: "This app made learning Spanish so much fun!" },
  { name: "Liam", feedback: "I love the speaking practice with the characters." },
  { name: "Sofia", feedback: "The fun facts keep me motivated every day!" }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Voicenary</h1>
      <p>Your fun, interactive language learning adventure!</p>
      <h2>Choose Your Language Adventure</h2>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center", maxWidth: "800px" }}>
        {characters.map((char) => (
          <div key={char.id} style={{ border: "2px solid #e5e7eb", borderRadius: "12px", padding: "24px", textAlign: "center", width: "250px", backgroundColor: "white", cursor: "pointer" }} onClick={() => navigate(`/chat/${char.id}`)}>
            <img src={char.image} alt={char.name} style={{ width: "140px", height: "140px", objectFit: "cover", objectPosition: "center top", borderRadius: "50%", marginBottom: "16px" }} />
            <h2>{char.name}</h2>
            <p>{char.description}</p>
            <span>{char.level}</span>
            <button>Start Learning</button>
          </div>
        ))}
      </div>

      {/* User Progress Section */}
      <section>
        <h2>Your Progress</h2>
        <p>Last Lesson: {userProgress.lastLesson}</p>
        <p>Streak: {userProgress.streak} days</p>
        <p>XP: {userProgress.xp}</p>
        <button>Resume Lesson</button>
      </section>

      {/* Motivational Quote Section */}
      <section>
        <h2>Motivational Quote of the Day</h2>
        <blockquote>{motivationalQuote}</blockquote>
      </section>

      {/* Fun Fact Section */}
      <section>
        <h2>Fun Fact of the Day</h2>
        <p>{funFact}</p>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2>What Our Learners Say</h2>
        <ul>
          {testimonials.map((t, idx) => (
            <li key={idx}>
              <strong>{t.name}:</strong> {t.feedback}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
