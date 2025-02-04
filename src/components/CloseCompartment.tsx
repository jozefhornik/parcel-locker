import { CompartmentId } from '../App'
import DefaultBox from './DefaultBox'

type Props = {
    openCompartment: CompartmentId
}

export default function CloseCompartment(props: Props) {
    const { openCompartment } = props

    return (
        <div>
            <div
                style={{
                    fontSize: '48px',
                    margin: '30px 0 0 0',
                    textAlign: 'center',
                }}
            >
                Prosíme, zatvorte otvorenú vyznačenú schránku
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '30px 0 0 0',
                }}
            >
                <DefaultBox selected={openCompartment} />
            </div>
        </div>
    )
}
