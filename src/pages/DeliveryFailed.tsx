import { useNavigate, useParams } from 'react-router'
import KeyShortcuts from '../components/KeyShortcuts'
import { useCallback, useState } from 'react'
import Timer from '../components/Timer'

export default function DeliveryFailed() {
    const n = useNavigate()
    const [expire] = useState<Date>(new Date(Date.now() + 20 * 1000))

    const { number } = useParams()

    const handleExit = useCallback(() => {
        n('/')
    }, [n])

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', margin: '30px 0 0 0' }}>
                    Výdaj zásielky
                </div>
                <div style={{ fontSize: '36px', margin: '2px 0 0 0' }}>
                    Kód zásielky nebol zadaný nesprávne
                </div>
                <div
                    style={{
                        fontSize: '36px',
                        margin: '10px 0 0 0',
                        color: 'red',
                    }}
                >
                    {number}
                </div>
                <div
                    style={{
                        margin: '30px 0 0 0',
                    }}
                >
                    <KeyShortcuts
                        shortcuts={[
                            {
                                keyCode: 'A',
                                description: 'Ukončiť',
                                action: handleExit,
                            },
                        ]}
                    />
                </div>
            </div>
            <Timer expire={expire} callback={handleExit} />
        </>
    )
}
