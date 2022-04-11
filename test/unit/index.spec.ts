import { generateKeyPair, getEdPkInCurve } from '../../src/utils/crypto';
import { KeyPair, ready } from 'libsodium-wrappers';
import {
    generateRandomSeedPhrase,
    generateRandomString,
    ThreefoldLogin,
} from '../../src';
import { parseSignedAttemptFromUrl } from '../../src/utils/parse';

/**
 * seedphrase used for staging app
 *
 * empty act name wear retreat moment grid mechanic near doll escape limb venue intact lecture husband mountain notice belt shadow virus tissue observe chronic
 *
 * doublename ifr.3bot
 * email hd@jd.so
 */

const protocol = 'https:';

// const rawHost = 'test-bot-front-end.io';
const rawHost = 'login.staging.jimber.io';

const threeFoldAPIHost = protocol + '//' + rawHost;
const appId = 'test.threefoldlogin';

// const seedPhrase =
//     'adjust cabin jacket brick merge please inflict charge among genius boost vibrant';
const seedPhrase =
    'calm science teach foil burst until next mango hole sponsor fold bottom cousin push focus track truly tornado turtle over tornado teach large fiscal';
const redirectUrl = 'https://test-bot-front-end.io';
const kycBackendUrl = 'https://openkyc.staging.jimber.io';

let login: ThreefoldLogin;
let state: string;

const testState = 'glsqIjWpvX24tpT6A3xbmvbr5FBJh1Pk';
const testRedirectUrl =
    'https://test.threefoldlogin/https://test-bot-front-end.io?signedAttempt=%7B%22signedAttempt%22%3A%22OQbbjNSmkvxtVDcjcnbN%2BAQjkiZaruNCQ2arNQ01I1atiK4rcFpBzxm3693WtThY3yA6ChsgbQUA7WpLRvaUBnsic2lnbmVkU3RhdGUiOiJnbHNxSWpXcHZYMjR0cFQ2QTN4Ym12YnI1RkJKaDFQayIsImRhdGEiOnsibm9uY2UiOiJndEdUa2dLdjBHa21mN2E5RWd0MGI5bmxOS0kzR2pYTCIsImNpcGhlcnRleHQiOiJoU2pyNGRydUlJSE5yd3Y0ZkZNWmRTUWNrcG5mZ09GU2svNVBJZUxMOHA4Smdyc09MUm9BNVpCc2xMcnI3SjVsYm1QamlZVTZXN1cvIn0sInNlbGVjdGVkSW1hZ2VJZCI6MTA1LCJkb3VibGVOYW1lIjoiaWZyLjNib3QiLCJyYW5kb21Sb29tIjoiZGY5NzFjZjAtMDkzMi00NGJhLWI1YTktYzg3Y2RkOGUxNmJjIiwiYXBwSWQiOiJ0ZXN0LnRocmVlZm9sZGxvZ2luIn0%3D%22%2C%22doubleName%22%3A%22ifr.3bot%22%7D';
const testSignedAttempt =
    'OQbbjNSmkvxtVDcjcnbN+AQjkiZaruNCQ2arNQ01I1atiK4rcFpBzxm3693WtThY3yA6ChsgbQUA7WpLRvaUBnsic2lnbmVkU3RhdGUiOiJnbHNxSWpXcHZYMjR0cFQ2QTN4Ym12YnI1RkJKaDFQayIsImRhdGEiOnsibm9uY2UiOiJndEdUa2dLdjBHa21mN2E5RWd0MGI5bmxOS0kzR2pYTCIsImNpcGhlcnRleHQiOiJoU2pyNGRydUlJSE5yd3Y0ZkZNWmRTUWNrcG5mZ09GU2svNVBJZUxMOHA4Smdyc09MUm9BNVpCc2xMcnI3SjVsYm1QamlZVTZXN1cvIn0sInNlbGVjdGVkSW1hZ2VJZCI6MTA1LCJkb3VibGVOYW1lIjoiaWZyLjNib3QiLCJyYW5kb21Sb29tIjoiZGY5NzFjZjAtMDkzMi00NGJhLWI1YTktYzg3Y2RkOGUxNmJjIiwiYXBwSWQiOiJ0ZXN0LnRocmVlZm9sZGxvZ2luIn0=';
