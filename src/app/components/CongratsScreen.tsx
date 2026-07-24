import { Award, ArrowRight, Home, RotateCcw, Gift } from "lucide-react";

export interface CongratsScreenProps {
  levelName: string;
  score: number;
  total: number;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onRetry: () => void;
  onBackToMenu: () => void;
  onShowDua?: () => void;
}

export function CongratsScreen({
  levelName,
  score,
  total,
  hasNextLevel,
  onNextLevel,
  onRetry,
  onBackToMenu,
  onShowDua,
}: CongratsScreenProps) {
  const percentage = Math.round((score / total) * 100);
  const isPerfectScore = score === total;
  const nextLevelName = 
    levelName === "Fácil" ? "Intermediário" : 
    levelName === "Médio" ? "Avançado" : 
    "";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 p-6 relative overflow-hidden">
      {/* Padrão decorativo de fundo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-2xl w-full">
        {/* Ícone de troféu animado */}
        <div className="flex justify-center mb-8 animate-bounce">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-8 shadow-2xl">
            <Award className="w-24 h-24 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Cartão de parabéns */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">
            {isPerfectScore ? "Perfeito! 🎉" : "Parabéns! "}
          </h1>
          
          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Você concluiu o <span className="font-bold text-emerald-700">Nível {levelName}</span>!
          </p>

          {/* Pontuação */}
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl p-6 mb-8">
            <p className="text-lg text-gray-600 mb-2">Sua pontuação:</p>
            <p className="text-5xl font-bold text-emerald-700 mb-2">
              {score}/{total}
            </p>
            <p className="text-2xl font-semibold text-emerald-600">
              {percentage}% de acertos
            </p>
            
            {isPerfectScore && (
              <p className="mt-4 text-amber-600 font-semibold text-lg">
                ⭐ Pontuação Perfeita! ⭐
              </p>
            )}
          </div>

          {/* Mensagem motivacional */}
          <div className="mb-8 p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
            <p className="text-gray-700 italic">
              "O conhecimento é uma luz que Allah coloca no coração de quem Ele quer."
            </p>
            <p className="text-sm text-gray-500 mt-2">- Provérbio Islâmico</p>
          </div>

          {/* Botões de ação */}
          <div className="space-y-4">
            {/* Botão de Recompensa - Dua do Dia */}
            {onShowDua && (
              <button
                onClick={onShowDua}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-3 group mb-4"
              >
                <Gift className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>🎁 Receber Dua do Dia como Recompensa</span>
              </button>
            )}

            {/* Botão principal - Próximo Nível */}
            {hasNextLevel && (
              <button
                onClick={onNextLevel}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>Próximo Nível: {nextLevelName}</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Botões secundários */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onRetry}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Refazer Nível</span>
              </button>
              
              <button
                onClick={onBackToMenu}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                <span>Voltar ao Menu</span>
              </button>
            </div>
          </div>

          {/* Dica para próximo nível */}
          {hasNextLevel && (
            <p className="mt-6 text-sm text-gray-500">
              Continue sua jornada de conhecimento islâmico! 🌙
            </p>
          )}
        </div>
      </div>
    </div>
  );
}