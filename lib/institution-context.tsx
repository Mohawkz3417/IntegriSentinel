"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface Entity {
  id: string
  name: string
  type: string
}

interface InstitutionContextValue {
  institutionName: string
  setInstitutionName: (name: string) => void
  entities: Entity[]
  addEntity: (name: string, type: string) => void
  removeEntity: (id: string) => void
  updateEntity: (id: string, name: string, type: string) => void
}

const InstitutionContext = createContext<InstitutionContextValue | null>(null)

const defaultEntities: Entity[] = [
  { id: "ent-1", name: "CSE Lab", type: "Lab" },
  { id: "ent-2", name: "Admin Office", type: "Office" },
  { id: "ent-3", name: "Library", type: "Facility" },
  { id: "ent-4", name: "Exam Cell", type: "Office" },
  { id: "ent-5", name: "HR Office", type: "Office" },
  { id: "ent-6", name: "Finance", type: "Office" },
  { id: "ent-7", name: "ECE Lab", type: "Lab" },
  { id: "ent-8", name: "Mech Lab", type: "Lab" },
  { id: "ent-9", name: "Server Room", type: "Infrastructure" },
]

export function InstitutionProvider({ children }: { children: ReactNode }) {
  const [institutionName, setInstitutionName] = useState("National Institute of Technology")
  const [entities, setEntities] = useState<Entity[]>(defaultEntities)

  const addEntity = useCallback((name: string, type: string) => {
    setEntities((prev) => [
      ...prev,
      { id: `ent-${Date.now()}`, name, type },
    ])
  }, [])

  const removeEntity = useCallback((id: string) => {
    setEntities((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const updateEntity = useCallback((id: string, name: string, type: string) => {
    setEntities((prev) =>
      prev.map((e) => (e.id === id ? { ...e, name, type } : e))
    )
  }, [])

  return (
    <InstitutionContext.Provider
      value={{ institutionName, setInstitutionName, entities, addEntity, removeEntity, updateEntity }}
    >
      {children}
    </InstitutionContext.Provider>
  )
}

export function useInstitution() {
  const ctx = useContext(InstitutionContext)
  if (!ctx) throw new Error("useInstitution must be used within InstitutionProvider")
  return ctx
}