const testSignedEmailIdentifier =
    'LouB5RT/tmQxfW1M2unm/khafCu0ib4cpsKpm9ETwKgjlhhb4cV/Qw5T0vMMnEpcOKS0Bq0pBjFMOkEgGBnYDXsgImVtYWlsIjogIm1hdGhpYXMuZGUud2VlcmR0QGdtYWlsLmNvbSIsICJpZGVudGlmaWVyIjogInRhaWsuM2JvdCIgfQ==';
const testSignedPhoneIdentifier =
    'S5G4CUDXPQ3B8uvrnewlCV48/D2zd9A9QG3jhVpfWlFJlI3RWa1nOlCQMWRG7FZYhD7ljqMqvS/ja+1M68I3C3sgInBob25lIjogIiszMjQ5NDQ4NTc0MCIsICJpZGVudGlmaWVyIjogImhjYmZobmNkaGt2ZC4zYm90IiB9';

describe('Crypto', () => {
    beforeAll(callback => {
        ready.then(() => {
            callback();
        });
    }, 1000);

    it('should be able to generate random mnemonic(seedphrase)', () => {
        const mnemonic = generateRandomSeedPhrase();
        expect(mnemonic.split(' ').length).toBe(24);
    }, 1000);

    it('should be able to generate random string', () => {
        const string = generateRandomString();
        expect(typeof string).toBe('string');
    }, 1000);

    it('should be able to generate a keypair', async () => {
        const keyPair: KeyPair = await generateKeyPair(seedPhrase);
        expect(typeof keyPair).toBe('object');
    });
    it('should be able to get a ??? key', async () => {
        const keyPair: KeyPair = await generateKeyPair(seedPhrase);
        const edPkInCurve = getEdPkInCurve(keyPair.publicKey);
        expect(edPkInCurve).toBe(
            'haPnjRJSFG1mk388ZCk9ybi0h/Yx0QkOzPQLFVoYOBw='
        );
    });
});

describe('Parse', () => {
    it('Should parse a raw signed attempt from url', () => {
        const signedAttempt = parseSignedAttemptFromUrl(
            new URL(testRedirectUrl)
        );
        expect(typeof signedAttempt.signedAttempt).toBe('string');
        expect(signedAttempt.signedAttempt).toBe(testSignedAttempt);

        expect(typeof signedAttempt.doubleName).toBe('string');
        expect(signedAttempt.doubleName).toBe('ifr.3bot');
    }, 1000);

    it("Should fail when a url doesn't contain a signed attempt", () => {
        expect(() => {
            parseSignedAttemptFromUrl(new URL(redirectUrl));
        }).toThrow('no signedAttemptParameter');
    }, 1000);
});

