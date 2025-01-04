import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Components from "./pages/Components";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-xl font-bold">UI Studio</h1>
              <nav className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-gray-100 rounded-md">
                  Theme
                </button>
                <a
                  href="https://github.com/yourusername/repo"
                  target="_blank"
                  rel="noopener"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"></path>
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Content wrapper */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Fixed position */}
          <nav className="w-64 flex-shrink-0 bg-gray-100">
            <div className="h-full overflow-y-auto">
              <div className="p-4 space-y-2">
                <Button asChild variant="destructive">
                  <Link to="/">Components</Link>
                </Button>
              </div>
            </div>
          </nav>

          {/* Main content - Scrollable */}
          <main className="flex-1 overflow-y-auto bg-white">
            <div className="container mx-auto p-6">
              <Routes>
                <Route path="/" element={<Components />} />
                {/* <Route path="/layouts" element={<Layouts />} />
                <Route path="/settings" element={<Settings />} /> */}
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
