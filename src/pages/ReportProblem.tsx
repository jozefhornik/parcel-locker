import { useNavigate } from 'react-router'
import KeyShortcuts from '../components/KeyShortcuts'
import { useCallback, useState } from 'react'
import Timer from '../components/Timer'
import { useTranslation } from 'react-i18next'

type Props = {
    contact?: boolean
}

export default function ReportProblem(props: Props) {
    const n = useNavigate()
    const { t } = useTranslation()
    const [expire] = useState<Date>(new Date(Date.now() + 60 * 1000))

    const handleExit = useCallback(() => {
        n('/')
    }, [n])

    const { contact } = props

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', margin: '30px 0 0 0' }}>
                    {t('thankYouForReporting')}
                </div>
                {contact ? (
                    <div style={{ fontSize: '24px', margin: '10px 0 0 0' }}>
                        {t('weWillContactYouSoon')}
                    </div>
                ) : null}
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
