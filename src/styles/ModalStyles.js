function isSmallScreen() {
    if (typeof window !== 'undefined') {
        return window.innerWidth < 978;
    }
    return false;
}

export const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(2px)',
        zIndex: 1000,
    },
    content: {
        top: '50%',
        left: '50%',
        right: isSmallScreen() ? '10%' : 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        overflowY: 'auto',
        maxHeight: '85vh',
        padding: '28px 32px',
        maxWidth: '90%',
        border: 'none',
        borderRadius: '14px',
        boxShadow: '0 20px 60px rgba(15, 23, 42, 0.3)',
    }

}