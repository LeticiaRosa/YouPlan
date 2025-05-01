export interface SearchItensProps {
  id: string;
  name: string;
}

export function SearchItens({ id, name }: SearchItensProps) {
  return (
    <div
      key={id}
      className="flex bg-blue-900 rounded-2xl text-white hover:bg-blue-600 transition-colors duration-200 ease-in-out"
    >
      <div className="sm:text-sm/6 px-2">{name}</div>
    </div>
  );
}
