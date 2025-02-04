import { CompartmentId } from '../App'
import Box, { Compartment } from './Box'

type Props = {
    selected: CompartmentId
}

export default function DefaultBox(props: Props) {
    const compartmens: Compartment[][] = [
        [
            { size: 1 },
            { size: 1 },
            { size: 1 },
            { size: 1 },
            { size: 1 },
            { size: 1 },
        ],
        [{ size: 2 }, { size: 2 }, { size: 2 }],
        [
            { size: 1 },
            { size: 1 },
            { size: 1 },
            { size: 1 },
            { size: 1 },
            { size: 1 },
        ],
        [
            { size: 1 },
            { size: 1 },
            { size: 1 },
            { size: 1 },
            { size: 1 },
            { size: 1 },
        ],
    ]

    const { selected } = props
    const { column, row } = selected

    if (column >= 0 && column < compartmens.length) {
        const columnCompartments = compartmens[column]
        if (row >= 0 && row < columnCompartments.length) {
            columnCompartments[row].selected = true
        }
    }

    return <Box columns={compartmens} />
}
