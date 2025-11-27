"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { SimpleMDEReactProps } from "react-simplemde-editor";
// @ts-ignore - CSS import
import "easymde/dist/easymde.min.css";

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-64 border border-gray-300 rounded-md bg-gray-50 flex items-center justify-center">
            <span className="text-gray-500">Loading editor...</span>
        </div>
    ),
});

type MarkdownEditorProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
    const options = useMemo<SimpleMDEReactProps["options"]>(
        () => ({
            autofocus: false,
            spellChecker: false,
            placeholder: placeholder || "Write your blog content here using Markdown...",
            status: ["lines", "words", "cursor"],
            toolbar: ["bold", "italic", "strikethrough", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "code", "horizontal-rule", "|", "preview", "side-by-side", "fullscreen", "|", "guide"],
            minHeight: "300px",
            maxHeight: "500px",
            previewClass: ["prose", "max-w-none", "p-4"],
        }),
        [placeholder]
    );

    return (
        <div className="markdown-editor-wrapper">
            <SimpleMDE value={value} onChange={onChange} options={options} />
            <style jsx global>{`
                .markdown-editor-wrapper .EasyMDEContainer {
                    border-radius: 0.375rem;
                }
                .markdown-editor-wrapper .EasyMDEContainer .CodeMirror {
                    border-radius: 0 0 0.375rem 0.375rem;
                    border-color: #d1d5db;
                    background: #fff;
                }
                .markdown-editor-wrapper .EasyMDEContainer .editor-toolbar {
                    border-color: #d1d5db;
                    border-radius: 0.375rem 0.375rem 0 0;
                    background: #f9fafb;
                }
                .markdown-editor-wrapper .EasyMDEContainer .CodeMirror-focused {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 1px #3b82f6;
                }
                .markdown-editor-wrapper .editor-toolbar button:hover,
                .markdown-editor-wrapper .editor-toolbar button.active {
                    background: #e5e7eb;
                    border-color: #d1d5db;
                }

                /* Preview mode - completely replace editor with preview */
                .markdown-editor-wrapper .EasyMDEContainer .editor-preview {
                    display: none;
                    position: static !important;
                    background: #fff;
                    border: 1px solid #d1d5db;
                    border-top: none;
                    border-radius: 0 0 0.375rem 0.375rem;
                    padding: 1rem;
                    min-height: 300px;
                    max-height: 500px;
                    overflow-y: auto;
                }

                .markdown-editor-wrapper .EasyMDEContainer .editor-preview.editor-preview-active {
                    display: block !important;
                }

                .markdown-editor-wrapper .EasyMDEContainer .editor-preview-active-side .editor-preview {
                    display: none !important;
                }

                /* Hide CodeMirror when preview is active (not side-by-side) */
                .markdown-editor-wrapper .EasyMDEContainer.editor-preview-active:not(.editor-preview-active-side) .CodeMirror {
                    display: none !important;
                }

                /* Side-by-side mode */
                .markdown-editor-wrapper .EasyMDEContainer.editor-preview-active-side {
                    display: flex;
                    flex-wrap: wrap;
                }

                .markdown-editor-wrapper .EasyMDEContainer.editor-preview-active-side .editor-toolbar {
                    width: 100%;
                    flex-shrink: 0;
                }

                .markdown-editor-wrapper .EasyMDEContainer.editor-preview-active-side .CodeMirror {
                    display: block !important;
                    width: 50% !important;
                    border-right: none;
                    border-radius: 0 0 0 0.375rem;
                }

                .markdown-editor-wrapper .EasyMDEContainer.editor-preview-active-side .editor-preview-side {
                    display: block !important;
                    position: static !important;
                    width: 50% !important;
                    height: auto;
                    min-height: 300px;
                    max-height: 500px;
                    background: #fff;
                    border: 1px solid #d1d5db;
                    border-left: none;
                    border-radius: 0 0 0.375rem 0;
                    padding: 1rem;
                    overflow-y: auto;
                }

                /* Fullscreen fixes */
                .markdown-editor-wrapper .EasyMDEContainer.editor-fullscreen {
                    z-index: 9999;
                    position: fixed !important;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                }

                .markdown-editor-wrapper .EasyMDEContainer.editor-fullscreen .CodeMirror {
                    max-height: none !important;
                    height: calc(100vh - 50px) !important;
                }

                .markdown-editor-wrapper .EasyMDEContainer.editor-fullscreen .editor-preview {
                    max-height: none;
                    height: calc(100vh - 50px);
                }

                .markdown-editor-wrapper .EasyMDEContainer.editor-fullscreen.editor-preview-active-side .editor-preview-side {
                    max-height: none;
                    height: calc(100vh - 50px);
                }

                /* Preview content styling */
                .markdown-editor-wrapper .editor-preview ul,
                .markdown-editor-wrapper .editor-preview-side ul {
                    list-style-type: disc;
                    padding-left: 2em;
                    margin: 1em 0;
                }

                .markdown-editor-wrapper .editor-preview ol,
                .markdown-editor-wrapper .editor-preview-side ol {
                    list-style-type: decimal;
                    padding-left: 2em;
                    margin: 1em 0;
                }

                .markdown-editor-wrapper .editor-preview li,
                .markdown-editor-wrapper .editor-preview-side li {
                    margin-bottom: 0.5em;
                }
            `}</style>
        </div>
    );
}
