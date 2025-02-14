class ConfigHelper {
    runWithoutDocker: boolean = Boolean(process.env.WITHOUT_DOCKER) || true;
}

export const configHelper = new ConfigHelper();
