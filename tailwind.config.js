/** @type {import('tailwindcss').Config} */

    const plugin = require('tailwindcss/plugin')

module.exports = {
    content: ["./src/**/*.{html,js}",".src/*.{html,js}"],
    theme: {
        extend: {},
    },
    plugins: [
        plugin(function({ addComponents }) {
            addComponents({
                '.btn-blue': {
                    backgroundColor: '#3490dc',
                    color: '#fff',
                    border:'solid',
                    borderColor:"black",
                    '&:hover': {
                        backgroundColor: '#2779bd'
                    },
                },
            })
        })
    ]
}

