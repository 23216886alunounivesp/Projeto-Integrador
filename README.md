Ok, vamos criar um README.md para o seu projeto Pilates PWA, detalhando o que foi feito e como configurar o ambiente para outros desenvolvedores.

**Nome do Projeto:** Pilates PWA

**Descrição:** Este é um aplicativo web progressivo (PWA) para gerenciamento de aulas de Pilates. Ele foi desenvolvido usando React, Vite e `vite-plugin-pwa` para fornecer uma experiência de usuário rápida, responsiva e offline-first.

**Tabela de Conteúdo:**

1.  [Visão Geral](#visão-geral)
2.  [Tecnologias Utilizadas](#tecnologias-utilizadas)
3.  [Pré-requisitos](#pré-requisitos)
4.  [Configuração do Ambiente](#configuração-do-ambiente)
5.  [Executando o Projeto](#executando-o-projeto)
6.  [Configuração do PWA](#configuração-do-pwa)
7.  [Estrutura do Projeto](#estrutura-do-projeto)
8.  [Deployment](#deployment)
9.  [Contribuição](#contribuição)
10. [Licença](#licença)

**1. Visão Geral**

O Pilates PWA é um aplicativo web projetado para facilitar o gerenciamento de aulas de Pilates. Ele oferece uma interface intuitiva e recursos para agendar aulas, gerenciar alunos e acompanhar o progresso dos alunos.

**2. Tecnologias Utilizadas**

Este projeto foi construído usando as seguintes tecnologias:

*   **React:** Uma biblioteca JavaScript para construir interfaces de usuário.
*   **Vite:** Um bundler de desenvolvimento rápido e eficiente para aplicativos web modernos.
*   **`vite-plugin-pwa`:** Um plugin Vite para gerar automaticamente arquivos Service Worker e manifest para PWAs.
*   **JavaScript:** A linguagem de programação principal do aplicativo.
*   **CSS:** Para estilização e layout.
*   **Git:** Para versionamento de código.
*   **GitHub:** Para hospedagem do repositório e colaboração.

**3. Pré-requisitos**

Antes de começar, você precisará ter as seguintes ferramentas instaladas em seu sistema:

*   **Node.js:** (versão LTS mais recente - 20.x) - [https://nodejs.org/](https://nodejs.org/)
*   **npm:** (geralmente instalado com Node.js)
*   **Git:** [https://git-scm.com/](https://git-scm.com/)
*   **Visual Studio Code (Opcional, mas recomendado):** [https://code.visualstudio.com/](https://code.visualstudio.com/)
*   **WSL2 (Windows Subsystem for Linux) (Se estiver usando Windows)**

**4. Configuração do Ambiente**

1.  **Clone o Repositório:**

    *   Clone o repositório para o seu sistema local:

        ```bash
        git clone git@github.com:23216886alunounivesp/Projeto-Integrador.git
        ```

2.  **Navegue até o Diretório do Projeto:**

    *   Use o comando `cd` para navegar até o diretório do projeto:

        ```bash
        cd Pilates-PWA
        ```

3.  **Instale as Dependências:**

    *   Execute o seguinte comando para instalar as dependências do projeto:

        ```bash
        npm install
        ```

**5. Executando o Projeto**

Para executar o projeto em modo de desenvolvimento, siga estes passos:

1.  **Inicie o Servidor de Desenvolvimento:**

    *   Execute o seguinte comando:

        ```bash
        npm run dev
        ```

    *   Isso iniciará o servidor de desenvolvimento do Vite e abrirá o aplicativo no seu navegador padrão (geralmente em `http://localhost:5173/`).

Para criar uma versão de produção do projeto, siga estes passos:

1.  **Construa o Projeto:**

    *   Execute o seguinte comando:

        ```bash
        npm run build
        ```

    *   Isso irá gerar os arquivos estáticos do seu aplicativo na pasta `dist/`.

2.  **Sirva o Projeto Compilado:**

    *   Instale o `serve` globalmente (se ainda não tiver):

        ```bash
        npm install -g serve
        ```

    *   Navegue até a pasta `dist/`:

        ```bash
        cd dist
        ```

    *   Execute o seguinte comando para servir os arquivos estáticos:

        ```bash
        serve -s .
        ```

    *   Isso iniciará um servidor estático e exibirá o aplicativo no seu navegador (geralmente em `http://localhost:5000/`).

**6. Configuração do PWA**

Este projeto foi configurado como um PWA usando o `vite-plugin-pwa`. O plugin gera automaticamente os arquivos `sw.js` (Service Worker) e `manifest.webmanifest` necessários para o PWA.

Para verificar se o PWA está configurado corretamente, siga estes passos:

1.  **Abra o Aplicativo no Navegador:**

    *   Acesse o aplicativo no seu navegador (usando o endereço fornecido pelo `serve`).

2.  **Abra as Ferramentas de Desenvolvedor:**

    *   Pressione a tecla `F12` no seu teclado para abrir as ferramentas de desenvolvedor.

3.  **Vá para a Aba "Application" (ou "Aplication"):**

    *   Procure pela aba chamada "Application" (ou "Aplication") e clique nela.

4.  **Verifique o Service Worker:**

    *   Na barra lateral esquerda, clique em "Service Workers".
    *   Certifique-se de que o Service Worker está listado e com o status "activated" ou "running".

5.  **Verifique o Manifest:**

    *   Na barra lateral esquerda, clique em "Manifest".
    *   Verifique se as informações do `manifest.webmanifest` (nome, ícones, etc.) estão sendo exibidas corretamente.

6.  **Teste o Funcionamento Offline:**

    *   Na aba "Application", na seção "Service Workers", marque a caixa "Offline".
    *   Atualize a página. O aplicativo deverá continuar funcionando (pelo menos parcialmente).

**7. Estrutura do Projeto**

A estrutura de arquivos e diretórios do projeto é a seguinte:

```
pilates-pwa/
├── public/
│   ├── pwa-192x192.png         (Ícone PWA)
│   ├── pwa-512x512.png         (Ícone PWA)
│   ├── vite.svg               (Ícone Vite)
│   └── favicon.ico
├── src/
│   ├── App.jsx              (Componente principal da aplicação)
│   ├── main.jsx             (Ponto de entrada da aplicação)
│   ├── index.css            (Estilos globais)
│   └── assets/            (Assets da aplicação)
│       └── react.svg
├── vite.config.js           (Configuração do Vite)
├── package.json             (Metadados e dependências do projeto)
├── package-lock.json
└── README.md                (Documentação do projeto)
```

**8. Deployment**

Para fazer o deployment do seu PWA, você pode usar um serviço de hospedagem estática como:

*   **Netlify:** [https://www.netlify.com/](https://www.netlify.com/)
*   **Vercel:** [https://vercel.com/](https://vercel.com/)
*   **GitHub Pages:** [https://pages.github.com/](https://pages.github.com/)

Siga as instruções do serviço de hospedagem escolhido para fazer o deployment do seu aplicativo.

**9. Contribuição**

Se você quiser contribuir com este projeto, siga estes passos:

1.  Faça um fork do repositório.
2.  Crie uma branch para a sua contribuição: `git checkout -b feature/nova-funcionalidade`.
3.  Faça suas alterações e commit: `git commit -m "Adiciona nova funcionalidade"`.
4.  Envie a branch para o seu fork: `git push origin feature/nova-funcionalidade`.
5.  Crie um pull request.

**10. Licença**

Este projeto está licenciado sob a licença MIT.

---





# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
