"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, FileText, LinkIcon, PlusCircle, Trash2, Video, Youtube } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TipoRecurso = "pdf" | "video" | "artigo" | "outro"

type Recurso = {
  id: string
  titulo: string
  link: string
  tipo: TipoRecurso
  disciplina: string
  materia: string
}

export function BibliotecaRecursos() {
  const [recursos, setRecursos] = useState<Recurso[]>([
    {
      id: "1",
      titulo: "Princípios da Administração Pública - PDF",
      link: "https://exemplo.com/principios-adm.pdf",
      tipo: "pdf",
      disciplina: "Direito Administrativo",
      materia: "Princípios da Administração Pública",
    },
    {
      id: "2",
      titulo: "Videoaula sobre Atos Administrativos",
      link: "https://youtube.com/watch?v=exemplo",
      tipo: "video",
      disciplina: "Direito Administrativo",
      materia: "Atos Administrativos",
    },
    {
      id: "3",
      titulo: "Artigo sobre Princípios Fundamentais",
      link: "https://exemplo.com/artigo-principios",
      tipo: "artigo",
      disciplina: "Direito Constitucional",
      materia: "Princípios Fundamentais",
    },
  ])

  const [novoRecurso, setNovoRecurso] = useState<Omit<Recurso, "id">>({
    titulo: "",
    link: "",
    tipo: "pdf",
    disciplina: "",
    materia: "",
  })

  const adicionarRecurso = () => {
    if (
      novoRecurso.titulo.trim() === "" ||
      novoRecurso.link.trim() === "" ||
      novoRecurso.disciplina.trim() === "" ||
      novoRecurso.materia.trim() === ""
    ) {
      return
    }

    const recursoNovo: Recurso = {
      ...novoRecurso,
      id: Date.now().toString(),
    }

    setRecursos([...recursos, recursoNovo])

    setNovoRecurso({
      titulo: "",
      link: "",
      tipo: "pdf",
      disciplina: "",
      materia: "",
    })
  }

  const removerRecurso = (id: string) => {
    setRecursos(recursos.filter((recurso) => recurso.id !== id))
  }

  const getIconeRecurso = (tipo: TipoRecurso) => {
    switch (tipo) {
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "artigo":
        return <BookOpen className="h-4 w-4" />
      default:
        return <LinkIcon className="h-4 w-4" />
    }
  }

  const filtrarRecursosPorTipo = (tipo: TipoRecurso) => {
    return recursos.filter((recurso) => recurso.tipo === tipo)
  }

  const filtrarRecursosPorDisciplina = (disciplina: string) => {
    return recursos.filter((recurso) => recurso.disciplina === disciplina)
  }

  const disciplinasUnicas = [...new Set(recursos.map((recurso) => recurso.disciplina))]

  return (
    <Card className="bg-[#BBAA91] border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-[#56443F]">Biblioteca de Recursos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Card className="bg-[#F1F0E2] border-none">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-[#56443F]">Adicionar Novo Recurso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="titulo" className="text-[#56443F]">
                  Título
                </Label>
                <Input
                  id="titulo"
                  value={novoRecurso.titulo}
                  onChange={(e) => setNovoRecurso({ ...novoRecurso, titulo: e.target.value })}
                  className="border-[#BBAA91] bg-[#F1F0E2] text-[#56443F] focus:ring-[#A47864]"
                  placeholder="Ex: Videoaula sobre Princípios Administrativos"
                />
              </div>
              <div>
                <Label htmlFor="link" className="text-[#56443F]">
                  Link
                </Label>
                <Input
                  id="link"
                  value={novoRecurso.link}
                  onChange={(e) => setNovoRecurso({ ...novoRecurso, link: e.target.value })}
                  className="border-[#BBAA91] bg-[#F1F0E2] text-[#56443F] focus:ring-[#A47864]"
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="tipo" className="text-[#56443F]">
                  Tipo
                </Label>
                <Select
                  value={novoRecurso.tipo}
                  onValueChange={(valor) => setNovoRecurso({ ...novoRecurso, tipo: valor as TipoRecurso })}
                >
                  <SelectTrigger className="border-[#BBAA91] bg-[#F1F0E2] text-[#56443F]">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#F1F0E2] border-[#BBAA91]">
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Vídeo</SelectItem>
                    <SelectItem value="artigo">Artigo</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="disciplina" className="text-[#56443F]">
                  Disciplina
                </Label>
                <Input
                  id="disciplina"
                  value={novoRecurso.disciplina}
                  onChange={(e) => setNovoRecurso({ ...novoRecurso, disciplina: e.target.value })}
                  className="border-[#BBAA91] bg-[#F1F0E2] text-[#56443F] focus:ring-[#A47864]"
                  placeholder="Ex: Direito Administrativo"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="materia" className="text-[#56443F]">
                  Matéria
                </Label>
                <Input
                  id="materia"
                  value={novoRecurso.materia}
                  onChange={(e) => setNovoRecurso({ ...novoRecurso, materia: e.target.value })}
                  className="border-[#BBAA91] bg-[#F1F0E2] text-[#56443F] focus:ring-[#A47864]"
                  placeholder="Ex: Princípios da Administração Pública"
                />
              </div>
            </div>
            <Button onClick={adicionarRecurso} className="w-full mt-4 bg-[#A47864] text-[#F1F0E2] hover:bg-[#8B645A]">
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Recurso
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="grid grid-cols-4 bg-[#F1F0E2]">
            <TabsTrigger value="todos" className="data-[state=active]:bg-[#A47864] data-[state=active]:text-[#F1F0E2]">
              Todos
            </TabsTrigger>
            <TabsTrigger value="pdfs" className="data-[state=active]:bg-[#A47864] data-[state=active]:text-[#F1F0E2]">
              PDFs
            </TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-[#A47864] data-[state=active]:text-[#F1F0E2]">
              Vídeos
            </TabsTrigger>
            <TabsTrigger
              value="artigos"
              className="data-[state=active]:bg-[#A47864] data-[state=active]:text-[#F1F0E2]"
            >
              Artigos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="mt-4">
            <Card className="bg-[#F1F0E2] border-none">
              <CardContent className="p-4">
                {recursos.length > 0 ? (
                  <div className="space-y-3">
                    {recursos.map((recurso) => (
                      <div
                        key={recurso.id}
                        className="flex items-start justify-between p-3 border border-[#BBAA91]/50 rounded-md"
                      >
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Badge
                              variant="outline"
                              className="mr-2 bg-[#A47864]/10 text-[#A47864] border-[#A47864]/20"
                            >
                              {getIconeRecurso(recurso.tipo)}
                              <span className="ml-1">{recurso.tipo.toUpperCase()}</span>
                            </Badge>
                            <a
                              href={recurso.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-[#56443F] hover:text-[#A47864] transition-colors"
                            >
                              {recurso.titulo}
                            </a>
                          </div>
                          <div className="text-sm text-[#56443F]/70 mt-1">
                            {recurso.disciplina} - {recurso.materia}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removerRecurso(recurso.id)}
                          className="text-[#56443F]/70 hover:text-[#A47864] hover:bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-[#56443F]/70">
                    <BookOpen className="mx-auto h-12 w-12 text-[#A47864] mb-2 opacity-50" />
                    <p>Nenhum recurso adicionado ainda.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pdfs" className="mt-4">
            <Card className="bg-[#F1F0E2] border-none">
              <CardContent className="p-4">
                {filtrarRecursosPorTipo("pdf").length > 0 ? (
                  <div className="space-y-3">
                    {filtrarRecursosPorTipo("pdf").map((recurso) => (
                      <div
                        key={recurso.id}
                        className="flex items-start justify-between p-3 border border-[#BBAA91]/50 rounded-md"
                      >
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Badge
                              variant="outline"
                              className="mr-2 bg-[#A47864]/10 text-[#A47864] border-[#A47864]/20"
                            >
                              <FileText className="h-4 w-4" />
                              <span className="ml-1">PDF</span>
                            </Badge>
                            <a
                              href={recurso.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-[#56443F] hover:text-[#A47864] transition-colors"
                            >
                              {recurso.titulo}
                            </a>
                          </div>
                          <div className="text-sm text-[#56443F]/70 mt-1">
                            {recurso.disciplina} - {recurso.materia}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removerRecurso(recurso.id)}
                          className="text-[#56443F]/70 hover:text-[#A47864] hover:bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-[#56443F]/70">
                    <FileText className="mx-auto h-12 w-12 text-[#A47864] mb-2 opacity-50" />
                    <p>Nenhum PDF adicionado ainda.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="mt-4">
            <Card className="bg-[#F1F0E2] border-none">
              <CardContent className="p-4">
                {filtrarRecursosPorTipo("video").length > 0 ? (
                  <div className="space-y-3">
                    {filtrarRecursosPorTipo("video").map((recurso) => (
                      <div
                        key={recurso.id}
                        className="flex items-start justify-between p-3 border border-[#BBAA91]/50 rounded-md"
                      >
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Badge
                              variant="outline"
                              className="mr-2 bg-[#A47864]/10 text-[#A47864] border-[#A47864]/20"
                            >
                              <Youtube className="h-4 w-4" />
                              <span className="ml-1">Vídeo</span>
                            </Badge>
                            <a
                              href={recurso.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-[#56443F] hover:text-[#A47864] transition-colors"
                            >
                              {recurso.titulo}
                            </a>
                          </div>
                          <div className="text-sm text-[#56443F]/70 mt-1">
                            {recurso.disciplina} - {recurso.materia}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removerRecurso(recurso.id)}
                          className="text-[#56443F]/70 hover:text-[#A47864] hover:bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-[#56443F]/70">
                    <Video className="mx-auto h-12 w-12 text-[#A47864] mb-2 opacity-50" />
                    <p>Nenhum vídeo adicionado ainda.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="artigos" className="mt-4">
            <Card className="bg-[#F1F0E2] border-none">
              <CardContent className="p-4">
                {filtrarRecursosPorTipo("artigo").length > 0 ? (
                  <div className="space-y-3">
                    {filtrarRecursosPorTipo("artigo").map((recurso) => (
                      <div
                        key={recurso.id}
                        className="flex items-start justify-between p-3 border border-[#BBAA91]/50 rounded-md"
                      >
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Badge
                              variant="outline"
                              className="mr-2 bg-[#A47864]/10 text-[#A47864] border-[#A47864]/20"
                            >
                              <BookOpen className="h-4 w-4" />
                              <span className="ml-1">Artigo</span>
                            </Badge>
                            <a
                              href={recurso.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-[#56443F] hover:text-[#A47864] transition-colors"
                            >
                              {recurso.titulo}
                            </a>
                          </div>
                          <div className="text-sm text-[#56443F]/70 mt-1">
                            {recurso.disciplina} - {recurso.materia}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removerRecurso(recurso.id)}
                          className="text-[#56443F]/70 hover:text-[#A47864] hover:bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-[#56443F]/70">
                    <BookOpen className="mx-auto h-12 w-12 text-[#A47864] mb-2 opacity-50" />
                    <p>Nenhum artigo adicionado ainda.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
