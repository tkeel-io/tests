import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    testTimeout: 2000,
    reporters: [
        'default',
        [
            'jest-junit',
            {
                suiteName: 'jest-junit-suite',
                output: './jest-junit.xml',
            }
        ],
    ],
};
export default config;
