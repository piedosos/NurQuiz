import { Book, Heart, Star, Globe, ArrowLeft, User, Users, Lightbulb, Shield, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: "book" | "heart" | "star" | "globe" | "user" | "users" | "lightbulb" | "shield" | "book-open";
  questionCount: number;
}

interface CategoryScreenProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
  onBack: () => void;
}

const iconMap = {
  book: Book,
  heart: Heart,
  star: Star,
  globe: Globe,
  user: User,
  users: Users,
  lightbulb: Lightbulb,
  shield: Shield,
  "book-open": BookOpen,
};

export function CategoryScreen({ categories, onSelectCategory, onBack }: CategoryScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-900 mb-3">
            Escolha uma Categoria
          </h1>
          <p className="text-lg text-emerald-800 font-medium">
            Selecione o tema que deseja explorar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.icon];
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className="bg-white rounded-2xl shadow-lg p-8 text-left hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-emerald-400"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-bold text-emerald-900">
                      {category.name}
                    </h3>
                    <p className="text-emerald-700 font-medium">
                      {category.description}
                    </p>
                    <div className="text-sm text-emerald-600 pt-2 font-medium">
                      {category.questionCount} perguntas
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}