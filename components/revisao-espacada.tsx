"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Calendar, CheckCircle, Clock, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { format, addDays } from "date-fns"

type MateriaRevisao = {
  id: string
  disciplina: string
  materia: string
  dataEstudo: Date
  revisoes: {
    numero: number
    data: Date
    concluida: boolean
  }[]
}

export function RevisaoEspacada() {
  const [materiasRevisao, setMateriasRevisao] = useState<MateriaRevisao[]>([
    {
      id: "1",
      disciplina: "Direito Administrativo",
      materia: "Atos Administrativos",
      dataEstudo: new Date(Date.now() - 7 * 86400000), // 7 dias atrás
      revisoes: [
        {
          numero: 1,
          data: new Date(Date.now() - 6 * 86400000), // 6 dias atrás
          concluida: true,
        },
        {
          numero: 2,
          data: new Date(Date.now() - 3 * 86400000), // 3 dias atrás
          concluida: true,
        },
        {
          numero: 3,
          data: new Date(Date.now() + 1 * 86400000), // amanhã
          concluida: false,
        },
        {
          numero: 4,
          data: new Date(Date.now() + 7 * 86400000), // daqui a 7 dias
          concluida: false,
        },
      ],
    },
    {
      id: "2",
      disciplina: "Direito Constitucional",
      materia: "Princípios Fundamentais",
      dataEstudo: new Date(Date.now() - 3 * 86400000), // 3 dias atrás
      revisoes: [
        {
          numero: 1,
          data: new Date(Date.now() - 2 * 86400000), // 2 dias atrás
          concluida: true,
        },
        {
          numero: 2,
          data: new Date(Date.now() + 1 * 86400000), // amanhã
          concluida: false,
        },
        {
          numero: 3,
          data: new Date(Date.now() + 4 * 86400000), // daqui a 4 dias
          concluida: false,
        },
        {
          numero: 4,
          data: new Date(Date.now() + 10 * 86400000), // daqui a 10 dias
          concluida: false,
        },
      ],
    },
  ])

  const marcarRevisaoConcluida = (materiaId: string, revisaoNumero: number) => {
    setMateriasRevisao(
      materiasRevisao.map((materia) => {
        if (materia.id === materiaId) {
          return {
            ...materia,
            revisoes: materia.revisoes.map((revisao) => {
              if (revisao.numero === revisaoNumero) {
                return {
                  ...revisao,
                  concluida: true,
                }
              }
              return revisao
            }),
          }
        }
        return materia
      }),
    )
  }

  const getRevisoesHoje = () => {
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    const revisoesHoje: { materiaId: string; materia: string; disciplina: string; revisaoNumero: number }[] = []

    materiasRevisao.forEach((materia) => {
      materia.revisoes.forEach((revisao) => {
        const dataRevisao = new Date(revisao.data)
        dataRevisao.setHours(0, 0, 0, 0)

        if (dataRevisao.getTime() === hoje.getTime() && !revisao.concluida) {
          revisoesHoje.push({
            materiaId: materia.id,
            materia: materia.materia,
            disciplina: materia.disciplina,
            revisaoNumero: revisao.numero,
          })
        }
      })
    })

    return revisoesHoje
  }

  const getProximasRevisoes = () => {
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    const proximasRevisoes: {
      materiaId: string
      materia: string
      disciplina: string
      revisaoNumero: number
      data: Date
    }[] = []

    materiasRevisao.forEach((materia) => {
      materia.revisoes.forEach((revisao) => {
        const dataRevisao = new Date(revisao.data)
        dataRevisao.setHours(0, 0, 0, 0)

        if (dataRevisao.getTime() > hoje.getTime() && !revisao.concluida) {
          proximasRevisoes.push({
            materiaId: materia.id,
            materia: materia.materia,
            disciplina: materia.disciplina,
            revisaoNumero: revisao.numero,
            data: revisao.data,
          })
        }
      })
    })

    return proximasRevisoes.sort((a, b) => a.data.getTime() - b.data.getTime()).slice(0, 5)
  }

  const adicionarMateriaParaRevisao = () => {
    // Simulação de adição de matéria para revisão
    const novaMateria: MateriaRevisao = {
      id: Date.now().toString(),
      disciplina: "Português",
      materia: "Concordância",
      dataEstudo: new Date(),
      revisoes: [
        {
          numero: 1,
          data: addDays(new Date(), 1),
          concluida: false,
        },
        {
          numero: 2,
          data: addDays(new Date(), 3),
          concluida: false,
        },
        {
          numero: 3,
          data: addDays(new Date(), 7),
          concluida: false,
        },
        {
          numero: 4,
          data: addDays(new Date(), 14),
          concluida: false,
        },
      ],
    }

    setMateriasRevisao([...materiasRevisao, novaMateria])
  }

  return (
    <Card className="bg-[#C39D88] border-none shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-[#56443F]">Sistema de Repetição Espaçada</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#56443F]">
                  <Info className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-[#F1F0E2] text-[#56443F] border-[#BBAA91]">
                <p>
                  O sistema de repetição espaçada programa revisões em intervalos crescentes para otimizar a
                  memorização. As revisões são agendadas em 1, 3, 7 e 14 dias após o estudo inicial.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#F1F0E2] border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#56443F]">Revisões para Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              {getRevisoesHoje().length > 0 ? (
                <div className="space-y-3">
                  {getRevisoesHoje().map((revisao, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-[#BBAA91]/50 rounded-md"
                    >
                      <div>
                        <div className="font-medium text-[#56443F]">
                          {revisao.disciplina} - {revisao.materia}
                        </div>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="bg-[#A47864]/10 text-[#A47864] border-[#A47864]/20">
                            Revisão {revisao.revisaoNumero}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => marcarRevisaoConcluida(revisao.materiaId, revisao.revisaoNumero)}
                        className="bg-[#A47864] text-[#F1F0E2] hover:bg-[#8B645A]"
                        size="sm"
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Concluir
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-[#56443F]/70">
                  <Brain className="mx-auto h-12 w-12 text-[#A47864] mb-2 opacity-50" />
                  <p>Nenhuma revisão agendada para hoje.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#F1F0E2] border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#56443F]">Próximas Revisões</CardTitle>
            </CardHeader>
            <CardContent>
              {getProximasRevisoes().length > 0 ? (
                <div className="space-y-3">
                  {getProximasRevisoes().map((revisao, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-[#BBAA91]/50 rounded-md"
                    >
                      <div>
                        <div className="font-medium text-[#56443F]">
                          {revisao.disciplina} - {revisao.materia}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="bg-[#A47864]/10 text-[#A47864] border-[#A47864]/20">
                            Revisão {revisao.revisaoNumero}
                          </Badge>
                          <div className="flex items-center text-sm text-[#56443F]/70">
                            <Calendar className="mr-1 h-3 w-3" />
                            {format(revisao.data, "dd/MM/yyyy")}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-[#56443F]/70">
                  <Calendar className="mx-auto h-12 w-12 text-[#A47864] mb-2 opacity-50" />
                  <p>Nenhuma revisão agendada para os próximos dias.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#F1F0E2] border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#56443F]">Matérias em Revisão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {materiasRevisao.map((materia) => (
                <div key={materia.id} className="p-3 border border-[#BBAA91]/50 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-[#56443F]">
                        {materia.disciplina} - {materia.materia}
                      </div>
                      <div className="text-sm text-[#56443F]/70 flex items-center mt-1">
                        <Clock className="mr-1 h-3 w-3" />
                        Estudado em: {format(materia.dataEstudo, "dd/MM/yyyy")}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {materia.revisoes.map((revisao) => (
                      <Badge
                        key={revisao.numero}
                        variant="outline"
                        className={`${
                          revisao.concluida
                            ? "bg-[#A47864]/20 text-[#56443F] border-[#A47864]/30"
                            : "bg-[#F1F0E2] text-[#56443F] border-[#BBAA91]"
                        }`}
                      >
                        {revisao.concluida && <CheckCircle className="mr-1 h-3 w-3" />}
                        Rev. {revisao.numero}: {format(revisao.data, "dd/MM")}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={adicionarMateriaParaRevisao}
              className="w-full mt-4 bg-[#A47864] text-[#F1F0E2] hover:bg-[#8B645A]"
            >
              <Brain className="mr-2 h-4 w-4" />
              Adicionar Nova Matéria para Revisão
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
