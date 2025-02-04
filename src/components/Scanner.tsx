import { useTranslation } from 'react-i18next'

type Props = {
    handleScan: (number: string) => void
}

export default function Scanner(props: Props) {
    const { handleScan } = props
    const { t } = useTranslation()

    return (
        <>
            <button
                style={{ marginRight: '20px' }}
                onClick={() => handleScan('20000123456')}
            >
                {t('scan')} 20000123456
            </button>
            <button onClick={() => handleScan('20001534545')}>
                {t('scan')} 20001534545
            </button>
        </>
    )
}
