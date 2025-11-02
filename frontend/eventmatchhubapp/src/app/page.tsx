// app/page.tsx

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black text-center px-6">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
        🚧 Under Construction 🚧
      </h1>
      <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400 mb-8">
        We’re working hard to bring you something amazing.  
        Please check back soon!
      </p>
      <a
        href="https://nextjs.org/" 
        className="rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 px-6 py-3 font-medium hover:opacity-80 transition"
      >
        Documentation
      </a>
    </div>
  );
}
