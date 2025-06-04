"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, BookOpen, Clock, CalendarPlus2Icon as CalendarIcon2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"

type RoteiroItem = {
  data: Date
  materiasFixas: string[]
  materiasDoDia: string[]
}

export function RoteiroEstudos() {
  const [materiasFixas, setMateriasFixas] = useState("")
  const [datasEstudo, setDatasEstudo] = useState<Date[]>([])
  const [roteiro, setRoteiro] = useState<RoteiroItem[]>([])

  // Exemplo de disciplinas e matérias para simulação
  const disciplinasExemplo = [
    {
      nome: "Direito Constitucional",
      materias: ["Princípios Fundamentais", "Direitos e Garantias", "Organização do Estado"],
    },
    {
      nome: "Direito Administrativo",
      materias: ["Atos Administrativos", "Licitações", "Contratos Administrativos"],
    },
    {
      nome: "Português",
      materias: ["Concordância", "Regência", "Pontuação"],
    },
    {
      nome: "Raciocínio Lógico",
      materias: ["Proposições", "Silogismos", "Lógica de Argumentação"],
    },
  ]

  const gerarRoteiro = () => {
    if (datasEstudo.length === 0) return

    const materiasFixasArray = materiasFixas
      .split(",")
      .map((m) => m.trim())
      .filter((m) => m !== "")

    const novoRoteiro: RoteiroItem[] = []

    // Distribuir matérias entre os dias selecionados
    let materiaIndex = 0
    const todasMaterias: string[] = []

    disciplinasExemplo.forEach((disc) => {
      disc.materias.forEach((mat) => {
        if (!materiasFixasArray.includes(disc.nome)) {
          todasMaterias.push(`${disc.nome} - ${mat}`)
        }
      })
    })

    datasEstudo.forEach((data) => {
      const materiasDoDia: string[] = []

      // Adicionar 2 matérias por dia (rotacionando)
      for (let i = 0; i < 2; i++) {
        materiasDoDia.push(todasMaterias[materiaIndex % todasMaterias.length])
        materiaIndex++
      }

      novoRoteiro.push({
        data,
        materiasFixas: materiasFixasArray,
        materiasDoDia,
      })
    })

    setRoteiro(novoRoteiro)
  }

  return (
    <Card className="bg-[#BBAA91] border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-[#56443F]">Gerar Roteiro de Estudos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="materias-fixas" className="text-lg font-semibold mb-2 text-[#56443F]">
            Matérias para Estudar Todos os Dias:
          </Label>
          <Input
            id="materias-fixas"
            value={materiasFixas}
            onChange={(e) => setMateriasFixas(e.target.value)}
            className="w-full p-3 rounded-md border border-[#A28776] bg-[#F1F0E2] text-[#56443F] focus:outline-none focus:ring-2 focus:ring-[#8B645A]"
            placeholder="Ex: Português, Raciocínio Lógico (separe por vírgulas)"
          />
        </div>

        <div>
          <Label className="text-lg font-semibold mb-2 text-[#56443F]">Selecione as Datas para Estudar:</Label>
          <div className="bg-[#F1F0E2] rounded-md p-4">
            <Calendar
              mode="multiple"
              selected={datasEstudo}
              onSelect={setDatasEstudo}
              className="mx-auto"
              locale={ptBR}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {datasEstudo.map((data, index) => (
              <Badge key={index} variant="outline" className="bg-[#A47864] text-[#F1F0E2]">
                {format(data, "dd/MM/yyyy")}
              </Badge>
            ))}
          </div>
        </div>

        <Button
          onClick={gerarRoteiro}
          className="w-full bg-[#A47864] text-[#F1F0E2] px-6 py-3 rounded-md font-semibold hover:bg-[#8B645A] transition-colors"
          disabled={datasEstudo.length === 0}
        >
          <CalendarIcon className="mr-2 h-5 w-5" />
          Gerar Roteiro
        </Button>

        {roteiro.length > 0 && (
          <Card className="bg-[#E4C7B7] border-none mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-[#56443F]">Meu Roteiro Diário de Estudos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {roteiro.map((item, index) => (
                <div key={index} className="bg-[#F1F0E2] p-4 rounded-md shadow-sm">
                  <div className="flex items-center mb-2">
                    <CalendarIcon2 className="h-5 w-5 mr-2 text-[#A47864]" />
                    <h3 className="text-xl font-bold text-[#56443F]">
                      {format(item.data, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                    </h3>
                  </div>

                  {item.materiasFixas.length > 0 && (
                    <div className="mb-2">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-[#A47864]" />
                        <span className="font-medium text-[#56443F]">Matérias Fixas:</span>
                      </div>
                      <div className="ml-6 mt-1 flex flex-wrap gap-1">
                        {item.materiasFixas.map((materia, idx) => (
                          <Badge key={idx} variant="outline" className="bg-[#A47864]/10 text-[#A47864]">
                            {materia}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-[#A47864]" />
                      <span className="font-medium text-[#56443F]">Matérias do Dia:</span>
                    </div>
                    <div className="ml-6 mt-1 flex flex-wrap gap-1">
                      {item.materiasDoDia.map((materia, idx) => (
                        <Badge key={idx} variant="outline" className="bg-[#A47864]/20 text-[#56443F]">
                          {materia}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
