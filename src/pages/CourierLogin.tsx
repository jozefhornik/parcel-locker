import { useNavigate } from 'react-router'
import KeyShortcuts from '../components/KeyShortcuts'
import { useCallback, useContext, useEffect, useState } from 'react'
import Timer from '../components/Timer'
import { useTranslation } from 'react-i18next'
import { useTimer } from 'react-timer-hook'
import { createPortal } from 'react-dom'
import Loading from '../components/Loading'
import { CourierContext } from '../Contexts'

export default function CourierLogin() {
    const n = useNavigate()
    const { t } = useTranslation()
    const [expire] = useState<Date>(new Date(Date.now() + 60 * 1000))
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

    const context = useContext(CourierContext)

    useEffect(() => {
        if (loadUrl) {
            restart(new Date(Date.now() + 1000))
        }
    }, [loadUrl, restart])

    const handleExit = useCallback(() => {
        n('/')
    }, [n])

    const scannerRoot = document.getElementById('scanner')

    return (
        <>
            {loadUrl ? (
                <Loading />
            ) : (
                <>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', margin: '30px 0 0 0' }}>
                            {t('courierLogin')}
                        </div>

                        <div style={{ fontSize: '36px', margin: '30px 0 0 0' }}>
                            {t('scanYourQrCode')}
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
                                        description: t('exit'),
                                        action: handleExit,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <Timer expire={expire} callback={handleExit} />

                    {scannerRoot
                        ? createPortal(
                              <>
                                  <button
                                      style={{ marginRight: '20px' }}
                                      onClick={() => {
                                          context.setValue({
                                              undelivered: [
                                                  {
                                                      number: '20101213212',
                                                      compartment: {
                                                          row: 1,
                                                          column: 1,
                                                      },
                                                  },
                                                  {
                                                      number: '2574123124',
                                                      compartment: {
                                                          row: 2,
                                                          column: 2,
                                                      },
                                                  },
                                              ]
                                          })
                                          setLoadUrl('/courier/valid')
                                      }}
                                  >
                                      {t('scan')} 1234
                                  </button>
                                  <button
                                      onClick={() =>
                                          setLoadUrl('/courier/not-found')
                                      }
                                  >
                                      {t('scan')} 5678
                                  </button>
                              </>,
                              scannerRoot
                          )
                        : null}
                </>
            )}
        </>
    )
}
