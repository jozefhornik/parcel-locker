import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
    en: {
        translation: {
            pleaseCloseCompartment: 'Please close selected compartment',
            loading: 'Loading...',
            scan: 'Scan',
            shipmentDelivery: 'Shipment pickup',
            enteredCodeIsNotValid: 'Entered code is not valid',
            exit: 'Exit',
            goBack: 'Go back',
            compartmentContainsAnotherShipment:
                'Compartment contains another shipment',
            compartmentIsEmpty: 'Compartment is empty',
            compartmentCanNotBeClosed: 'Compartment can not be closed',
            compartmentCanNotBeOpened: 'Compartment can not be opened',
            reportProblem: 'Report a problem',
            openCompartmentAgain: 'Open compartment again',
            confirmShipmentDelivery: 'Confirm shipment pickup',
            openCompartmentIfDoesNotOpen: 'Open compartment if does not open',
            takeTheShipmentAndCloseCompartment:
                'Take the shipment and close the compartment',
            thankYouForCollection: 'Thank you for pickup of the shipment',
            shipmentSend: 'Send shipment',
            shipmentWasNotFoundVerifyNumber:
                'Shipment was not found, verify its number',
            thankYouForReporting: 'Thank you for reporting the problem',
            weWillContactYouSoon:
                'We will contact you soon with a proposal for a solution to the situation',
            scanBarCodeOrQrCode: 'Scan the barcode or QR code of the shipment',
            thankYouForSending: 'Thank you for sending the shipment',
            noFreeCompartment: 'There is no free suitable compartment',
            enterShipmentCodeAndPressHash:
                'Enter the code for pickup and press #',
            serviceMenu: 'Service menu',
            sendShipment: 'Send shipment',
            clearCode: 'Clear code',
            insertShipmentToCompartment:
                'Insert the shipment into the selected compartment',
            compartmentCanNotBeUsed: 'Compartment can not be used',
            confirmShipmentSend: 'Confirm shipment send',
            compartmentIsTooSmall: 'Compartment is too small for the shipment',
            compartmentIsDirty: 'Compartment is dirty',
            compartmentIsBroken: 'Compartment is broken',

            validCodeForDelivery: 'Valid code for pickup',
            validCodeForSend: 'Valid code for sending',
            compartmentIs: 'Compartment is',
            open: 'Open',
            closed: 'Closed',
            close: 'Close',
        },
    },
    sk: {
        translation: {
            pleaseCloseCompartment:
                'Prosíme, zatvorte otvorenú vyznačenú schránku',
            loading: 'Prebieha načítavanie údajov....',
            scan: 'Naskenovať',
            shipmentDelivery: 'Výdaj zásielky',
            enteredCodeIsNotValid: 'Kód zásielky nebol zadaný nesprávne',
            exit: 'Ukončiť',
            goBack: 'Návrat',
            compartmentContainsAnotherShipment: 'Schránka obsahuje iný tovar',
            compartmentIsEmpty: 'Schránka je prázdna',
            compartmentCanNotBeClosed: 'Schránku nie je možné zatvoriť',
            compartmentCanNotBeOpened: 'Schránku nie je možné otvoriť',
            reportProblem: 'Nahláste problém so schránkou',
            openCompartmentAgain: 'Otvoriť opätovne schránku',
            confirmShipmentDelivery: 'Potvrdiť vyzdvihnutie zásielky',
            openCompartmentIfDoesNotOpen: 'Otvoriť schránku, ak sa neotvorila',
            takeTheShipmentAndCloseCompartment:
                'Vyberte si zásielku a zatvorte, prosím, schránku',
            thankYouForCollection: 'Ďakujeme za vyzdvihnutie zásielky',
            shipmentSend: 'Podaj zásielky',
            shipmentWasNotFoundVerifyNumber:
                'Zásielka nebola nájdená, skontrolujte jej číslo',
            thankYouForReporting: 'Ďakujeme za nahlásenie problému',
            weWillContactYouSoon:
                'Budeme Vás konktaktovať s návrhom riešenia vzniknutej situácie',
            scanBarCodeOrQrCode: 'Naskenujte čiarový alebo QR kód zásielky',
            thankYouForSending: 'Ďakujeme za odoslanie zásielky',
            noFreeCompartment: 'Nie je voľný žiadny vhodný box',
            enterShipmentCodeAndPressHash:
                'Zadajte kód pre vydanie zásielky a stlačte #',
            serviceMenu: 'Obsluha',
            sendShipment: 'Odoslať zásielku',
            clearCode: 'Vyčistiť kód',
            insertShipmentToCompartment:
                'Vložte zásielku do vyznačenej schránky',
            compartmentCanNotBeUsed: 'Schránku nie je možné použiť',
            confirmShipmentSend: 'Potvrdiť odoslanie zásielky',
            compartmentIsTooSmall: 'Schránka je príliš malá pre zásielku',
            compartmentIsDirty: 'Schránka je znečistená',
            compartmentIsBroken: 'Schránka je poškodená',

            validCodeForDelivery: 'Platný kód pre vyzdvihnutie',
            validCodeForSend: 'Platný kód pre odoslanie',
            compartmentIs: 'Schránka je',
            open: 'Otvorená',
            closed: 'Zatvorená',
            close: 'Zatvoriť',
        },
    },
}

const queryParameters = new URLSearchParams(window.location.search)

i18n.use(initReactI18next).init({
    resources,
    lng: queryParameters.get('lang') || 'en',
    interpolation: {
        escapeValue: false,
    },
})

export default i18n
