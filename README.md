# OpenConsole Dashboard

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)

**OpenConsole** is a next-generation enterprise cloud management platform. It unifies AWS, Google Cloud, and Azure into a single, high-performance interface, featuring a visual workflow builder, AI-driven cost optimization, and real-time security monitoring.

## Key Features

- **Unified Cloud Context**: Seamlessly switch between AWS, GCP, and Azure environments using the global provider switcher.
- **Visual Automation Builder**: Drag-and-drop workflow editor (`WorkflowCanvas`) to create, schedule, and execute DevOps tasks.
- **Advanced Monitoring**: Real-time metrics visualization with interactive charts for compute, storage, and network resources.
- **Cost Intelligence**: Detailed breakdown of cloud spending with budget alerts and optimization recommendations.
- **Security Hub**: Centralized security compliance tracking, audit logs, and role-based access control (RBAC).
- **Premium UI/UX**:
  - **Shadcn UI**: Accessible, enterprise-grade component primitives.
  - **Magic UI**: High-end visual effects (Border Beams, Text Reveals).
  - **Framer Motion**: Smooth page transitions and micro-interactions.
- **Fully Responsive**: Optimized layouts for desktop, tablet, and mobile devices.

## Tech Stack

- **Core**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Libraries**:
  - [Shadcn UI](https://ui.shadcn.com/) (Base components)
  - [Magic UI](https://magicui.design/) (Visual effects)
  - [Framer Motion](https://www.framer.com/motion/) (Animations)
- **State Management**: Zustand / Context API (Provider Stores)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/OmAmberkar/openconsole-landing-page-v1.0.git
    cd openconsole-landing-page-v1.0
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    ```

4.  **Access the App**
    Open [http://localhost:5173](http://localhost:5173) to view the dashboard.

## Project Structure

```bash
src/
├── assets/
├── components/
│   ├── customeCursor/
│   └── ui/
├── hooks/
├── lib/
└── test/
```

# Available Scripts

| Scripts                  | Description                             |
| ------------------------ | --------------------------------------- |
| `bash npm run dev `      | Starts the development server with HMR. |
| `bash npm run build `    | Builds the application for production.  |
| `bash npm run lint `     | Runs ESLint to check code quality.      |
| `bash npm run lint:fix ` | Automatically fixes linting errors.     |
| `bash npm run format `   | Formats code using Prettier.            |
| `bash npm run preview `  | Previews the production build locally.  |

# Theming & Customization

The dashboard supports detailed theming via Tailwind CSS variables.

- **Global Styles :** `src/index.css`
- **Animation Config :** `tailwind.config.js`

## Contributing

We welcome contributions!

## License

Distributed under the MIT License.
