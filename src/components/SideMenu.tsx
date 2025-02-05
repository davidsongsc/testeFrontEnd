// SideMenu.tsx
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
    SearchOutlined,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const { Sider } = Layout;

interface SideMenuProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
    onSearchChange: (value: string) => void;
}

/**
 * Componente de menu lateral que oferece navegação e funcionalidades
 * de pesquisa. Exibe diferentes opções de menu com base no estado
 * de autenticação do usuário.
 *
 * @param collapsed - Indica se o menu lateral está colapsado.
 * @param onCollapse - Função que é chamada ao colapsar ou expandir o menu.
 * @param onSearchChange - Função que é chamada ao confirmar uma pesquisa.
 *
 * @returns Um elemento JSX que representa o menu lateral com opções
 * de navegação e um campo de pesquisa.
 */
const SideMenu: React.FC<SideMenuProps> = ({
    collapsed,
    onCollapse,
    onSearchChange,
}) => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const [localSearchTerm, setLocalSearchTerm] = useState("");

    
    /**
     * Confirma a pesquisa e chama a função onSearchChange com o valor
     * atual do estado localSearchTerm.
     */
    const confirmSearch = () => {
        onSearchChange(localSearchTerm);
    };

    // Definição dos itens do menu com comportamento condicional para o primeiro item:
    // Se o usuário estiver logado, mostra "Sair" (logout); caso contrário, mostra "Login".
    const menuItems = [
        isAuthenticated
            ? {
                key: "1",
                icon: <LogoutOutlined />,
                label: "Sair",
                onClick: () => logout(),
            }
            : {
                key: "1",
                icon: <UserOutlined />,
                label: "Login",
                onClick: () => navigate("/login"),
            },
        {
            key: "2",
            icon: <SearchOutlined />,
            label: "Listagem",
            onClick: () => navigate("/listagem"),
        },
        {
            key: "3",
            icon: <UserOutlined />,
            label: "Single Github",
            onClick: () => {
                const lastProfile = localStorage.getItem("lastProfile");
                if (lastProfile) {
                    const { login } = JSON.parse(lastProfile);
                    navigate(`/perfil/${login}`);
                } else {
                    navigate("/listagem");
                }
            },
        },
    ];

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            width={250}         // Largura quando expandido
            collapsedWidth={80} // Largura quando recolhido
            className="h-full"
        >
            {/* Container de pesquisa: o input sempre aparece ou, se não autenticado, um placeholder é renderizado para manter o espaçamento */}
            <div className="p-2 flex space-x-1">
                {isAuthenticated ? (
                    <>
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            value={localSearchTerm}
                            onChange={(e) => setLocalSearchTerm(e.target.value)}
                            onFocus={() => {
                                if (collapsed) {
                                    onCollapse(false);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") confirmSearch();
                            }}
                            style={{ width: collapsed ? "calc(100% - 16px)" : "100%" }}
                            className="p-1 rounded border"
                        />
                        {!collapsed && (
                            <button
                                onClick={confirmSearch}
                                className="p-1 bg-blue-500 text-white rounded"
                            >
                                Buscar
                            </button>
                        )}
                    </>
                ) : (
                    // Placeholder para manter o espaçamento (mesma altura que o input e o botão juntos)
                    <div className="w-full h-10" />
                )}
            </div>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={menuItems}
            />
        </Sider>
    );
};

export default SideMenu;
