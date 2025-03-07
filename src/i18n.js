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
            serviceMenu: 'Courier login',
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
            screenIsOffPressAnyKey: 'Screen is off, press any key to turn on',

            courierLogin: 'Courier login',
            scanYourQrCode: 'Scan your QR code',
            courierLoginWasNotValid: 'Courier login was not valid',
            courier: 'Courier',
            undeliveredShipments: 'Undelivered shipments',
            beforeInsertingNewShipmentsAllUndeliveredMustBeTaken:
                'Before inserting new shipments, all undelivered shipments must be taken',
            openFirstCompartmentForTake: 'Open first compartment for take',
            scanTakenShipmentForControl: 'Scan taken shipment for control',
            openComparmentAgain: 'Open compartment again',
            numberCanNotBeScanned: 'Number can not be scanned',
            scanShipmentNumberForInsert: 'Scan shipment number for insert',
            validShipmentCodeForCourierInsert:
                'Valid shipment code for courier insert',
            validCourierLogin: 'Valid courier login',
            confirmShipmentInsert: 'Confirm shipment insert',
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
            serviceMenu: 'Prihlásenie kuriéra',
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
            screenIsOffPressAnyKey:
                'Obrazovka je vypnutá, stlačte ľubovolnú klávesu pre zapnutie',

            courierLogin: 'Prihlásenie kuriéra',
            scanYourQrCode: 'Naskenujte Váš QR kód',
            courierLoginWasNotValid: 'Prihlásenie kuriéra nebolo úspešné',
            courier: 'Kuriér',
            undeliveredShipments: 'Nevyzdvihnuté zásielky',
            beforeInsertingNewShipmentsAllUndeliveredMustBeTaken:
                'Pred vložením nových zásielok je potrebné vyzdvihnúť všetky exspirované zásielky',
            openFirstCompartmentForTake:
                'Otvoriť prvú schránku pre vyzdvihnutie',
            scanTakenShipmentForControl: 'Naskenujte vyzdvihnutú zásielku',
            openComparmentAgain: 'Otvoriť schránku opätovne',
            numberCanNotBeScanned: 'Číslo nie je možné naskenovať',
            scanShipmentNumberForInsert:
                'Naskenujte číslo zásielky pre vloženie',
            validShipmentCodeForCourierInsert:
                'Platný kód zásielky pre vloženie',
            validCourierLogin: 'Platné prihlásenie kuriéra',
            confirmShipmentInsert: 'Potvrdiť vloženie zásielky',
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
