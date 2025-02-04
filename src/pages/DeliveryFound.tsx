import { useCallback, useEffect, useState } from 'react'
import DefaultBox from '../components/DefaultBox'
import KeyShortcuts from '../components/KeyShortcuts'
import Timer from '../components/Timer'
import { useNavigate } from 'react-router'
import { CompartmentId } from '../App'
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()

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
                        {t('shipmentDelivery')}
                    </div>
                    <div style={{ fontSize: '36px', margin: '0 0 0 0' }}>
                        {t('takeTheShipmentAndCloseCompartment')}
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
                                        description: t(
                                            'confirmShipmentDelivery'
                                        ),
                                        action: handleAccept,
                                    },
                                    {
                                        keyCode: 'B',
                                        description: t('reportProblem'),
                                        action: () => setShowMenu(true),
                                    },
                                    {
                                        keyCode: 'C',
                                        description: t(
                                            'openCompartmentIfDoesNotOpen'
                                        ),
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
                                        description: t(
                                            'confirmShipmentDelivery'
                                        ),
                                        action: handleAccept,
                                    },
                                    {
                                        keyCode: 'B',
                                        description: t('reportProblem'),
                                        action: () => setShowMenu(true),
                                    },
                                    ...(reopenedTimes < maxReopenedTimes
                                        ? [
                                              {
                                                  keyCode: 'C',
                                                  description: t(
                                                      'openCompartmentAgain'
                                                  ),
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
                            {t('reportProblem')}
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <KeyShortcuts
                                shortcuts={[
                                    {
                                        keyCode: 'A',
                                        description: t(
                                            'compartmentCanNotBeOpened'
                                        ),
                                        action: () => {
                                            handleError(true)
                                        },
                                    },
                                    {
                                        keyCode: 'B',
                                        description: t(
                                            'compartmentCanNotBeClosed'
                                        ),
                                        action: () => {
                                            handleError(false)
                                        },
                                    },
                                    {
                                        keyCode: 'C',
                                        description: t('compartmentIsEmpty'),
                                        action: () => {
                                            handleError(true)
                                        },
                                    },
                                    {
                                        keyCode: 'D',
                                        description: t(
                                            'compartmentContainsAnotherShipment'
                                        ),
                                        action: () => {
                                            handleError(true)
                                        },
                                    },
                                    {
                                        keyCode: '#',
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
    )
}
