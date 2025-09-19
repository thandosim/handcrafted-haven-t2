export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Handcrafted Haven</h1>
      <nav className="flex gap-6 text-sm font-medium">
        <a href="#">Home</a>
        <a href="#">Shop</a>
        <a href="#">Artists</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Account</a>
        <button aria-label="Search">🔍</button>
      </nav>
    </header>
  );
}
