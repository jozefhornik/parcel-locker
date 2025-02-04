import { useCallback, useEffect, useState } from 'react'
import DefaultBox from '../components/DefaultBox'
import KeyShortcuts from '../components/KeyShortcuts'
import Timer from '../components/Timer'
import { useNavigate } from 'react-router'
import { CompartmentId } from '../App'

type Props = {
    handleOpen: (id: CompartmentId) => void
    openCompartment: CompartmentId | null
}

const maxReopenedTimes = 2

const deliveryCompartment: CompartmentId = { column: 2, row: 4 }

export default function DeliveryFound(props: Props) {
    const [wasOpened, setWasOpened] = useState(false)
    const [reopenedTimes, setReopenedTimes] = useState(0)
    const { handleOpen: handleOpenExternal, openCompartment } = props
    const [expire, setExpire] = useState<Date | null>(null)
    const [showMenu, setShowMenu] = useState(false)

    const n = useNavigate()

    const handleOpen = useCallback(() => {
        handleOpenExternal(deliveryCompartment)
    }, [handleOpenExternal])

    useEffect(() => {
        if (!wasOpened) {
            handleOpen()
            setWasOpened(true)
        }
    }, [handleOpen, wasOpened])

    const handleExit = useCallback(() => {
        n('/')
    }, [n])

    const handleAccept = useCallback(() => {
        n('/delivery-ok')
    }, [n])

    const resetTimer = useCallback(() => {
        setExpire(new Date(Date.now() + (openCompartment ? 120 : 60) * 1000))
    }, [openCompartment])

    useEffect(() => {
        resetTimer()
    }, [resetTimer])

    const handleReopen = useCallback(() => {
        if (reopenedTimes < maxReopenedTimes) {
            setReopenedTimes(reopenedTimes + 1)
            handleOpen()
        }
    }, [reopenedTimes, handleOpen])

    const handleError = useCallback(
        (contact: boolean) => {
            n('/report-problem/' + (contact ? 'contact' : 'no-contact'))
        },
        [n]
    )

    return (
        <>
            {!showMenu ? (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', margin: '1px 0 0 0' }}>
                        Výdaj zásielky
                    </div>
                    <div style={{ fontSize: '36px', margin: '0 0 0 0' }}>
                        Vyberte si zásielku a zatvorte, prosím, schránku
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '10px 0 0 0',
                        }}
                    >
                        <DefaultBox selected={deliveryCompartment} />
                    </div>

                    {openCompartment ? (
                        <div style={{ marginTop: '20px' }}>
                            <KeyShortcuts
                                shortcuts={[
                                    {
                                        keyCode: 'A',
                                        description:
                                            'Potvrdiť vyzdvihnutie zásielky',
                                        action: handleAccept,
                                    },
                                    {
                                        keyCode: 'B',
                                        description: 'Nahlásiť problém',
                                        action: () => setShowMenu(true),
                                    },
                                    {
                                        keyCode: 'C',
                                        description:
                                            'Otvoriť schránku, ak sa neotvorila',
                                        action: handleOpen,
                                    },
                                ]}
                            />
                        </div>
                    ) : (
                        <div style={{ marginTop: '20px' }}>
                            <KeyShortcuts
                                shortcuts={[
                                    {
                                        keyCode: 'A',
                                        description:
                                            'Potvrdiť vyzdvihnutie zásielky',
                                        action: handleAccept,
                                    },
                                    {
                                        keyCode: 'B',
                                        description: 'Nahlásiť problém',
                                        action: () => setShowMenu(true),
                                    },
                                    ...(reopenedTimes < maxReopenedTimes
                                        ? [
                                              {
                                                  keyCode: 'C',
                                                  description:
                                                      'Otvoriť opätovne schránku',
                                                  action: handleReopen,
                                              },
                                          ]
                                        : []),
                                ]}
                            />
                        </div>
                    )}
                    {expire ? (
                        <Timer expire={expire} callback={handleExit} />
                    ) : null}
                </div>
            ) : (
                <>
                    <div style={{ textAlign: 'center' }}>
                        <div
                            style={{
                                fontSize: '36px',
                                margin: '20px 0 0 0',
                            }}
                        >
                            Nahláste problém so schránkou
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <KeyShortcuts
                                shortcuts={[
                                    {
                                        keyCode: 'A',
                                        description:
                                            'Schránku nie je možné otvoriť',
                                        action: () => {
                                            handleError(true)
                                        },
                                    },
                                    {
                                        keyCode: 'B',
                                        description:
                                            'Schránku nie je možné zatvoriť',
                                        action: () => {
                                            handleError(false)
                                        },
                                    },
                                    {
                                        keyCode: 'C',
                                        description: 'Schránka je prázdna',
                                        action: () => {
                                            handleError(true)
                                        },
                                    },
                                    {
                                        keyCode: 'D',
                                        description:
                                            'Schránka obsahuje iný tovar',
                                        action: () => {
                                            handleError(true)
                                        },
                                    },
                                    {
                                        keyCode: '#',
                                        description: 'Návrat',
                                        action: () => {
                                            setShowMenu(false)
                                        },
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
