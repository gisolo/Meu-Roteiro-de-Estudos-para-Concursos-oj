"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PlusCircle, BookOpen, RotateCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

type Materia = {
  id: string
  nome: string
  concluida: boolean
  paraRevisao: boolean
  anotacoes: string
}

type Disciplina = {
  id: string
  nome: string
  materias: Materia[]
}

export function DisciplinasManager() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([
    {
      id: "1",
      nome: "Direito Administrativo",
      materias: [
        {
          id: "1-1",
          nome: "Princípios da Administração Pública",
          concluida: false,
          paraRevisao: false,
          anotacoes: "",
        },
        {
          id: "1-2",
          nome: "Poderes Administrativos",
          concluida: false,
          paraRevisao: false,
          anotacoes: "",
        },
      ],
    },
  ])
  const [novaDisciplina, setNovaDisciplina] = useState("")
  const [novasMaterias, setNovasMaterias] = useState<Record<string, string>>({})

  const adicionarDisciplina = () => {
    if (novaDisciplina.trim() === "") return

    const novaDisciplinaObj: Disciplina = {
      id: Date.now().toString(),
      nome: novaDisciplina,
      materias: [],
    }

    setDisciplinas([...disciplinas, novaDisciplinaObj])
    setNovaDisciplina("")
  }

  const adicionarMateria = (disciplinaId: string) => {
    const nomeMateria = novasMaterias[disciplinaId]
    if (!nomeMateria || nomeMateria.trim() === "") return

    setDisciplinas(
      disciplinas.map((disc) => {
        if (disc.id === disciplinaId) {
          return {
            ...disc,
            materias: [
              ...disc.materias,
              {
                id: `${disc.id}-${Date.now()}`,
                nome: nomeMateria,
                concluida: false,
                paraRevisao: false,
                anotacoes: "",
              },
            ],
          }
        }
        return disc
      }),
    )

    setNovasMaterias({
      ...novasMaterias,
      [disciplinaId]: "",
    })
  }

  const toggleMateriaConcluida = (disciplinaId: string, materiaId: string) => {
    setDisciplinas(
      disciplinas.map((disc) => {
        if (disc.id === disciplinaId) {
          return {
            ...disc,
            materias: disc.materias.map((mat) => {
              if (mat.id === materiaId) {
                return {
                  ...mat,
                  concluida: !mat.concluida,
                }
              }
              return mat
            }),
          }
        }
        return disc
      }),
    )
  }

  const toggleMateriaRevisao = (disciplinaId: string, materiaId: string) => {
    setDisciplinas(
      disciplinas.map((disc) => {
        if (disc.id === disciplinaId) {
          return {
            ...disc,
            materias: disc.materias.map((mat) => {
              if (mat.id === materiaId) {
                return {
                  ...mat,
                  paraRevisao: !mat.paraRevisao,
                }
              }
              return mat
            }),
          }
        }
        return disc
      }),
    )
  }

  const atualizarAnotacoes = (disciplinaId: string, materiaId: string, anotacoes: string) => {
    setDisciplinas(
      disciplinas.map((disc) => {
        if (disc.id === disciplinaId) {
          return {
            ...disc,
            materias: disc.materias.map((mat) => {
              if (mat.id === materiaId) {
                return {
                  ...mat,
                  anotacoes,
                }
              }
              return mat
            }),
          }
        }
        return disc
      }),
    )
  }

  const calcularProgresso = (disciplina: Disciplina) => {
    if (disciplina.materias.length === 0) return 0
    const concluidas = disciplina.materias.filter((mat) => mat.concluida).length
    return Math.round((concluidas / disciplina.materias.length) * 100)
  }

  return (
    <Card className="bg-[#C39D88] border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-[#56443F]">Minhas Disciplinas e Matérias</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="nova-disciplina" className="text-lg font-semibold mb-2 text-[#56443F]">
              Nova Disciplina:
            </Label>
            <Input
              id="nova-disciplina"
              value={novaDisciplina}
              onChange={(e) => setNovaDisciplina(e.target.value)}
              className="w-full p-3 rounded-md border border-[#A28776] bg-[#F1F0E2] text-[#56443F] focus:outline-none focus:ring-2 focus:ring-[#8B645A]"
              placeholder="Ex: Direito Constitucional"
            />
          </div>
          <Button
            onClick={adicionarDisciplina}
            className="mt-auto bg-[#A47864] text-[#F1F0E2] px-6 py-3 rounded-md font-semibold hover:bg-[#8B645A] transition-colors h-12"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Adicionar Disciplina
          </Button>
        </div>

        <div className="space-y-6 mt-6">
          <h3 className="text-2xl font-bold text-[#56443F]">Lista de Disciplinas</h3>

          {disciplinas.length === 0 ? (
            <div className="bg-[#F1F0E2] p-6 rounded-md text-center text-[#56443F]">
              <BookOpen className="mx-auto h-12 w-12 text-[#A47864] mb-2 opacity-50" />
              <p className="text-lg">Nenhuma disciplina adicionada ainda.</p>
              <p className="text-sm text-[#8B645A]">Adicione sua primeira disciplina acima.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {disciplinas.map((disciplina) => (
                <div key={disciplina.id} className="bg-[#F1F0E2] p-4 rounded-md shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div className="flex items-center">
                      <span className="text-xl font-semibold text-[#56443F]">{disciplina.nome}</span>
                      <Badge variant="outline" className="ml-2 bg-[#A47864]/10 text-[#A47864] border-[#A47864]/20">
                        {disciplina.materias.length} matérias
                      </Badge>
                    </div>

                    <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 w-full sm:w-auto">
                      <div className="flex-1 sm:w-64">
                        <Input
                          value={novasMaterias[disciplina.id] || ""}
                          onChange={(e) =>
                            setNovasMaterias({
                              ...novasMaterias,
                              [disciplina.id]: e.target.value,
                            })
                          }
                          className="p-2 rounded-md border border-[#BBAA91] bg-[#F1F0E2] text-[#56443F] focus:outline-none focus:ring-2 focus:ring-[#A47864]"
                          placeholder="Nova matéria"
                        />
                      </div>
                      <Button
                        onClick={() => adicionarMateria(disciplina.id)}
                        className="bg-[#A47864] text-[#F1F0E2] px-4 py-2 rounded-md font-semibold hover:bg-[#8B645A] transition-colors"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar Matéria
                      </Button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-[#56443F]">Progresso</span>
                      <span className="text-sm font-medium text-[#56443F]">{calcularProgresso(disciplina)}%</span>
                    </div>
                    <Progress
                      value={calcularProgresso(disciplina)}
                      className="h-2 bg-[#BBAA91]"
                      indicatorClassName="bg-[#A47864]"
                    />
                  </div>

                  {disciplina.materias.length > 0 ? (
                    <ul className="space-y-3 mt-4">
                      {disciplina.materias.map((materia) => (
                        <li
                          key={materia.id}
                          className="p-3 rounded-md border border-[#BBAA91]/50 hover:bg-[#BBAA91]/10 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            <div className="flex items-center">
                              <Checkbox
                                id={`materia-${materia.id}`}
                                checked={materia.concluida}
                                onCheckedChange={() => toggleMateriaConcluida(disciplina.id, materia.id)}
                                className="mr-2 h-5 w-5 text-[#A47864] border-[#A28776] rounded focus:ring-[#A47864]"
                              />
                              <Label
                                htmlFor={`materia-${materia.id}`}
                                className={`font-medium ${
                                  materia.concluida ? "line-through text-[#56443F]/70" : "text-[#56443F]"
                                }`}
                              >
                                {materia.nome}
                              </Label>
                            </div>

                            <div className="flex items-center ml-0 sm:ml-auto">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleMateriaRevisao(disciplina.id, materia.id)}
                                className={`text-xs ${
                                  materia.paraRevisao
                                    ? "bg-[#A47864]/20 text-[#A47864] hover:bg-[#A47864]/30"
                                    : "text-[#8B645A] hover:bg-[#A47864]/10 hover:text-[#A47864]"
                                }`}
                              >
                                <RotateCcw className="mr-1 h-3 w-3" />
                                {materia.paraRevisao ? "Marcado para Revisão" : "Marcar para Revisão"}
                              </Button>
                            </div>
                          </div>

                          <div className="mt-2">
                            <Textarea
                              value={materia.anotacoes}
                              onChange={(e) => atualizarAnotacoes(disciplina.id, materia.id, e.target.value)}
                              placeholder="Onde parei? Ex: Estudei até licitações - Lei 8.666, art. 20."
                              className="min-h-[60px] p-2 rounded-md border border-[#BBAA91] bg-[#F1F0E2] text-[#56443F] focus:outline-none focus:ring-2 focus:ring-[#A47864] w-full"
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center p-4 text-[#56443F]/70">
                      <p>Nenhuma matéria adicionada ainda.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
