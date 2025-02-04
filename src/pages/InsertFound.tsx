import { useNavigate } from 'react-router'
import KeyShortcuts from '../components/KeyShortcuts'
import { useCallback, useEffect, useState } from 'react'
import Timer from '../components/Timer'
import DefaultBox from '../components/DefaultBox'
import { CompartmentId } from '../App'
import CloseCompartment from '../components/CloseCompartment'

type Props = {
    handleOpen: (id: CompartmentId) => void
    openCompartment: CompartmentId | null
}

const maxReopenedTimes = 2

const availableCompartments: CompartmentId[][] = [
    [
        { column: 2, row: 3 },
        { column: 0, row: 1 },
    ],
    [{ column: 1, row: 2 }],
]

const getCompartmentIndices = (compartment: CompartmentId) => {
    for (let i = 0; i < availableCompartments.length; i++) {
        const column = availableCompartments[i]
        for (let j = 0; j < column.length; j++) {
            const c = column[j]
            if (c.column === compartment.column && c.row === compartment.row) {
                return { size: i, pos: j }
            }
        }
    }
    return null
}

export default function InsertFound(props: Props) {
    const [reopenedTimes, setReopenedTimes] = useState(0)
    const { handleOpen: handleOpen, openCompartment } = props
    const [expire, setExpire] = useState<Date | null>(null)
    const n = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [currentCompartment, setCurrentCompartment] =
        useState<CompartmentId | null>(availableCompartments[0][0])
    const [lastOpenedCompartment, setLastOpenedCompartment] =
        useState<CompartmentId | null>(null)

    useEffect(() => {
        if (currentCompartment && openCompartment == null) {
            if (
                lastOpenedCompartment == null ||
                lastOpenedCompartment.column !== currentCompartment.column ||
                lastOpenedCompartment.row !== currentCompartment.row
            ) {
                handleOpen(currentCompartment)
                setLastOpenedCompartment(currentCompartment)
            }
        }
    }, [handleOpen, currentCompartment, openCompartment, lastOpenedCompartment])

    const handleExit = useCallback(() => {
        n('/')
    }, [n])

    const resetTimer = useCallback(() => {
        setExpire(new Date(Date.now() + (openCompartment ? 120 : 60) * 1000))
    }, [openCompartment])

    useEffect(() => {
        resetTimer()
    }, [resetTimer])

    const handleReopen = useCallback(() => {
        if (currentCompartment && reopenedTimes < maxReopenedTimes) {
            setReopenedTimes(reopenedTimes + 1)
            handleOpen(currentCompartment)
        }
    }, [reopenedTimes, handleOpen, currentCompartment])

    const handleNoFreeCompartment = useCallback(() => {
        n('/no-free-compartment')
    }, [n])

    const selectNextCompartment = useCallback(
        (allowSameSize: boolean) => {
            if (currentCompartment) {
                const indices = getCompartmentIndices(currentCompartment)
                if (indices) {
                    let desiredSize = allowSameSize
                        ? indices.size
                        : indices.size + 1
                    let desiredPos = allowSameSize ? indices.pos + 1 : 0

                    while (true) {
                        if (desiredSize < availableCompartments.length) {
                            if (
                                desiredPos >=
                                availableCompartments[desiredSize].length
                            ) {
                                desiredSize++
                                desiredPos = 0
                            } else {
                                setCurrentCompartment(
                                    availableCompartments[desiredSize][
                                        desiredPos
                                    ]
                                )
                                break
                            }
                        } else {
                            handleNoFreeCompartment()
                            break
                        }
                    }

                    if (desiredSize < availableCompartments.length) {
                        if (
                            desiredPos >=
                            availableCompartments[desiredSize].length
                        ) {
                            desiredSize++
                            desiredPos = 0
                        }

                        if (desiredSize < availableCompartments.length) {
                            setCurrentCompartment(
                                availableCompartments[desiredSize][desiredPos]
                            )
                        } else {
                            handleNoFreeCompartment()
                        }
                    } else {
                        handleNoFreeCompartment()
                    }
                }
            }
        },
        [currentCompartment, handleNoFreeCompartment]
    )

    const handleNotFit = useCallback(() => {
        selectNextCompartment(false)
    }, [selectNextCompartment])

    const handleNotUsable = useCallback(() => {
        selectNextCompartment(true)
    }, [selectNextCompartment])

    const handleAccept = useCallback(() => {
        n('/send-ok')
    }, [n])

    const isWrongCompartmentOpen =
        openCompartment &&
        currentCompartment &&
        openCompartment.column !== currentCompartment.column &&
        openCompartment.row !== currentCompartment.row

    return (
        <>
            {isWrongCompartmentOpen ? (
                <>
                    <CloseCompartment openCompartment={openCompartment} />
                </>
            ) : (
                <>
                    {!showMenu ? (
                        <>
                            <div style={{ textAlign: 'center' }}>
                                {openCompartment ? (
                                    <>
                                        <div
                                            style={{
                                                fontSize: '36px',
                                                margin: '20px 0 0 0',
                                            }}
                                        >
                                            Vložte zásielku do vyznačenej
                                            schránky
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                margin: '20px 0 0 0',
                                            }}
                                        >
                                            <DefaultBox
                                                selected={openCompartment}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                margin: '20px 0 0 0',
                                            }}
                                        >
                                            <KeyShortcuts
                                                shortcuts={[
                                                    {
                                                        keyCode: 'A',
                                                        description:
                                                            'Potvrdiť podanie zásielky',
                                                        action: handleAccept,
                                                    },
                                                    {
                                                        keyCode: 'B',
                                                        description:
                                                            'Schránku nie je možné použiť',
                                                        action: () =>
                                                            setShowMenu(true),
                                                    },
                                                    {
                                                        keyCode: 'C',
                                                        description:
                                                            'Otvoriť schránku, ak sa neotvorila',
                                                        action: handleReopen,
                                                    },
                                                    {
                                                        keyCode: 'D',
                                                        description: 'Ukončiť',
                                                        action: handleExit,
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            style={{
                                                fontSize: '36px',
                                                margin: '20px 0 0 0',
                                            }}
                                        >
                                            Podaj zásielky
                                        </div>
                                        <div
                                            style={{
                                                margin: '20px 0 0 0',
                                            }}
                                        >
                                            <KeyShortcuts
                                                shortcuts={[
                                                    {
                                                        keyCode: 'A',
                                                        description:
                                                            'Potvrdiť podanie zásielky',
                                                        action: handleAccept,
                                                    },
                                                    {
                                                        keyCode: 'B',
                                                        description:
                                                            'Schránku nie je možné použiť',
                                                        action: () =>
                                                            setShowMenu(true),
                                                    },
                                                    {
                                                        keyCode: 'C',
                                                        description: 'Ukončiť',
                                                        action: handleExit,
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            {expire ? (
                                <Timer expire={expire} callback={handleExit} />
                            ) : null}
                        </>
                    ) : (
                        <>
                            <div style={{ textAlign: 'center' }}>
                                <div
                                    style={{
                                        fontSize: '36px',
                                        margin: '20px 0 0 0',
                                    }}
                                >
                                    Schránku nie je možné použiť
                                </div>

                                <div style={{ marginTop: '20px' }}>
                                    <KeyShortcuts
                                        shortcuts={[
                                            {
                                                keyCode: 'A',
                                                description:
                                                    'Schránka je príliš malá pre zásielku',
                                                action: () => {
                                                    handleNotFit()
                                                    setShowMenu(false)
                                                },
                                            },
                                            {
                                                keyCode: 'B',
                                                description:
                                                    'Schránka je znečistená',
                                                action: () => {
                                                    handleNotUsable()
                                                    setShowMenu(false)
                                                },
                                            },
                                            {
                                                keyCode: 'C',
                                                description:
                                                    'Schránku nie je možné otvoriť / zavrieť',
                                                action: () => {
                                                    handleNotUsable()
                                                    setShowMenu(false)
                                                },
                                            },
                                            {
                                                keyCode: 'D',
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
            )}
        </>
    )
}
