import { createContext } from 'react'
import { CompartmentId } from './App'

type UndeliveredShipment = {
    number: string
    compartment: CompartmentId
}

export type CourierContextType = {
    undelivered: UndeliveredShipment[]
    delivering?: UndeliveredShipment
}

export const CourierContext = createContext<{
    value: CourierContextType
    setValue: (value: CourierContextType) => void
}>({
    value: { undelivered: [] },
    setValue: () => {},
})
