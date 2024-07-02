function isSmallScreen() {
    if (typeof window !== 'undefined') {
        return window.innerWidth < 978;
    }
    return false;
}

export const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: isSmallScreen() ? '10%' : 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        overflowY: 'auto',
        maxHeight: '600px',
        padding: '0',
        maxWidth: '90%'
    }

}