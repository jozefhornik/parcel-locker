type Props = {
    handleScan: (number: string) => void
}

export default function Scanner(props: Props) {
    const { handleScan } = props

    return (
        <>
            <button
                style={{ marginRight: '20px' }}
                onClick={() => handleScan('20000123456')}
            >
                Naskenovať 20000123456
            </button>
            <button onClick={() => handleScan('20001534545')}>
                Naskenovať 20001534545
            </button>
        </>
    )
}
