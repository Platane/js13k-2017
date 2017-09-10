export const config = {};

try {
    const credentials = JSON.parse(process.env.GC_JSON_KEY_FILE || '');

    config.client_email = credentials.client_email;
    config.private_key = credentials.private_key;
    config.project_id = credentials.project_id;
} catch (err) {}
