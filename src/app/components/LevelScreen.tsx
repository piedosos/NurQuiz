import { Star, TrendingUp, Award, ArrowLeft, Lock } from "lucide-react";
import { Button } from "./ui/button";

export type Level = 1 | 2 | 3;

interface LevelData {
  level: Level;
  name: string;
  description: string;
  questionRange: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: typeof Star;
}

interface LevelScreenProps {
  onSelectLevel: (level: Level) => void;
  onBack: () => void;
  categoryName: string;
  unlockedLevels: Level[];
}

const levels: LevelData[] = [
  {
    level: 1,
    name: "Nível 1 - Básico",
    description: "Perguntas fundamentais para iniciantes",
    questionRange: "Perguntas 1-5",
    color: "text-green-900",
    bgColor: "bg-green-100",
    borderColor: "border-green-400",
    icon: Star,
  },
  {
    level: 2,
    name: "Nível 2 - Intermediário",
    description: "Aprofunde seu conhecimento",
    questionRange: "Perguntas 6-10",
    color: "text-blue-900",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-400",
    icon: TrendingUp,
  },
  {
    level: 3,
    name: "Nível 3 - Avançado",
    description: "Desafie-se com perguntas complexas",
    questionRange: "Perguntas 11-15",
    color: "text-purple-900",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-400",
    icon: Award,
  },
];

export function LevelScreen({ onSelectLevel, onBack, categoryName, unlockedLevels }: LevelScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 rounded-2xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-900 mb-3">
            Escolha o Nível
          </h1>
          <p className="text-lg text-emerald-800 font-medium">
            {categoryName}
          </p>
          <p className="text-emerald-700 mt-2 font-medium">
            Progresso do iniciante ao avançado
          </p>
        </div>

        <div className="space-y-6">
          {levels.map((levelData) => {
            const Icon = levelData.icon;
            const isLocked = !unlockedLevels.includes(levelData.level);
            
            return (
              <div
                key={levelData.level}
                onClick={() => !isLocked && onSelectLevel(levelData.level)}
                className={`w-full bg-white rounded-2xl shadow-lg p-8 text-left border-2 transition-all duration-300 ${
                  isLocked 
                    ? 'opacity-60 cursor-not-allowed border-gray-300' 
                    : 'hover:shadow-2xl hover:scale-105 border-transparent hover:border-emerald-400 group cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-20 h-20 ${isLocked ? 'bg-gray-200' : levelData.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 ${!isLocked && 'group-hover:scale-110 transition-transform'}`}>
                    {isLocked ? (
                      <Lock className="w-10 h-10 text-gray-500" />
                    ) : (
                      <Icon className={`w-10 h-10 ${levelData.color.replace('text-', 'text-').replace('-900', '-600')}`} />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className={`text-2xl font-bold ${isLocked ? 'text-gray-600' : 'text-emerald-900'}`}>
                      {levelData.name}
                    </h3>
                    <p className={`font-medium ${isLocked ? 'text-gray-500' : 'text-emerald-700'}`}>
                      {isLocked ? '🔒 Complete o nível anterior para desbloquear' : levelData.description}
                    </p> 
                    {!isLocked && (
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`${levelData.color} font-semibold px-3 py-1 ${levelData.bgColor} rounded-full`}>
                          {levelData.questionRange}
                        </span>
                        <span className="text-emerald-600 font-medium">
                          5 perguntas
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="hidden md:block">
                    {isLocked ? (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Lock className="w-6 h-6 text-gray-500" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                        <span className="text-2xl">→</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-block bg-emerald-50 rounded-2xl px-6 py-4 border-2 border-emerald-200">
            <p className="text-emerald-800 font-medium">
              💡 Dica: Complete cada nível em sequência para melhor aprendizado!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}