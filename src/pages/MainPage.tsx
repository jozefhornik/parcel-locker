import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Timer from '../components/Timer'
import KeyShortcuts from '../components/KeyShortcuts'
import { CompartmentId } from '../App'
import CloseCompartment from '../components/CloseCompartment'
import { useTimer } from 'react-timer-hook'
import Loading from '../components/Loading'

type Props = {
    openCompartment: CompartmentId | null
}

export default function MainPage(props: Props) {
    const [number, setNumber] = useState('')
    const [expire, setExpire] = useState<Date | null>(null)
    const { openCompartment } = props
    const [loadUrl, setLoadUrl] = useState<string | null>(null)

    const { restart } = useTimer({
        expiryTimestamp: new Date(),
        autoStart: false,
        onExpire: () => {
            if (loadUrl) {
                n(loadUrl)
            }
        },
    })

    useEffect(() => {
        if (loadUrl) {
            restart(new Date(Date.now() + 1000))
        }
    }, [loadUrl, restart])

    const n = useNavigate()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === '#') {
                if (number === '123456') {
                    setLoadUrl('/delivery-ok/' + number)
                } else {
                    setLoadUrl('/delivery-failed/' + number)
                }
            } else if (event.key === 'Escape') {
                setNumber('')
            } else if (event.key === 'Backspace') {
                if (number.length > 0) {
                    setNumber(number.slice(0, -1))
                }
            } else if (event.key >= '0' && event.key <= '9') {
                setNumber(number + event.key)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [number, n])

    useEffect(() => {
        if (number == '') {
            if (expire != null) {
                setExpire(null)
            }
        } else {
            if (expire == null) {
                setExpire(new Date(Date.now() + 120 * 1000))
            }
        }
    }, [expire, number])

    return (
        <>
            {loadUrl ? (
                <Loading />
            ) : (
                <>
                    {openCompartment ? (
                        <CloseCompartment openCompartment={openCompartment} />
                    ) : (
                        <>
                            <div style={{ textAlign: 'center' }}>
                                <div
                                    style={{
                                        fontSize: '48px',
                                        margin: '30px 0 0 0',
                                    }}
                                >
                                    Výdaj zásielok
                                </div>
                                <div
                                    style={{
                                        fontSize: '36px',
                                        margin: '30px 0 0 0',
                                    }}
                                >
                                    Zadajte kód pre vydanie zásielky a stlačte #
                                </div>
                                <div
                                    style={{
                                        fontSize: '36px',
                                        margin: '30px auto 0 auto',
                                        border: '5px solid #ccc',
                                        padding: '10px',
                                        width: '200px',
                                        lineHeight: '40px',
                                        height: '40px',
                                        textAlign: 'left',
                                    }}
                                >
                                    {number}
                                </div>
                            </div>
                            <div style={{ margin: '20px 0 0 0' }}>
                                <KeyShortcuts
                                    shortcuts={[
                                        {
                                            keyCode: 'A',
                                            description: 'Vyčistiť kód',
                                            action: () => setNumber(''),
                                        },
                                        {
                                            keyCode: 'B',
                                            description: 'Odoslať zásielku',
                                            action: () => n('/send'),
                                        },
                                        {
                                            keyCode: 'C',
                                            description: 'Obsluha',
                                            action: () => setNumber(''),
                                        },
                                    ]}
                                />
                            </div>
                            {expire != null ? (
                                <Timer
                                    expire={expire}
                                    callback={() => setNumber('')}
                                    shouldBeVisible={() =>
                                        expire.getTime() -
                                            new Date().getTime() <=
                                        60000
                                    }
                                />
                            ) : null}
                        </>
                    )}
                </>
            )}
        </>
    )
}
