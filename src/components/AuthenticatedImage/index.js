import { useEffect, useState } from "react";
import { getDocumentoImagem } from "../../services/clientService";

// <img src> não manda o header de Authorization, e os documentos de identidade
// dos clientes agora só são servidos por rotas autenticadas (nunca mais como
// URL pública direta) - então toda imagem sensível do sistema passa por aqui,
// reaproveitando getDocumentoImagem (já existente) pra virar um blob local.
export function AuthenticatedImage({ clientId, tipo, style, className, openOnClick }) {
    const [blobUrl, setBlobUrl] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        let objectUrl;
        let cancelled = false;
        setError(false);
        setBlobUrl(null);

        if (!clientId) return;

        getDocumentoImagem(clientId, tipo).then((url) => {
            if (cancelled) return;
            if (!url) {
                setError(true);
                return;
            }
            objectUrl = url;
            setBlobUrl(url);
        });

        return () => {
            cancelled = true;
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [clientId, tipo]);

    if (error) {
        return <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>Erro ao carregar imagem</div>;
    }

    if (!blobUrl) {
        return <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>Carregando...</div>;
    }

    return (
        <img
            src={blobUrl}
            alt={`Documento (${tipo})`}
            style={{ ...style, cursor: openOnClick ? 'zoom-in' : undefined }}
            className={className}
            onClick={openOnClick ? () => window.open(blobUrl, '_blank', 'noopener,noreferrer') : undefined}
        />
    );
}
