import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export default function ScreenOff() {
    const { t } = useTranslation()
    const n = useNavigate()

    useEffect(() => {
        const handleKeyDown = () => {
            n('/default')
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [n])

    return (
        <>
            <div
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{ fontSize: '36px' }}>
                    {t('screenIsOffPressAnyKey')}
                </div>
            </div>
        </>
    )
}
