import { ReleaseNote } from '@blank/background/controllers/PreferencesController';
import { expect } from 'chai';
import sinon from 'sinon';
import * as userPreferences from '../../src/utils/userPreferences';

describe('userPreferences tests', () => {
    describe('rebuild preferences after the user updates the wallet', () => {
        const sandbox = sinon.createSandbox();
        after(() => {
            sandbox.restore();
        });
        before(() => {
            sandbox.stub(userPreferences, 'getReleaseNotes').returns(
                new Promise((resolve) =>
                    resolve([
                        {
                            version: '1.0.0',
                            sections: [
                                {
                                    title: 'Updates',
                                    notes: [
                                        {
                                            message: 'a message',
                                            type: 'success',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            version: '2.0.0',
                            sections: [
                                {
                                    title: 'Updates',
                                    notes: [
                                        {
                                            message: 'a message2',
                                            type: 'warn',
                                        },
                                    ],
                                },
                            ],
                        },
                    ] as ReleaseNote[])
                )
            );
        });
        it('Should return empty release notes if user is not subscribed to release notes', async () => {
            const newPreferences =
                await userPreferences.resolvePreferencesAfterWalletUpdate(
                    {
                        settings: {
                            subscribedToReleaseaNotes: false,
                            hideAddressWarning: false,
                        },
                    },
                    '2.0.0'
                );
            expect(
                newPreferences.releaseNotesSettings?.latestReleaseNotes
            ).to.deep.equal([]);
            expect(
                newPreferences.releaseNotesSettings?.lastVersionUserSawNews
            ).to.be.equal('2.0.0');
        });
        it('Should return empty release notes if user has nothing new to see', async () => {
            const newPreferences =
                await userPreferences.resolvePreferencesAfterWalletUpdate(
                    {
                        settings: {
                            subscribedToReleaseaNotes: true,
                            hideAddressWarning: false,
                        },
                        releaseNotesSettings: {
                            lastVersionUserSawNews: '2.0.0',
                            latestReleaseNotes: [],
                        },
                    },
                    '2.0.0'
                );
            expect(
                newPreferences.releaseNotesSettings?.latestReleaseNotes
            ).to.deep.equal([]);
            expect(
                newPreferences.releaseNotesSettings?.lastVersionUserSawNews
            ).to.be.equal('2.0.0');
        });
        it('Should return release notes', async () => {
            const newPreferences =
                await userPreferences.resolvePreferencesAfterWalletUpdate(
                    {
                        settings: {
                            subscribedToReleaseaNotes: true,
                            hideAddressWarning: false,
                        },
                        releaseNotesSettings: {
                            lastVersionUserSawNews: '1.0.0',
                            latestReleaseNotes: [],
                        },
                    },
                    '2.0.0'
                );
            expect(
                newPreferences.releaseNotesSettings?.latestReleaseNotes
            ).to.be.have.length(1);
            expect(
                newPreferences.releaseNotesSettings?.lastVersionUserSawNews
            ).to.be.equal('1.0.0');
        });
    });
});
