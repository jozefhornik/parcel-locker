import { useNavigate } from 'react-router'
import KeyShortcuts from '../components/KeyShortcuts'
import { useCallback, useContext, useEffect, useState } from 'react'
import Timer from '../components/Timer'
import { CompartmentId } from '../App'
import CloseCompartment from '../components/CloseCompartment'
import { useTranslation } from 'react-i18next'
import { CourierContext } from '../Contexts'
import { createPortal } from 'react-dom'

type Props = {
    handleOpen: (id: CompartmentId) => void
    openCompartment: CompartmentId | null
}

export default function CourierDeliver(props: Props) {
    const [wasOpenedFor, setWasOpenedFor] = useState<string | null>(null)
    const { handleOpen, openCompartment } = props
    const n = useNavigate()
    const { t } = useTranslation()
    const [expire, setExpire] = useState<Date | null>(null)

    const handleExit = useCallback(() => {
        n('/')
    }, [n])

    const { value, setValue } = useContext(CourierContext)

    useEffect(() => {
        if (value.delivering && value.delivering.number !== wasOpenedFor) {
            handleOpen(value.delivering.compartment)
            setWasOpenedFor(value.delivering.number)
        }
    }, [handleOpen, wasOpenedFor, value])

    useEffect(() => {
        if (!openCompartment) {
            setExpire(new Date(Date.now() + 120 * 1000))
        }
    }, [openCompartment])

    useEffect(() => {
        if (!value.delivering) {
            const undelivered = [...value.undelivered]
            const delivering = undelivered[0]
            if (delivering) {
                setValue({ ...value, delivering })
            } else {
                n('/courier/valid')
            }
        }
    }, [value, setValue, n])

    const scannerRoot = document.getElementById('scanner')

    const confirmDelivery = () => {
        setValue({
            undelivered: value.undelivered.filter(
                (v) => v.number !== value.delivering?.number
            ),
            delivering: undefined,
        })
    }

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
                    {value.delivering ? (
                        <>
                            <div style={{ textAlign: 'center' }}>
                                <div
                                    style={{
                                        fontSize: '48px',
                                        margin: '30px 0 0 0',
                                    }}
                                >
                                    {t('courier')}
                                </div>
                                <div
                                    style={{
                                        fontSize: '36px',
                                        margin: '20px 0 0 0',
                                    }}
                                >
                                    {t('scanTakenShipmentForControl')}{' '}
                                    {value.delivering.number}
                                </div>
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <KeyShortcuts
                                    shortcuts={[
                                        {
                                            keyCode: 'A',
                                            description: t(
                                                'openComparmentAgain'
                                            ),
                                            action: () => {
                                                const compartment =
                                                    value.delivering
                                                        ?.compartment
                                                if (compartment) {
                                                    handleOpen(compartment)
                                                }
                                            },
                                        },
                                        {
                                            keyCode: 'B',
                                            description: t(
                                                'numberCanNotBeScanned'
                                            ),
                                            action: confirmDelivery,
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
                    ) : (
                        <></>
                    )}
                    {expire ? (
                        <Timer expire={expire} callback={handleExit} />
                    ) : null}

                    {scannerRoot && value.delivering
                        ? createPortal(
                              <>
                                  <button
                                      style={{ marginRight: '20px' }}
                                      onClick={confirmDelivery}
                                  >
                                      {t('scan')} {value.delivering.number}
                                  </button>
                                  <button onClick={() => {}}>
                                      {t('scan')} 77777777
                                  </button>
                              </>,
                              scannerRoot
                          )
                        : null}
                </div>
            )}
        </>
    )
}
