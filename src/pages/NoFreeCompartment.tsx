import { useNavigate } from 'react-router'
import KeyShortcuts from '../components/KeyShortcuts'
import { useCallback, useState } from 'react'
import Timer from '../components/Timer'

export default function NoFreeCompartment() {
    const n = useNavigate()
    const [expire] = useState<Date>(new Date(Date.now() + 60 * 1000))

    const handleExit = useCallback(() => {
        n('/')
    }, [n])

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', margin: '20px 0 0 0' }}>
                    Nie je voľný žiadny vhodný box
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
