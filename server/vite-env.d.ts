declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MAIN_PORT: number;
            DEV_FRONT_PORT: number
        }
    }
}

export {};
