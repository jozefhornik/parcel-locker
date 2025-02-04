import { useTranslation } from 'react-i18next'

export default function Loading() {
    const { t } = useTranslation()

    return (
        <div
            style={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    fontSize: '48px',
                    textAlign: 'center',
                }}
            >
                {t('loading')}
            </div>
        </div>
    )
}
