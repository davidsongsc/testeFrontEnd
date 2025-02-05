import React from "react";
import { MenuOutlined } from "@ant-design/icons";

/**
 * Componente de cabeçalho da aplicação.
 *
 * Renderiza um elemento de cabeçalho com um ícone de menu e um título.
 *
 * @returns Um elemento JSX que representa o cabeçalho.
 */
const Header: React.FC = () => {
  return (
    <header className="bg-white text-black p-4 flex items-center">
      <MenuOutlined className="mr-4 text-2xl" />
      <h1 className="text-xl font-bold">Dashboard</h1>
    </header>
  );
};

export default React.memo(Header);
