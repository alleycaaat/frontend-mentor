const AdjustScore = (comments, id, direction) => {
    let change = direction;
    const scoreComments = [...comments];
    const scoreId = scoreComments.findIndex(
        (comment) => comment.id === id
    );
    const updateScore = scoreComments[scoreId];
    const updatedScore = change === 'minus'
        ? updateScore.score - 1
        : updateScore.score + 1;
    const fullUpdate = { ...updateScore, score: updatedScore };
    scoreComments[scoreId] = fullUpdate;

    return fullUpdate;
};

export default AdjustScore;