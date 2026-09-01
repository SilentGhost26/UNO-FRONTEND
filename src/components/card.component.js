const cardImages = import.meta.glob('../assets/cards/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
});

const numberNames = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const getCardImage = (card) => {
    if (!card) {
        return null;
    }

    if (card.type === '+4') {
        return cardImages['../assets/cards/+4.png'];
    }
    if (card.type === 'WILD') {
        return cardImages['../assets/cards/wild.png'];
    }

    const color = card.color?.toLowerCase();
    const value = card.type === 'NUMBER'
        ? numberNames[Number(card.value)]
        : card.type.toLowerCase();
    return cardImages[`../assets/cards/${color}_${value}.png`];
};

export const renderCard = (card, { playable = false, onClick } = {}) => {
    const image = getCardImage(card);
    const cardElement = document.createElement('button');
    cardElement.type = 'button';
    cardElement.classList.add('uno-card');
    cardElement.classList.toggle('uno-card-playable', playable);
    cardElement.disabled = !playable;
    cardElement.setAttribute('aria-label', `${card.color} ${card.value || card.type}`);

    if (image) {
        const imageElement = document.createElement('img');
        imageElement.src = image;
        imageElement.alt = `${card.color} ${card.value || card.type}`;
        cardElement.appendChild(imageElement);
    } else {
        cardElement.classList.add('uno-card-fallback');
        cardElement.textContent = card.value || card.type;
    }

    if (playable && onClick) {
        cardElement.addEventListener('click', () => onClick(card));
    }

    return cardElement;
};
