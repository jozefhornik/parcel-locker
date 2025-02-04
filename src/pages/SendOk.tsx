import { useNavigate } from 'react-router'
import KeyShortcuts from '../components/KeyShortcuts'
import { useCallback, useEffect, useState } from 'react'
import Timer from '../components/Timer'
import { CompartmentId } from '../App'
import CloseCompartment from '../components/CloseCompartment'

type Props = {
    openCompartment: CompartmentId | null
}

export default function SendOk(props: Props) {
    const n = useNavigate()
    const [expire, setExpire] = useState<Date | null>(null)

    const handleExit = useCallback(() => {
        n('/')
    }, [n])

    const { openCompartment } = props

    useEffect(() => {
        if (!openCompartment) {
            setExpire(new Date(Date.now() + 10 * 1000))
        }
    }, [openCompartment])

    return (
        <>
            {openCompartment ? (
                <CloseCompartment openCompartment={openCompartment} />
            ) : (
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <div style={{ fontSize: '48px' }}>
                            Podaj zásielky
                        </div>
                        <div style={{ fontSize: '36px', margin: '2px 0 0 0' }}>
                            Ďakujeme za podanie zásielky
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
                    {expire ? (
                        <Timer expire={expire} callback={handleExit} />
                    ) : null}
                </div>
            )}
        </>
    )
}
