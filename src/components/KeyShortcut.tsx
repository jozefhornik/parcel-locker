import { useEffect } from 'react'

export type KeyShortcutProps = {
    keyCode: string
    description: string
    action: () => void
}

export function KeyShortcut(props: KeyShortcutProps) {
    const { keyCode, action } = props
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const lowerCaseKey = keyCode.toLowerCase()
            const upperCaseKey = keyCode.toUpperCase()
            if (
                event.key === lowerCaseKey ||
                event.key === upperCaseKey ||
                event.key === keyCode
            ) {
                action()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [keyCode, action])

    return (
        <div
            style={{
                border: '1px solid #666',
                padding: '5px',
                width: '400px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <span>{props.description}</span>
            <span
                style={{
                    border: '1px solid #000',
                    background: '#ddd',
                    padding: '5px',
                    marginLeft: '10px',
                    display: 'inline-block',
                    width: '24px',
                    textAlign: 'center',
                }}
            >
                {keyCode}
            </span>
        </div>
    )
}
