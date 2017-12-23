import { config as googleCloudPlatform } from './googleCloudPlatform'

const ENV =
    process.env.ENV ||
    (process.env.NODE_ENV === 'TEST' && 'test') ||
    (process.env.NODE_ENV === 'PRODUCTION' && 'production') ||
    'dev'

export const config = {
    ENV,
    googleCloudPlatform,
    secret:
        (ENV === 'test' && 'zS6wg3ybTJYsItL/i1RBt7RYBYh/BR05vxM7WDuvaGA=') ||
        process.env.SECRET,
    publishBucketName:
        'platane-imagedot-result' + (ENV === 'production' ? '' : '-' + ENV),
}
