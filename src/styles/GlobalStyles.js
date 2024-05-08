import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    ::-webkit-scrollbar {
        width: 5px;
        height: 6px;
    }

    ::-webkit-scrollbar-track{
        box-shadow: inset 0 0 5px #a5aaad;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb{
        background: #3ea175;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #a5aaad;
    }

    * {
        margin: 0;
        padding: 0;
    }

    body {
        box-sizing: border-box;
        font-family: 'Lato', sans-serif;
        background: ${props => props.theme.colors.light};
    }

    .container {
        display: grid;
        height: 100vh;
        grid-template-columns: 0.8fr repeat(3, 1fr);
        grid-template-rows: 0.2fr 3fr;
        grid-template-areas: 
        'sidebar nav nav nav'
        'sidebar main main main';
    }

    #sidebar {
        background: #020509;
        grid-area: sidebar;
        overflow-y: auto;
        padding: 20px;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
    }

    .active_menu_link {
        background: rgba(62, 161, 171, 0.3);
        color: #3ea175;
    }

    .active_menu_link > a{
        color: #3ea175 !important;
    }

    .sidebar-responsive {
        display: inline !important;
        z-index: 9999 !important;
        left: 0 !important;
        position: absolute;
        height: 100vh;
    }

    .icon-responsive{
        margin-right: 50px;
    }

    .icon-add-button{
        margin-right: 5px;
    }

    .active-menu-item {
        background-color: rgba(62, 161, 117, 0.3);
        border-radius: 3px;
    }

    .react-datepicker__input-container>input {
        width: 100%;
        background-color: #fff;
        border-color: #dbdbdb;
        border-radius: 4px;
        color: #363636;
        align-items: center;
        border: 1px solid #0a0a0a0d;
        display: inline-flex;
        font-size: 1rem;
        height: 2.5em;
        justify-content: flex-start;
        padding-bottom: calc(.5em - 1px);
        padding-left: calc(.75em - 1px);
        padding-right: calc(.75em - 1px);
        padding-top: calc(.5em - 1px);
        line-height: 1.5;
    }

    .react-datepicker-wrapper{
        max-width: 100%;
        width: 90%;
        background-color: #fff;
        border-color: #dbdbdb;
        border-radius: 4px;
        color: #363636;
        align-items: center;
        border: 1px solid #0a0a0a0d;
        display: flex;
        font-size: 1rem;
        height: 2.5em;
        justify-content: flex-start;
        padding-bottom: calc(.5em - 1px);
        padding-top: calc(.5em - 1px);
        line-height: 1.5;
    }

    ::-webkit-datetime-edit { 
        padding: 1em; 
    }

    ::-webkit-datetime-edit-text { 
        padding: 0 0.3em;
    }

    @media only screen and (max-width: 978px){
        #sidebar {
            display: none;
        }
        .container{
            grid-template-columns: 1fr;
            grid-template-rows: 0.2fr 3fr;
            grid-template-areas: 'nav' 'main';
        }
        .icon-responsive{
            font-size: 90px;
        }
    }
`;

export default GlobalStyle;