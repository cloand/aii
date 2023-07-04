export const slug = (url: string) => {
    return url.replace(/ /g, '-').toLowerCase()
}

export const dSlugs = (url: string) => {
    return url.replace(/-/g, ' ');
}