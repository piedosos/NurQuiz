import { Clock, BookOpen, Zap } from "lucide-react";
import { Button } from "./ui/button";

export type QuizMode = "normal" | "timed";

interface ModeScreenProps {
  onSelectMode: (mode: QuizMode) => void;
  onBack: () => void;
}

export function ModeScreen({ onSelectMode, onBack }: ModeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-900 mb-3">
            Escolha o Modo de Jogo
          </h1>
          <p className="text-lg text-emerald-800 font-medium">
            Selecione como deseja jogar o quiz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Modo Normal */}
          <div
            onClick={() => onSelectMode("normal")}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-emerald-400 cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-emerald-600" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                  Modo Normal
                </h3>
                <p className="text-emerald-700 font-medium mb-4">
                  Aprenda sem pressão. Leia as explicações com calma.
                </p>
                <div className="space-y-2 text-sm text-emerald-600">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Sem limite de tempo</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Explicações completas</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl shadow-lg font-medium">
                Jogar Normal
              </div>
            </div>
          </div>

          {/* Modo Tempo */}
          <div
            onClick={() => onSelectMode("timed")}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-orange-400 cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <Zap className="w-10 h-10 text-orange-600" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-orange-900 mb-2">
                  Desafio com Tempo
                </h3>
                <p className="text-orange-700 font-medium mb-4">
                  Teste sua velocidade! 10 segundos por pergunta.
                </p>
                <div className="space-y-2 text-sm text-orange-600">
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>10 segundos por pergunta</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Adrenalina e rapidez</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl shadow-lg font-medium">
                Aceitar Desafio
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 rounded-2xl"
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}