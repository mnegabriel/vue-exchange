export const currencyBra =
    number => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number)

export const currencyUsd =
    number => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)

export const currencyEur =
    number => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(number)

export const maskToFloat = () => {
    const numberRegex = {
        notNumber: {
            rgx: /[^\d\.]/g,
            replacer: ''
        },
        floatingNumber: {
            rgx: /(.*\..*)(\.)/g,
            replacer: '$1'
        },
        removeZeros: {
            rgx: /^0*/g,
            replacer: ''
        },
        decimal: {
            rgx: /(.*\..{0,2}).*/g,
            replacer: '$1'
        }
    }

    const regexValues = Object.values(numberRegex)

    const runTest = string => regexValues.some(({ rgx }) => rgx.test(string))

    const runMask = string => {
        regexValues.forEach(({ rgx, replacer }) => {
            string = string.replace(rgx, replacer)
        })

        return string
    }

    return [runTest, runMask]
}