describe('ThreefoldLogin', () => {
    beforeEach(async () => {
        login = new ThreefoldLogin(
            threeFoldAPIHost,
            appId,
            seedPhrase,
            redirectUrl,
            kycBackendUrl
        );
        await login.init();

        state = testState;
    }, 1000);

    it('should be able to be constructed', () => {
        const login = new ThreefoldLogin(
            threeFoldAPIHost,
            appId,
            seedPhrase,
            redirectUrl,
            kycBackendUrl
        );
        expect(login).toBeInstanceOf(ThreefoldLogin);
    });

    it('should contain threeFoldAPIHost, appId, seedphrase and redirectUrl', () => {
        expect(login.threeFoldAPIHost).toBe(threeFoldAPIHost);
        expect(login.appId).toBe(appId);
        expect(login.seedPhrase).toBe(seedPhrase);
        expect(login.redirectUrl).toBe(redirectUrl);
        expect(login.kycBackendApiUrl).toBe(kycBackendUrl);
    });

    it('should return login url', () => {
        const loginUrl = login.generateLoginUrl(state);

        // @todo: add better test, parse url and check
        expect(typeof loginUrl).toBe('string');

        const url: URL = new URL(loginUrl);

        expect(url.host).toStrictEqual(rawHost);
        expect(url.protocol).toStrictEqual(protocol);

        const params = url.searchParams;

        expect(params.get('state')).toStrictEqual(state);
        expect(params.get('appid')).toStrictEqual(appId);
        expect(params.get('redirecturl')).toStrictEqual(redirectUrl);

        const keyPair: KeyPair = generateKeyPair(seedPhrase);
        const publickey = getEdPkInCurve(keyPair.publicKey);

        expect(params.get('publickey')).toStrictEqual(publickey);
    }, 1000);

    it('should return be able to add scope', async () => {
        const scope = JSON.stringify({ doubleName: true, email: false });
        const extraParams = {
            scope,
        };
        const loginUrl = await login.generateLoginUrl(state, extraParams);

        const url: URL = new URL(loginUrl);

        expect(url.host).toStrictEqual(rawHost);
        expect(url.protocol).toStrictEqual(protocol);

        const params = url.searchParams;

        expect(params.get('state')).toStrictEqual(state);
        expect(params.get('appid')).toStrictEqual(appId);
        expect(params.get('redirecturl')).toStrictEqual(redirectUrl);
        expect(params.get('scope')).toStrictEqual(scope);

        const keyPair: KeyPair = await generateKeyPair(seedPhrase);
        const publickey = getEdPkInCurve(keyPair.publicKey);

        expect(params.get('publickey')).toStrictEqual(publickey);

        expect(typeof loginUrl).toBe('string');
    }, 1000);

    /**
     * this test uses staging threefold api
     * @todo: make mock api to test this easier
     */
    it('should parse and validate the signedAttemptRedirectUrl', async () => {
        /**
     * test case
     * profile data = {
          "profile": {
            "email": {
              "email": "hd@jd.so",
              "sei": null
            }
          },
          randomRoom: 'df971cf0-0932-44ba-b5a9-c87cdd8e16bc',
          selectedImageId: 105,
        }
     */

        const Data = await login.parseAndValidateRedirectUrl(
            new URL(testRedirectUrl),
            testState
        );

        expect(Data).toStrictEqual({
            profile: {
                doubleName: 'ifr.3bot',
                email: {
                    email: 'hd@jd.so',
                    sei: null,
                },
            },
            randomRoom: 'df971cf0-0932-44ba-b5a9-c87cdd8e16bc',
            selectedImageId: 105,
        });
    }, 1000);

    it('should verify my signedEmailIdenfier', async () => {
        const emailData = await login.verifySignedEmailIdenfier(
            testSignedEmailIdentifier
        );
        expect(emailData).toStrictEqual({
            email: 'mathias.de.weerdt@gmail.com',
            identifier: 'taik.3bot',
        });
    }, 1000);

    it('should verify my signedPhoneIdenfier', async () => {
        const phoneData = await login.verifySignedPhoneIdenfier(
            testSignedPhoneIdentifier
        );
        expect(phoneData).toStrictEqual({
            phone: '+32494485740',
            identifier: 'hcbfhncdhkvd.3bot',
        });
    }, 1000);

    it('should check if email is verified', async () => {
      console.log(login.threeFoldAPIHost)
        const emailData = await login.isEmailVerified(
            testSignedEmailIdentifier
        );
      console.log(emailData)
        expect(emailData).toBe(true);
    }, 1000);

    it('should check if phone is verified', async () => {
        const phoneData = await login.isPhoneVerified(
            testSignedPhoneIdentifier
        );
        expect(phoneData).toBe(true);
    }, 1000);
});
