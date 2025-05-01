import img from "../assets/logo.png";

export function Header() {
  return (
    <header className="container max-h-40">
      <img src={img} className="flex flex-col items-center h-35" />
    </header>
  );
}
