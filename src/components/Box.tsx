export type Compartment = {
    size: number
    selected?: boolean
}

type Props = {
    columns: Compartment[][]
}

export default function Box(props: Props) {
    return (
        <div style={{ display: 'flex' }}>
            {props.columns.map((column, i) => (
                <div
                    key={i}
                    style={{
                        width: '100px',
                        border: '2px solid #333',
                        borderTop: '2px solid #333',
                        borderLeft: i == 0 ? '2px solid #333' : 'none',
                        borderBottom: '2px solid #333',
                    }}
                >
                    {column.map((box, j) => (
                        <div
                            key={j}
                            style={{
                                height:
                                    box.size * 20 + 5 * (box.size - 1) + 'PX',
                                border: '2px solid',
                                borderColor: box.selected ? 'red' : '#333',
                                margin: '1px',
                                backgroundColor: box.selected
                                    ? 'red'
                                    : 'transparent',
                            }}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    )
}
