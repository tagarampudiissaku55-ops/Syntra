export function formatSimpleMarkdown(text: string) {
  if (!text) return "";
  
  const formatted = text
    // Replace Markdown headers (# to ###)
    .replace(/^### (.*$)/gim, '<h4 class="text-zinc-100 font-semibold mt-3 mb-1">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 class="text-zinc-100 font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^# (.*$)/gim, '<h2 class="text-zinc-100 font-semibold mt-5 mb-2">$1</h2>')
    // Replace **bold** with <strong>bold</strong>
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-300">$1</strong>')
    // Replace * bullet points with HTML bullet points and line breaks (multiline safe)
    .replace(/^[\*\-] (.*$)/gim, '<div class="flex items-start mb-1"><span class="text-amber-500 mr-2 mt-0.5">•</span> <span class="text-zinc-300">$1</span></div>')
    // Replace remaining newlines with <br/>, avoiding wrapping our block elements
    .replace(/\n(?!(<h|<div|<\/div))/g, '<br/>');
    
  return formatted;
}
