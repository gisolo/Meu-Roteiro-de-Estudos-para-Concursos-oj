"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Clock, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function ConcursoInfo() {
  const [concursoNome, setConcursoNome] = useState("")
  const [dataProva, setDataProva] = useState<Date | undefined>(undefined)
  const [diasRestantes, setDiasRestantes] = useState<number | null>(null)

  const calcularDiasRestantes = (data: Date) => {
    const hoje = new Date()
    const diferenca = Math.ceil((data.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))
    return diferenca > 0 ? diferenca : 0
  }

  const handleDataChange = (data: Date | undefined) => {
    setDataProva(data)
    if (data) {
      setDiasRestantes(calcularDiasRestantes(data))
    } else {
      setDiasRestantes(null)
    }
  }

  return (
    <Card className="bg-[#E4C7B7] border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-[#56443F]">Informações do Concurso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="concurso-nome" className="text-lg font-semibold mb-2 text-[#56443F]">
            Nome do Concurso:
          </Label>
          <Input
            id="concurso-nome"
            value={concursoNome}
            onChange={(e) => setConcursoNome(e.target.value)}
            className="w-full p-3 rounded-md border border-[#BBAA91] bg-[#F1F0E2] text-[#56443F] focus:outline-none focus:ring-2 focus:ring-[#A47864]"
            placeholder="Ex: Analista Judiciário"
          />
        </div>

        <div>
          <Label htmlFor="data-prova" className="text-lg font-semibold mb-2 text-[#56443F]">
            Data da Prova:
          </Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal border border-[#BBAA91] bg-[#F1F0E2] text-[#56443F] hover:bg-[#F1F0E2]/80 hover:text-[#56443F]"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataProva ? format(dataProva, "PPP", { locale: ptBR }) : <span>Selecione a data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#F1F0E2]" align="start">
                <Calendar mode="single" selected={dataProva} onSelect={handleDataChange} initialFocus locale={ptBR} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {diasRestantes !== null && (
          <div className="mt-4 flex items-center justify-between p-3 bg-[#A47864]/10 rounded-md">
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-[#A47864]" />
              <span className="font-medium">Dias restantes:</span>
            </div>
            <span className="text-xl font-bold text-[#A47864]">{diasRestantes}</span>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between p-3 bg-[#A47864]/10 rounded-md">
          <div className="flex items-center">
            <Target className="mr-2 h-5 w-5 text-[#A47864]" />
            <span className="font-medium">Meta diária recomendada:</span>
          </div>
          <span className="text-lg font-bold text-[#A47864]">
            {diasRestantes && diasRestantes > 0 ? `${Math.ceil(100 / diasRestantes)}%` : "Defina a data"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
