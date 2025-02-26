type TimeInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => {
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    // Supprimer tous les caractères non numériques
    const numericInput = input.replace(/[^0-9]/g, "");

    // Ajouter les ":" automatiquement pour formater hh:mm:ss
    let formattedTime = numericInput;
    if (numericInput.length > 2) {
      formattedTime = `${numericInput.slice(0, 2)}:${numericInput.slice(2)}`;
    }
    if (numericInput.length > 4) {
      formattedTime = `${numericInput.slice(0, 2)}:${numericInput.slice(
        2,
        4
      )}:${numericInput.slice(4, 6)}`;
    }

    // Limiter à "hh:mm:ss" (8 caractères au total)
    if (formattedTime.length > 8) {
      formattedTime = formattedTime.slice(0, 8);
    }

    onChange(formattedTime);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="timeInput">Temps (hh:mm:ss)</label>
      <input
        id="timeInput"
        type="text"
        value={value}
        onChange={handleTimeChange}
        placeholder="hh:mm:ss"
        maxLength={8} // Empêche de saisir plus de 8 caractères
      />
    </div>
  );
};

export default TimeInput;
