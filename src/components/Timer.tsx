import { useEffect } from 'react'
import { useTimer } from 'react-timer-hook'

type Props = {
    expire: Date
    callback: () => void
    shouldBeVisible?: () => boolean
}

export default function Timer(props: Props) {
    const { expire, callback, shouldBeVisible } = props

    const { seconds, minutes, restart } = useTimer({
        expiryTimestamp: expire,
        onExpire: callback,
    })

    useEffect(() => {
        restart(expire)
    }, [expire, restart])

    return (
        <>
            {!shouldBeVisible || shouldBeVisible() ? (
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        fontSize: '24px',
                        lineHeight: '24px',
                    }}
                >
                    {minutes}:{seconds.toLocaleString().padStart(2, '0')}
                </div>
            ) : null}
        </>
    )
}
