import { useCallback, useEffect, useState } from 'react'
import { CompartmentId } from '../App'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import CloseCompartment from './CloseCompartment'
import KeyShortcuts from './KeyShortcuts'
import DefaultBox from './DefaultBox'
import Timer from './Timer'

type Props = {
    availableCompartments: CompartmentId[][]
    handleOpen: (id: CompartmentId) => void
    openCompartment: CompartmentId | null
    maxReopenedTimes: number
    handleNoFreeCompartment: () => void
    handleAccept: () => void
}

const getCompartmentIndices = (
    compartment: CompartmentId,
    availableCompartments: CompartmentId[][]
) => {
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

export default function ShipmentInsert(props: Props) {
    const {
        availableCompartments,
        handleOpen,
        openCompartment,
        maxReopenedTimes,
        handleNoFreeCompartment,
        handleAccept,
    } = props

    const [reopenedTimes, setReopenedTimes] = useState(0)
    const [expire, setExpire] = useState<Date | null>(null)
    const n = useNavigate()
    const { t } = useTranslation()
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
    }, [reopenedTimes, handleOpen, currentCompartment, maxReopenedTimes])

    const selectNextCompartment = useCallback(
        (allowSameSize: boolean) => {
            if (currentCompartment) {
                const indices = getCompartmentIndices(
                    currentCompartment,
                    availableCompartments
                )
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
        [currentCompartment, handleNoFreeCompartment, availableCompartments]
    )

    const handleNotFit = useCallback(() => {
        selectNextCompartment(false)
    }, [selectNextCompartment])

    const handleNotUsable = useCallback(() => {
        selectNextCompartment(true)
    }, [selectNextCompartment])

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
                                            {t('insertShipmentToCompartment')}
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
                                                        description: t(
                                                            'confirmShipmentInsert'
                                                        ),
                                                        action: handleAccept,
                                                    },
                                                    {
                                                        keyCode: 'B',
                                                        description: t(
                                                            'compartmentCanNotBeUsed'
                                                        ),
                                                        action: () =>
                                                            setShowMenu(true),
                                                    },
                                                    {
                                                        keyCode: 'C',
                                                        description: t(
                                                            'openCompartmentIfDoesNotOpen'
                                                        ),
                                                        action: handleReopen,
                                                    },
                                                    {
                                                        keyCode: 'D',
                                                        description: t('exit'),
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
                                            {t('shipomentSend')}
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
                                                        description: t(
                                                            'confirmShipmentInsert'
                                                        ),
                                                        action: handleAccept,
                                                    },
                                                    {
                                                        keyCode: 'B',
                                                        description: t(
                                                            'compartmentCanNotBeUsed'
                                                        ),
                                                        action: () =>
                                                            setShowMenu(true),
                                                    },
                                                    {
                                                        keyCode: 'C',
                                                        description: t('exit'),
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
                                    {t('compartmentCanNotBeUsed')}
                                </div>

                                <div style={{ marginTop: '20px' }}>
                                    <KeyShortcuts
                                        shortcuts={[
                                            {
                                                keyCode: 'A',
                                                description: t(
                                                    'compartmentIsTooSmall'
                                                ),
                                                action: () => {
                                                    handleNotFit()
                                                    setShowMenu(false)
                                                },
                                            },
                                            {
                                                keyCode: 'B',
                                                description:
                                                    t('compartmentIsDirty'),
                                                action: () => {
                                                    handleNotUsable()
                                                    setShowMenu(false)
                                                },
                                            },
                                            {
                                                keyCode: 'C',
                                                description: t(
                                                    'compartmentIsBroken'
                                                ),
                                                action: () => {
                                                    handleNotUsable()
                                                    setShowMenu(false)
                                                },
                                            },
                                            {
                                                keyCode: 'D',
                                                description: t('goBack'),
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
