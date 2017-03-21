export default function Schema(userSchema) {
    let schema = {};
    const getSchema = () => Object.keys(schema).map(schemaKey => schema[schemaKey]);
    const setListeners = listeners => listeners.forEach(listener => {
        schema[listener.field].onChange = listener.handler;
    });

    schema = userSchema;

    return {
        getSchema,
        setListeners
    }
}