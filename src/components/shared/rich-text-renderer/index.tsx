import React, { JSX } from "react";

interface RichTextRendererProps {
  content: any[];
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({
  content = [],
}) => {
  const renderChildren = (children: any[]) =>
    children.map((child, idx) => {
      let textElement: JSX.Element = <>{child.text}</>;

      if (child.bold) textElement = <b key={idx}>{textElement}</b>;
      if (child.italic) textElement = <i key={idx}>{textElement}</i>;
      if (child.underline) textElement = <u key={idx}>{textElement}</u>;
      if (child.strikethrough) textElement = <s key={idx}>{textElement}</s>;
      if (child.code) textElement = <code key={idx}>{textElement}</code>;

      return textElement;
    });

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p
            key={index}
            style={{ textAlign: block.align || "left", marginBottom: "1em" }}
          >
            {renderChildren(block.children)}
          </p>
        );

      case "heading":
        const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index}>{renderChildren(block.children)}</HeadingTag>
        );

      case "list":
        const ListTag = block.style === "number" ? "ol" : "ul";
        return (
          <ListTag key={index}>
            {block.children.map((li: any, liIdx: number) => (
              <li key={liIdx}>{renderChildren(li.children)}</li>
            ))}
          </ListTag>
        );

      case "blockquote":
        return (
          <blockquote key={index} style={{ fontStyle: "italic" }}>
            {renderChildren(block.children)}
          </blockquote>
        );

      case "code-block":
        return (
          <pre key={index}>
            <code>{renderChildren(block.children)}</code>
          </pre>
        );

      default:
        return null;
    }
  };

  return <>{content.map((block, index) => renderBlock(block, index))}</>;
};

export default RichTextRenderer;
