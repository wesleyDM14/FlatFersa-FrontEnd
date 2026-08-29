import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
    PaginationContainer,
    PaginationButton,
    PaginationEllipsis,
} from './styles';

// Gera uma janela de páginas (primeira, última, atual +-1) com "..." nos espaços pulados,
// para não renderizar um botão por página (estourava a largura da tela em listas longas).
function buildPageWindow(totalPages, currentPage) {
    const pages = [];
    const window = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);

    for (let page = 1; page <= totalPages; page++) {
        if (window.has(page)) pages.push(page);
    }

    const withEllipsis = [];
    let previous = 0;
    for (const page of pages) {
        if (page - previous > 1) withEllipsis.push('...');
        withEllipsis.push(page);
        previous = page;
    }
    return withEllipsis;
}

const Pagination = ({ totalPages, currentPage, setPage }) => {
    if (!totalPages || totalPages <= 1) return null;

    const items = buildPageWindow(totalPages, currentPage);

    return (
        <PaginationContainer>
            <PaginationButton
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Página anterior"
            >
                <FaChevronLeft size={11} />
            </PaginationButton>

            {items.map((item, index) => (
                item === '...' ? (
                    <PaginationEllipsis key={`ellipsis-${index}`}>...</PaginationEllipsis>
                ) : (
                    <PaginationButton
                        key={item}
                        className={currentPage === item ? 'active' : ''}
                        onClick={() => setPage(item)}
                        disabled={currentPage === item}
                    >
                        {item}
                    </PaginationButton>
                )
            ))}

            <PaginationButton
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Próxima página"
            >
                <FaChevronRight size={11} />
            </PaginationButton>
        </PaginationContainer>
    );
};

export default Pagination;
