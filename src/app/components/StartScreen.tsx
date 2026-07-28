import { Sparkles, Clock, CheckCircle2, BookOpen, Trophy, LogOut } from "lucide-react";
import { Button } from "./ui/button";

interface StartScreenProps {
  onStart: () => void;
  onShowLeaderboard?: () => void;
  onLogout?: () => void;
  username?: string | null;
}

export function StartScreen({ onStart, onShowLeaderboard, onLogout, username }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {username && (
          <div className="flex items-center justify-between text-sm text-emerald-700">
            <span>Assalamu Alaikum, {username} 👋</span>
            {onLogout && (
              <button onClick={onLogout} className="flex items-center gap-1 hover:underline">
                <LogOut className="w-4 h-4" /> Sair
              </button>
            )}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-emerald-900">
            Nur Quiz
          </h1>
          
          <p className="text-lg text-emerald-800 max-w-sm mx-auto font-medium">
            Desafie seus conhecimentos e aprenda mais sobre a história e os valores do Islam
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <Button
            onClick={onStart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 w-full"
            size="lg"
          >
            Começar
          </Button>

          {onShowLeaderboard && (
            <Button
              onClick={onShowLeaderboard}
              variant="outline"
              className="border-emerald-600 text-emerald-700 px-12 py-6 rounded-2xl w-full flex items-center justify-center gap-2"
              size="lg"
            >
              <Trophy className="w-5 h-5" /> Ver Ranking
            </Button>
          )}
        </div>

        <div className="text-sm text-emerald-700 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            <span>135 perguntas</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Múltipla escolha</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Aprenda e compartilhe</span>
          </div>
        </div>
      </div>
    </div>
  );
}