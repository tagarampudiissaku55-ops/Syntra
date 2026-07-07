import re

with open('/Users/onepiece/CODE/SYNTRA/frontend/src/app/workflows/demo/page.tsx', 'r') as f:
    content = f.read()

# Make background of panels adapt to light/dark
content = content.replace('bg-zinc-900/50', 'bg-white dark:bg-zinc-900/50')
content = content.replace('bg-zinc-950', 'bg-zinc-50 dark:bg-zinc-950')
content = content.replace('bg-zinc-900/40', 'bg-white/80 dark:bg-zinc-900/40')
content = content.replace('bg-zinc-900 ', 'bg-zinc-100 dark:bg-zinc-900 ')

# Make borders adapt
content = content.replace('border-zinc-800', 'border-zinc-200 dark:border-zinc-800')

# Make text adapt
content = content.replace('text-zinc-100', 'text-zinc-900 dark:text-zinc-100')
content = content.replace('text-zinc-200', 'text-zinc-800 dark:text-zinc-200')
content = content.replace('text-zinc-300', 'text-zinc-700 dark:text-zinc-300')
content = content.replace('text-zinc-400', 'text-zinc-600 dark:text-zinc-400')
content = content.replace('text-zinc-500', 'text-zinc-500 dark:text-zinc-500')

with open('/Users/onepiece/CODE/SYNTRA/frontend/src/app/workflows/demo/page.tsx', 'w') as f:
    f.write(content)
