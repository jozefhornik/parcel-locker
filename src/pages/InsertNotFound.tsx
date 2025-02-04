import { useNavigate, useParams } from 'react-router'
import KeyShortcuts from '../components/KeyShortcuts'
import { useCallback, useState } from 'react'
import Timer from '../components/Timer'
import { useTranslation } from 'react-i18next'

export default function InsertNotFound() {
    const n = useNavigate()
    const { t } = useTranslation()
    const [expire] = useState<Date>(new Date(Date.now() + 60 * 1000))

    const { number } = useParams()

    const handleExit = useCallback(() => {
        n('/')
    }, [n])

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', margin: '30px 0 0 0' }}>
                    {t('shipmentSend')}
                </div>
                <div style={{ fontSize: '36px', margin: '2px 0 0 0' }}>
                    {t('shipmentWasNotFoundVerifyNumber')}
                </div>
                <div
                    style={{
                        fontSize: '36px',
                        margin: '10px 0 0 0',
                        color: 'red',
                    }}
                >
                    {number}
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
        </>
    )
}
