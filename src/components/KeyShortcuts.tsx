import { KeyShortcut, KeyShortcutProps } from './KeyShortcut'

type Props = {
    shortcuts: KeyShortcutProps[]
}

export default function KeyShortcuts(props: Props) {
    return (
        <div>
            {props.shortcuts.map((shortcut, i) => (
                <div key={i} style={{ marginTop: i > 0 ? '2px' : 0 }}>
                    <KeyShortcut {...shortcut} />
                </div>
            ))}
        </div>
    )
}
