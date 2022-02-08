import {
    PreferencesController,
    PreferencesControllerState,
} from '../../src/controllers/PreferencesController';

const testAccounts = [
    {
        key: '0x7fe1315d0fa2f408dacddb41deacddec915e85c982e9cbdaacc6eedcb3f9793b',
        address: '0x281ae730d284bDA68F4e9Ac747319c8eDC7dF3B1',
    },
    {
        key: '0x4b95973deb96905fd605d765f31d1ce651e627d61c136fa2b8eb246a3c549ebe',
        address: '0xbda8C7b7B5d0579Eb18996D1f684A434E4fF701f',
    },
];

let testInitState: PreferencesControllerState;

testInitState = {
    selectedAddress: testAccounts[0].address,
    localeInfo: 'en-US',
    nativeCurrency: 'usd',
    showTestNetworks: true,
    showWelcomeMessage: false,
    popupTab: 'activity',
    settings: {
        hideAddressWarning: false, // Shown by default
        subscribedToReleaseaNotes: true,
    },
    releaseNotesSettings: {
        lastVersionUserSawNews: '0.1.3',
        latestReleaseNotes: [],
    },
};

const mockPreferencesController = new PreferencesController({
    initState: testInitState,
});

export { mockPreferencesController };
