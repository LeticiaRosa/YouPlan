export interface InputMinutesPerDayProps {
  id: number;
  abreviatedName: string;
  type: string;
  placeholder: string;
  className: string;
}

export function InputMinutesPerDay({
  id,
  abreviatedName,
  type,
  placeholder,
  className,
}: InputMinutesPerDayProps) {
  return (
    <input
      id={id.toString()}
      name={abreviatedName}
      type={type}
      placeholder={placeholder}
      className="input input-minutes-per-day"
      min="0"
      max="1440"
      step="1"
      required
    />
  );
}
