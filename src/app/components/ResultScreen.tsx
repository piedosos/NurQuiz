import { Trophy, RotateCcw, Gift } from "lucide-react";
import { Button } from "./ui/button";

interface ResultScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
  onShowDua: () => void;
}

export function ResultScreen({ score, total, onRestart, onShowDua }: ResultScreenProps) {
  const percentage = (score / total) * 100;
  
  const getMessage = () => {
    if (percentage === 100) return "Perfeito! Má shá Allah!";
    if (percentage >= 80) return "Excelente! Muito bem!";
    if (percentage >= 60) return "Bom trabalho!";
    if (percentage >= 40) return "Continue praticando!";
    return "Não desista, estude mais!";
  };

  const getEmoji = () => {
    if (percentage === 100) return "🌟";
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "👏";
    if (percentage >= 40) return "💪";
    return "📚";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-6xl">{getEmoji()}</div>
            <h1 className="text-3xl font-bold text-emerald-900">
              {getMessage()}
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
            <div className="text-emerald-700 font-medium">Sua pontuação</div>
            <div className="text-6xl font-bold text-emerald-600">
              {score}/{total}
            </div>
            <div className="text-lg text-emerald-800 font-medium">
              {percentage.toFixed(0)}% de acertos
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onShowDua}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-12 py-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            size="lg"
          >
            <Gift className="w-5 h-5" />
            Receber sua Dua 🎁
          </Button>
          <Button
            onClick={onRestart}
            variant="outline"
            className="w-full border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-12 py-6 rounded-2xl shadow-lg flex items-center justify-center gap-3"
            size="lg"
          >
            <RotateCcw className="w-5 h-5" />
            Jogar Novamente
          </Button>
        </div>
      </div>
    </div>
  );
}