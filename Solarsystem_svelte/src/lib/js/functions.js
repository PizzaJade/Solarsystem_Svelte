function getQueryValue(url) {
    if (!url) throw new Error('No URL provided');

    const regex = /[?&]query=([^&]+)/;
    const matches = url.match(regex);

    if (!matches) return;

    const queryValue = decodeURIComponent(matches[1]);
    return queryValue;
}

export { getQueryValue };