'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className = '',
}: MarkdownRendererProps) {
  const components: Components = {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl font-playfair text-forest-dark mb-6 mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-playfair text-forest-dark mb-5 mt-7">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-cormorant text-forest-green mb-4 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-cormorant text-forest-green mb-3 mt-5">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg md:text-xl font-montserrat font-semibold text-pine mb-3 mt-4">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base md:text-lg font-montserrat font-semibold text-pine mb-2 mt-3">
        {children}
      </h6>
    ),

    // Paragraphs
    p: ({ children }) => (
      <p className="text-base md:text-lg text-dark leading-relaxed mb-4">
        {children}
      </p>
    ),

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-forest-green hover:text-forest-dark underline decoration-sage decoration-2 underline-offset-2 transition-colors duration-200"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="list-none space-y-2 mb-4 ml-4">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 ml-4 marker:text-forest-green marker:font-semibold">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-base md:text-lg text-dark leading-relaxed relative pl-6 before:content-['🌿'] before:absolute before:left-0 before:text-forest-light">
        {children}
      </li>
    ),

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-forest-green bg-mist pl-6 pr-4 py-4 my-6 italic">
        <div className="text-pine font-cormorant text-lg md:text-xl">
          {children}
        </div>
      </blockquote>
    ),

    // Code blocks
    code: ({ className, children, ...props }: any) => {
      const inline = !className;
      if (inline) {
        return (
          <code className="bg-mist text-pine px-2 py-1 rounded text-sm font-mono border border-sage">
            {children}
          </code>
        );
      }
      return (
        <code
          className={`block bg-forest-dark text-cream p-4 rounded-lg overflow-x-auto my-4 font-mono text-sm ${
            className || ''
          }`}
        >
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="overflow-x-auto my-4">{children}</pre>
    ),

    // Horizontal rule
    hr: () => (
      <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-sage to-transparent" />
    ),

    // Strong/Bold
    strong: ({ children }) => (
      <strong className="font-semibold text-forest-dark">{children}</strong>
    ),

    // Emphasis/Italic
    em: ({ children }) => (
      <em className="italic text-pine font-cormorant">{children}</em>
    ),

    // Tables
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-sage">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-forest-green text-cream">{children}</thead>
    ),
    tbody: ({ children }) => <tbody className="bg-white">{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-sage hover:bg-mist transition-colors group">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left font-semibold text-sm md:text-base group-hover:text-forest-dark group-hover:bg-forest-light transition-colors">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm md:text-base text-dark">{children}</td>
    ),

    // Images
    img: ({ src, alt }) => (
      <span className="block my-6">
        <img
          src={src}
          alt={alt || ''}
          className="rounded-lg shadow-lg max-w-full h-auto border-2 border-mist"
        />
        {alt && (
          <span className="block text-sm text-pine text-center mt-2 italic">
            {alt}
          </span>
        )}
      </span>
    ),
  };

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
