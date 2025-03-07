import { useNavigate } from 'react-router'
import { useCallback } from 'react'
import { CompartmentId } from '../App'
import ShipmentInsert from '../components/ShipmentInsert'

type Props = {
    handleOpen: (id: CompartmentId) => void
    openCompartment: CompartmentId | null
}

const availableCompartments: CompartmentId[][] = [
    [
        { column: 2, row: 3 },
        { column: 0, row: 1 },
    ],
    [{ column: 1, row: 2 }],
]

export default function InsertFound(props: Props) {
    const n = useNavigate()

    const handleNoFreeCompartment = useCallback(() => {
        n('/no-free-compartment')
    }, [n])

    const handleAccept = useCallback(() => {
        n('/send-ok')
    }, [n])

    return (
        <ShipmentInsert
            {...props}
            availableCompartments={availableCompartments}
            maxReopenedTimes={2}
            handleNoFreeCompartment={handleNoFreeCompartment}
            handleAccept={handleAccept}
        />
    )
}
