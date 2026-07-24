import { useState, useEffect } from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { CheckCircle2, XCircle, BookOpen, Timer, Heart } from "lucide-react";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizScreenProps {
  questions: Question[];
  onComplete: (score: number) => void;
  mode?: "normal" | "timed";
}

export function QuizScreen({ questions, onComplete, mode = "normal" }: QuizScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [lives, setLives] = useState(3);
  const [isLosingLife, setIsLosingLife] = useState(false);

  // Verificar se há perguntas disponíveis
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">
            Nenhuma pergunta disponível
          </h2>
          <p className="text-emerald-700 font-medium">
            Não há perguntas para este nível ainda.
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isTimed = mode === "timed";

  // Timer effect para modo com tempo
  useEffect(() => {
    if (!isTimed || showFeedback) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Tempo esgotado - submeter resposta automaticamente
      handleSubmit();
    }
  }, [timeLeft, isTimed, showFeedback]);

  // Resetar timer ao mudar de pergunta
  useEffect(() => {
    setTimeLeft(10);
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null && !isTimed) return;
    
    setShowFeedback(true);
    
    // Se o tempo acabou e não selecionou nada, conta como erro
    const isCorrect = selectedAnswer !== null && selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    } else {
      // Perdeu uma vida!
      const newLives = lives - 1;
      setLives(newLives);
      
      // Feedback visual de perda de vida
      setIsLosingLife(true);
      setTimeout(() => setIsLosingLife(false), 800);
      
      // Vibração no mobile
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]); // Padrão de vibração
      }
      
      // Som de erro (beep)
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 200; // Frequência baixa para som de erro
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (e) {
        console.log("Audio not supported");
      }
      
      // Se lives chegou a 0, terminar o jogo
      if (newLives === 0) {
        setTimeout(() => {
          onComplete(score); // Passa score atual como "Game Over"
        }, 1500); // Delay para mostrar feedback
        return;
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      const finalScore = selectedAnswer === currentQuestion.correctAnswer ? score + 0 : score;
      onComplete(finalScore);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex flex-col">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex justify-between items-center text-sm text-emerald-700">
            <span>Pergunta {currentQuestionIndex + 1} de {questions.length}</span>
            
            {/* Display de Vidas (Corações) */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-emerald-800">Vidas:</span>
              <div className={`flex gap-1 transition-all duration-300 ${isLosingLife ? 'animate-shake' : ''}`}>
                {[...Array(3)].map((_, index) => (
                  <Heart
                    key={index}
                    className={`w-6 h-6 transition-all duration-300 ${
                      index < lives 
                        ? 'fill-red-500 text-red-500' 
                        : 'fill-gray-300 text-gray-300'
                    } ${
                      isLosingLife && index === lives 
                        ? 'animate-ping' 
                        : ''
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Game Over Overlay */}
      {lives === 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-12 text-center space-y-6 max-w-md animate-scale-in">
            <div className="text-6xl">💔</div>
            <h2 className="text-4xl font-bold text-red-600">Game Over!</h2>
            <p className="text-xl text-gray-700">
              Você perdeu todas as vidas
            </p>
            <p className="text-lg text-gray-600">
              Pontuação final: <span className="font-bold text-emerald-600">{score}</span>
            </p>
          </div>
        </div>
      )}

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full space-y-8">
          {/* Timer display para modo com tempo */}
          {isTimed && !showFeedback && (
            <div className="flex justify-center">
              <div className={`
                w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-300
                ${timeLeft <= 3 ? 'bg-red-500 animate-pulse' : timeLeft <= 5 ? 'bg-orange-500' : 'bg-emerald-500'}
              `}>
                <div className="text-center text-white">
                  <Timer className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-xl font-bold">{timeLeft}</div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <h2 className="text-2xl text-emerald-900 text-center leading-relaxed">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showCorrect = showFeedback && isCorrect;
                const showIncorrect = showFeedback && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`
                      w-full text-left p-5 rounded-2xl border-2 transition-all duration-200
                      ${!showFeedback && isSelected ? 'border-emerald-600 bg-emerald-50' : ''}
                      ${!showFeedback && !isSelected ? 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50' : ''}
                      ${showCorrect ? 'border-green-500 bg-green-50' : ''}
                      ${showIncorrect ? 'border-red-500 bg-red-50' : ''}
                      ${showFeedback && !isSelected && !isCorrect ? 'border-gray-200 bg-gray-50 opacity-50' : ''}
                      disabled:cursor-not-allowed
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 font-medium">{option}</span>
                      {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                      {showIncorrect && <XCircle className="w-6 h-6 text-red-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation Box */}
            {showFeedback && (
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="font-semibold">Explicação</h3>
                </div>
                <p className="text-emerald-900 leading-relaxed font-medium">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            <div className="pt-4">
              {!showFeedback ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-2xl shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Confirmar Resposta
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-2xl shadow-lg"
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}