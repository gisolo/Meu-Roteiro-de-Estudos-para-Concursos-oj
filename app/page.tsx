import { ConcursoInfo } from "@/components/concurso-info"
import { DisciplinasManager } from "@/components/disciplinas-manager"
import { RoteiroEstudos } from "@/components/roteiro-estudos"
import { EstudoStats } from "@/components/estudo-stats"
import { BibliotecaRecursos } from "@/components/biblioteca-recursos"
import { RevisaoEspacada } from "@/components/revisao-espacada"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F1F0E2] p-4 md:p-8 text-[#56443F]">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-[#A47864] text-center">
        Meu Roteiro de Estudos para Concursos
      </h1>

      <div className="max-w-6xl mx-auto grid gap-8">
        <ConcursoInfo />
        <DisciplinasManager />
        <RoteiroEstudos />
        <EstudoStats />
        <RevisaoEspacada />
        <BibliotecaRecursos />
      </div>
    </div>
  )
}
