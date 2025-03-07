import { useNavigate } from 'react-router'
import KeyShortcuts from '../components/KeyShortcuts'
import { useCallback, useContext, useState } from 'react'
import Timer from '../components/Timer'
import { useTranslation } from 'react-i18next'
import { CourierContext } from '../Contexts'
import { createPortal } from 'react-dom'
import ShipmentInsert from '../components/ShipmentInsert'
import { CompartmentId } from '../App'

const availableCompartments: CompartmentId[][] = [
    [
        { column: 2, row: 3 },
        { column: 0, row: 1 },
    ],
    [{ column: 1, row: 2 }],
]

type Props = {
    handleOpen: (id: CompartmentId) => void
    openCompartment: CompartmentId | null
}

export default function CourierValid(props: Props) {
    const n = useNavigate()
    const { t } = useTranslation()
    const [expire] = useState<Date>(new Date(Date.now() + 120 * 1000))
    const [inserting, setInsering] = useState<string | null>(null)

    const handleExit = useCallback(() => {
        n('/')
    }, [n])

    const context = useContext(CourierContext)

    const scannerRoot = document.getElementById('scanner')

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <div>
                    <div>
                        <>
                            {context.value.undelivered.length > 0 ? (
                                <>
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
                                        {t('undeliveredShipments')} (
                                        {context.value.undelivered.length})
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '20px',
                                            margin: '10px 0 0 0',
                                        }}
                                    >
                                        {t(
                                            'beforeInsertingNewShipmentsAllUndeliveredMustBeTaken'
                                        )}
                                    </div>
                                    <div style={{ margin: '20px 0 0 0' }}>
                                        <KeyShortcuts
                                            shortcuts={[
                                                {
                                                    keyCode: 'A',
                                                    description: t(
                                                        'openFirstCompartmentForTake'
                                                    ),
                                                    action: () => {
                                                        n('/courier/deliver')
                                                    },
                                                },
                                                {
                                                    keyCode: 'B',
                                                    description: t('exit'),
                                                    action: handleExit,
                                                },
                                            ]}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    {!inserting ? (
                                        <>
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
                                                    margin: '20px 0 0 0',
                                                    fontSize: '36px',
                                                }}
                                            >
                                                {t(
                                                    'scanShipmentNumberForInsert'
                                                )}
                                            </div>
                                            <div
                                                style={{ margin: '20px 0 0 0' }}
                                            >
                                                <KeyShortcuts
                                                    shortcuts={[
                                                        {
                                                            keyCode: 'A',
                                                            description:
                                                                t('exit'),
                                                            action: handleExit,
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            {scannerRoot
                                                ? createPortal(
                                                      <>
                                                          <button
                                                              style={{
                                                                  marginRight:
                                                                      '20px',
                                                              }}
                                                              onClick={() => {
                                                                  setInsering(
                                                                      '13212313245'
                                                                  )
                                                              }}
                                                          >
                                                              {t('scan')}{' '}
                                                              13212313245
                                                          </button>
                                                          <button
                                                              onClick={() => {
                                                                  n(
                                                                      '/courier/shipment-not-found'
                                                                  )
                                                              }}
                                                          >
                                                              {t('scan')}{' '}
                                                              77777777
                                                          </button>
                                                      </>,
                                                      scannerRoot
                                                  )
                                                : null}
                                        </>
                                    ) : (
                                        <ShipmentInsert
                                            maxReopenedTimes={100}
                                            availableCompartments={
                                                availableCompartments
                                            }
                                            handleNoFreeCompartment={() => {
                                                n(
                                                    '/courier/no-free-compartment'
                                                )
                                            }}
                                            handleAccept={() => {
                                                setInsering(null)
                                            }}
                                            {...props}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    </div>
                </div>
            </div>
            <Timer expire={expire} callback={handleExit} />
        </>
    )
}
