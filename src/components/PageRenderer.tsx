import Image from "next/image";
import type { RichBlock } from "@/types/content";

export function PageRenderer({ blocks }: { blocks: RichBlock[] }) {
  return (
    <div className="page-body">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const Heading = block.level === 2 ? "h2" : "h3";
            return <Heading key={`${block.text}-${index}`}>{block.text}</Heading>;
          }
          case "paragraph":
            return <p key={`${block.text}-${index}`}>{block.text}</p>;
          case "list":
            return (
              <ul key={`list-${index}`}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "image":
            return (
              <figure key={`${block.url}-${index}`} className="content-image">
                <Image src={block.url} alt={block.alt} width={1024} height={683} />
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            );
          case "html":
            return <div key={`html-${index}`} dangerouslySetInnerHTML={{ __html: block.html }} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

