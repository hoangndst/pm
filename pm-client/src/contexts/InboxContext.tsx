import { createCtx } from "./CreateCtx"
import React from "react"

interface InBoxContextType {
  isDetailOpen: boolean,
  setIsDetailOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const [useInBox, InBoxProvider] = createCtx<InBoxContextType>()

export default function InBoxContext({ children }: { children: React.ReactNode }) {
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)

  return (
    <InBoxProvider value={{ isDetailOpen, setIsDetailOpen }}>
      {children}
    </InBoxProvider>
  )
}