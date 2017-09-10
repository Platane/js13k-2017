export const encode = (a: Uint8Array): string => a.toString()

export const decode = (s: string): Uint8Array =>
    new Uint8Array(s.split(',').map(x => +x))
