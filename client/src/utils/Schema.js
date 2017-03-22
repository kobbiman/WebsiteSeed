export default function Schema(userSchema) {
    let schema = {};
    const getPlainSchema = () => Object.keys(schema).map(schemaKey => schema[schemaKey]);
    const setListeners = listeners => Object.keys(listeners).forEach(field => {
        schema[field].onChange = listeners[field];
    });
    const setFields = fieldsData => Object.keys(fieldsData).forEach(field => {
        schema[field][fieldsData[field].prop] = fieldsData[field].value;
    });

    schema = userSchema;

    return {
        getPlainSchema,
        setFields,
        setListeners,
    }
}