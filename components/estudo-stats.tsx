"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, BarChart3, Clock, Calendar } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type SessaoEstudo = {
  id: string
  disciplina: string
  materia: string
  duracao: number // em segundos
  data: Date
}

export function EstudoStats() {
  const [isActive, setIsActive] = useState(false)
  const [segundos, setSegundos] = useState(0)
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState("Direito Administrativo")
  const [materiaSelecionada, setMateriaSelecionada] = useState("Atos Administrativos")
  const [sessoes, setSessoes] = useState<SessaoEstudo[]>([
    {
      id: "1",
      disciplina: "Direito Administrativo",
      materia: "Atos Administrativos",
      duracao: 3600, // 1 hora
      data: new Date(Date.now() - 86400000), // ontem
    },
    {
      id: "2",
      disciplina: "Direito Constitucional",
      materia: "Princípios Fundamentais",
      duracao: 5400, // 1.5 horas
      data: new Date(Date.now() - 172800000), // anteontem
    },
    {
      id: "3",
      disciplina: "Português",
      materia: "Concordância",
      duracao: 2700, // 45 minutos
      data: new Date(Date.now() - 259200000), // 3 dias atrás
    },
  ])

  // Simulação de disciplinas e matérias
  const disciplinas = [
    {
      nome: "Direito Administrativo",
      materias: ["Atos Administrativos", "Licitações", "Contratos Administrativos"],
    },
    {
      nome: "Direito Constitucional",
      materias: ["Princípios Fundamentais", "Direitos e Garantias", "Organização do Estado"],
    },
    {
      nome: "Português",
      materias: ["Concordância", "Regência", "Pontuação"],
    },
  ]

  const formatarTempo = (segundos: number) => {
    const horas = Math.floor(segundos / 3600)
    const minutos = Math.floor((segundos % 3600) / 60)
    const segs = segundos % 60

    return `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:${segs.toString().padStart(2, "0")}`
  }

  const iniciarCronometro = () => {
    setIsActive(true)
  }

  const pausarCronometro = () => {
    setIsActive(false)
  }

  const resetarCronometro = () => {
    setIsActive(false)
    setSegundos(0)
  }

  const salvarSessao = () => {
    if (segundos === 0) return

    const novaSessao: SessaoEstudo = {
      id: Date.now().toString(),
      disciplina: disciplinaSelecionada,
      materia: materiaSelecionada,
      duracao: segundos,
      data: new Date(),
    }

    setSessoes([novaSessao, ...sessoes])
    resetarCronometro()
  }

  const calcularTempoTotal = () => {
    return sessoes.reduce((total, sessao) => total + sessao.duracao, 0)
  }

  const calcularTempoPorDisciplina = () => {
    const tempoPorDisciplina: Record<string, number> = {}

    sessoes.forEach((sessao) => {
      if (!tempoPorDisciplina[sessao.disciplina]) {
        tempoPorDisciplina[sessao.disciplina] = 0
      }
      tempoPorDisciplina[sessao.disciplina] += sessao.duracao
    })

    return tempoPorDisciplina
  }

  const calcularTempoPorDia = () => {
    const tempoPorDia: Record<string, number> = {}

    sessoes.forEach((sessao) => {
      const dataFormatada = sessao.data.toISOString().split("T")[0]
      if (!tempoPorDia[dataFormatada]) {
        tempoPorDia[dataFormatada] = 0
      }
      tempoPorDia[dataFormatada] += sessao.duracao
    })

    return tempoPorDia
  }

  // Simulação do efeito do cronômetro
  // Em uma implementação real, usaríamos useEffect com setInterval
  if (isActive) {
    setTimeout(() => {
      setSegundos(segundos + 1)
    }, 1000)
  }

  return (
    <Card className="bg-[#E4C7B7] border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-[#56443F]">Contador de Horas de Estudo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-[#F1F0E2] p-4 rounded-md">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#56443F] mb-1">Disciplina:</label>
              <select
                value={disciplinaSelecionada}
                onChange={(e) => setDisciplinaSelecionada(e.target.value)}
                className="w-full p-2 rounded-md border border-[#BBAA91] bg-[#F1F0E2] text-[#56443F] focus:outline-none focus:ring-2 focus:ring-[#A47864]"
              >
                {disciplinas.map((disc) => (
                  <option key={disc.nome} value={disc.nome}>
                    {disc.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#56443F] mb-1">Matéria:</label>
              <select
                value={materiaSelecionada}
                onChange={(e) => setMateriaSelecionada(e.target.value)}
                className="w-full p-2 rounded-md border border-[#BBAA91] bg-[#F1F0E2] text-[#56443F] focus:outline-none focus:ring-2 focus:ring-[#A47864]"
              >
                {disciplinas
                  .find((d) => d.nome === disciplinaSelecionada)
                  ?.materias.map((mat) => (
                    <option key={mat} value={mat}>
                      {mat}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="text-center py-6">
            <div className="text-5xl font-mono font-bold text-[#A47864] mb-6">{formatarTempo(segundos)}</div>
            <div className="flex justify-center space-x-4">
              {!isActive ? (
                <Button onClick={iniciarCronometro} className="bg-[#A47864] text-[#F1F0E2] hover:bg-[#8B645A]">
                  <Play className="mr-2 h-4 w-4" />
                  Iniciar
                </Button>
              ) : (
                <Button onClick={pausarCronometro} className="bg-[#A47864] text-[#F1F0E2] hover:bg-[#8B645A]">
                  <Pause className="mr-2 h-4 w-4" />
                  Pausar
                </Button>
              )}
              <Button
                onClick={resetarCronometro}
                variant="outline"
                className="border-[#A47864] text-[#A47864] hover:bg-[#A47864]/10"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Resetar
              </Button>
              <Button
                onClick={salvarSessao}
                className="bg-[#56443F] text-[#F1F0E2] hover:bg-[#56443F]/80"
                disabled={segundos === 0}
              >
                Salvar Sessão
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="resumo" className="w-full">
          <TabsList className="grid grid-cols-3 bg-[#F1F0E2]">
            <TabsTrigger value="resumo" className="data-[state=active]:bg-[#A47864] data-[state=active]:text-[#F1F0E2]">
              Resumo
            </TabsTrigger>
            <TabsTrigger
              value="disciplinas"
              className="data-[state=active]:bg-[#A47864] data-[state=active]:text-[#F1F0E2]"
            >
              Por Disciplina
            </TabsTrigger>
            <TabsTrigger
              value="historico"
              className="data-[state=active]:bg-[#A47864] data-[state=active]:text-[#F1F0E2]"
            >
              Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resumo" className="mt-4">
            <Card className="bg-[#F1F0E2] border-none">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#A47864]/10 rounded-md">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-[#A47864]" />
                    <span className="font-medium">Tempo total de estudo:</span>
                  </div>
                  <span className="text-xl font-bold text-[#A47864]">{formatarTempo(calcularTempoTotal())}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#A47864]/10 rounded-md">
                  <div className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-[#A47864]" />
                    <span className="font-medium">Sessões registradas:</span>
                  </div>
                  <span className="text-xl font-bold text-[#A47864]">{sessoes.length}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#A47864]/10 rounded-md">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-[#A47864]" />
                    <span className="font-medium">Dias de estudo:</span>
                  </div>
                  <span className="text-xl font-bold text-[#A47864]">{Object.keys(calcularTempoPorDia()).length}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disciplinas" className="mt-4">
            <Card className="bg-[#F1F0E2] border-none">
              <CardContent className="p-4 space-y-4">
                {Object.entries(calcularTempoPorDisciplina()).map(([disciplina, tempo]) => (
                  <div key={disciplina} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-[#56443F]">{disciplina}</span>
                      <span className="text-[#A47864]">{formatarTempo(tempo)}</span>
                    </div>
                    <Progress
                      value={(tempo / calcularTempoTotal()) * 100}
                      className="h-2 bg-[#BBAA91]"
                      indicatorClassName="bg-[#A47864]"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico" className="mt-4">
            <Card className="bg-[#F1F0E2] border-none">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {sessoes.map((sessao) => (
                    <div
                      key={sessao.id}
                      className="p-3 border border-[#BBAA91]/50 rounded-md flex flex-col sm:flex-row justify-between"
                    >
                      <div>
                        <div className="font-medium text-[#56443F]">
                          {sessao.disciplina} - {sessao.materia}
                        </div>
                        <div className="text-sm text-[#56443F]/70">{sessao.data.toLocaleDateString()}</div>
                      </div>
                      <div className="text-[#A47864] font-mono font-medium mt-2 sm:mt-0">
                        {formatarTempo(sessao.duracao)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
