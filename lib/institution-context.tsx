"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface Entity {
  id: string
  name: string
  type: string
}

export interface Institution {
  id: string
  name: string
  code: string
  location: string
  admin: string
  type: "University" | "College" | "School" | "Institute" | "Organization"
  createdAt: string
  devices: number
}

interface InstitutionContextValue {
  institutionName: string
  setInstitutionName: (name: string) => void
  currentInstitutionId: string
  setCurrentInstitutionId: (id: string) => void
  institutions: Institution[]
  addInstitution: (institution: Omit<Institution, "id" | "createdAt">) => void
  removeInstitution: (id: string) => void
  updateInstitution: (id: string, updates: Partial<Institution>) => void
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

const defaultInstitutions: Institution[] = [
  {
    id: "inst-1",
    name: "National Institute of Technology",
    code: "NIT",
    location: "Nagpur, India",
    admin: "Dr. Ajay Singh",
    type: "Institute",
    createdAt: "2025-01-15",
    devices: 12,
  },
]

export function InstitutionProvider({ children }: { children: ReactNode }) {
  const [institutionName, setInstitutionName] = useState("National Institute of Technology")
  const [currentInstitutionId, setCurrentInstitutionId] = useState("inst-1")
  const [institutions, setInstitutions] = useState<Institution[]>(defaultInstitutions)
  const [entities, setEntities] = useState<Entity[]>(defaultEntities)

  const addInstitution = useCallback((institution: Omit<Institution, "id" | "createdAt">) => {
    const newInstitution: Institution = {
      ...institution,
      id: `inst-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setInstitutions((prev) => [...prev, newInstitution])
    setCurrentInstitutionId(newInstitution.id)
    setInstitutionName(newInstitution.name)
  }, [])

  const removeInstitution = useCallback((id: string) => {
    setInstitutions((prev) => {
      const filtered = prev.filter((inst) => inst.id !== id)
      if (currentInstitutionId === id && filtered.length > 0) {
        setCurrentInstitutionId(filtered[0].id)
        setInstitutionName(filtered[0].name)
      }
      return filtered
    })
  }, [currentInstitutionId])

  const updateInstitution = useCallback((id: string, updates: Partial<Institution>) => {
    setInstitutions((prev) =>
      prev.map((inst) => (inst.id === id ? { ...inst, ...updates } : inst))
    )
    if (id === currentInstitutionId && updates.name) {
      setInstitutionName(updates.name)
    }
  }, [currentInstitutionId])

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
      value={{
        institutionName,
        setInstitutionName,
        currentInstitutionId,
        setCurrentInstitutionId,
        institutions,
        addInstitution,
        removeInstitution,
        updateInstitution,
        entities,
        addEntity,
        removeEntity,
        updateEntity,
      }}
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
