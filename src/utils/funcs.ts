
export const funcs = (() => {

    function getNameType() {

    }

    function getUID(): string {
        return new Date().getTime().toString(16);
    }

    const publicApi = { getNameType, getUID};
    return publicApi;
})();