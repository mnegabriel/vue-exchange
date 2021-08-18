export const currencyBra =
    number => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number)

export const currencyUsd =
    number => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)

export const currencyEur =
    number => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(number)