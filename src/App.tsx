import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import MainPage from './pages/MainPage'
import DeliveryFound from './pages/DeliveryFound'
import { useCallback, useState } from 'react'
import DeliveryFailed from './pages/DeliveryFailed'
import SendCustomer from './pages/SendCustomer'
import InsertFound from './pages/InsertFound'
import NoFreeCompartment from './pages/NoFreeCompartment'
import InsertNotFound from './pages/InsertNotFound'
import ReportProblem from './pages/ReportProblem'
import DeliveryOk from './pages/DeliveryOk'
import SendOk from './pages/SendOk'
import { useTranslation } from 'react-i18next'

export type CompartmentId = { column: number; row: number }

function App() {
    const [openCompartment, setOpenComparment] = useState<CompartmentId | null>(
        null
    )

    const {t} = useTranslation()

    const handleOpen = useCallback((id: CompartmentId) => {
        setOpenComparment(id)
    }, [])

    return (
        <>
            <div
                style={{
                    margin: '0 auto',
                    width: '800px',
                    height: '480px',
                    border: '3px solid black',
                    background: '#eee',
                    position: 'relative',
                }}
            >
                <BrowserRouter basename="/pl/">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <MainPage openCompartment={openCompartment} />
                            }
                        />
                        <Route
                            path="/delivery-ok/:number"
                            element={
                                <DeliveryFound
                                    handleOpen={handleOpen}
                                    openCompartment={openCompartment}
                                />
                            }
                        />
                        <Route
                            path="/delivery-failed/:number"
                            element={<DeliveryFailed />}
                        />
                        <Route
                            path="/insert-ok/:number"
                            element={
                                <InsertFound
                                    handleOpen={handleOpen}
                                    openCompartment={openCompartment}
                                />
                            }
                        />
                        <Route
                            path="/insert-not-found/:number"
                            element={<InsertNotFound />}
                        />
                        <Route
                            path="/no-free-compartment"
                            element={<NoFreeCompartment />}
                        />
                        <Route path="/send" element={<SendCustomer />} />
                        <Route
                            path="/report-problem/contact"
                            element={<ReportProblem contact />}
                        />
                        <Route
                            path="/report-problem/no-contact"
                            element={<ReportProblem />}
                        />
                        <Route
                            path="/send-ok"
                            element={
                                <SendOk openCompartment={openCompartment} />
                            }
                        />
                        <Route
                            path="/delivery-ok"
                            element={
                                <DeliveryOk openCompartment={openCompartment} />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </div>
            <div
                style={{
                    margin: '10px auto 0 auto',
                    width: '800px',
                    textAlign: 'center',
                }}
            >
                {t('validCodeForDelivery')}: 123456, {t('validCodeForSend')}:
                20000123456.
            </div>
            <div
                style={{
                    margin: '30px auto 0 auto',
                    width: '800px',
                    textAlign: 'center',
                }}
            >
                <div>
                    {t('compartmentIs')}: {openCompartment ? t('open') : t('closed')}
                </div>
                {openCompartment ? (
                    <div style={{ marginTop: '20px' }}>
                        <button onClick={() => setOpenComparment(null)}>
                            {t('close')}
                        </button>
                    </div>
                ) : null}
            </div>
            <div
                id="scanner"
                style={{ margin: '30px auto 0 auto', textAlign: 'center' }}
            ></div>
        </>
    )
}

export default App
