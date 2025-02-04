import { useNavigate } from 'react-router'
import KeyShortcuts from '../components/KeyShortcuts'
import { useCallback, useEffect, useState } from 'react'
import Timer from '../components/Timer'
import { createPortal } from 'react-dom'
import Scanner from '../components/Scanner'
import { useTimer } from 'react-timer-hook'
import Loading from '../components/Loading'

export default function SendCustomer() {
    const n = useNavigate()
    const [expire] = useState<Date>(new Date(Date.now() + 120 * 1000))
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
                            Podanie zásielky
                        </div>
                        <div style={{ fontSize: '36px', margin: '30px 0 0 0' }}>
                            Naskenujte čiarový alebo QR kód zásielky
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
                    {scannerRoot
                        ? createPortal(
                              <Scanner
                                  handleScan={(number) => {
                                      if (number === '20000123456') {
                                          setLoadUrl('/insert-ok/' + number)
                                      } else {
                                          setLoadUrl(
                                              '/insert-not-found/' + number
                                          )
                                      }
                                  }}
                              />,
                              scannerRoot
                          )
                        : null}
                </>
            )}
        </>
    )
}
