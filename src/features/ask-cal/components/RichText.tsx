type RichTextProps = {
  content: string;
};

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);

  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="font-medium text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("_") && part.endsWith("_")) {
      return (
        <em key={key} className="text-cal-subtle not-italic">
          {part.slice(1, -1)}
        </em>
      );
    }

    return <span key={key}>{part}</span>;
  });
}

export function RichText({ content }: RichTextProps) {
  return (
    <>
      {content.split("\n").map((line, index) => (
        <span key={index} className="block">
          {renderInline(line, `line-${index}`)}
        </span>
      ))}
    </>
  );
}
