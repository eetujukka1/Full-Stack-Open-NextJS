import type { ReactNode } from "react";

interface PageTitleProps {
    children: ReactNode
}

const PageTitle = ({ children }: PageTitleProps) => (
    <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-900">
        {children}
    </h2>
)

export default PageTitle
