import React from 'react';
import { RowContainer, IconBox, TextColumn, PrimaryText, SecondaryText, TrailingArea, ActionsArea, StatusPill, ListSection } from './styles';

// Um cartão de linha de lista "app-like" (ícone + título + subtítulo + status + ações),
// reaproveitado pelas telas de Prédios, Apartamentos, Clientes, Contratos e Financeiro
// no lugar da tabela antiga (que ficava com cara de planilha).
export function ListRow({ icon, iconColor, title, subtitle, statusLabel, statusColor, statusBg, trailing, actions, onClick }) {
    return (
        <RowContainer onClick={onClick} $clickable={!!onClick}>
            {icon ? <IconBox $color={iconColor}>{icon}</IconBox> : null}
            <TextColumn>
                <PrimaryText>{title}</PrimaryText>
                {subtitle ? <SecondaryText>{subtitle}</SecondaryText> : null}
            </TextColumn>
            <TrailingArea>
                {statusLabel ? <StatusPill $color={statusColor} $bg={statusBg}>{statusLabel}</StatusPill> : null}
                {trailing}
            </TrailingArea>
            {actions ? (
                <ActionsArea onClick={(e) => e.stopPropagation()}>{actions}</ActionsArea>
            ) : null}
        </RowContainer>
    );
}

export { ListSection };
export { StatusPill };
