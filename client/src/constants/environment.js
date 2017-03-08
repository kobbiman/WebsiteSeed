const environment = {
    current: 'dev',
    environments: {
        api: {
            dev: 'http://localhost:3000/api'
        }
    },
    endpoints: {
        login: '/Users/login',
        configurations: '/Configurations',
        menus: '/Menus',
        menuLinks: '/MenuLinks'
    }
}

export default environment;