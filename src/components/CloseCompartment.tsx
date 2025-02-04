import { useTranslation } from 'react-i18next'
import { CompartmentId } from '../App'
import DefaultBox from './DefaultBox'

type Props = {
    openCompartment: CompartmentId
}

export default function CloseCompartment(props: Props) {
    const { t } = useTranslation()

    const { openCompartment } = props

    return (
        <div>
            <div
                style={{
                    fontSize: '48px',
                    margin: '30px 0 0 0',
                    textAlign: 'center',
                }}
            >
                {t('pleaseCloseCompartment')}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '30px 0 0 0',
                }}
            >
                <DefaultBox selected={openCompartment} />
            </div>
        </div>
    )
}
