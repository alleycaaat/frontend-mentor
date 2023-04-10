const getFaunaId = (comment) => {
    if (comment.ref === undefined) {
        console.log('ID not retrieved');
        return null;
    }
    return comment.ref['@ref'].id;
};

export default getFaunaId;