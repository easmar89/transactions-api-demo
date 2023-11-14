function Input({
  label,
  id,
  name,
  dataType,
  type,
  value,
  onChange,
  required,
  error,
}) {
  return (
    <div className="inputElement">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        data-type={dataType}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
      {error && <span>{error}</span>}
    </div>
  );
}

export default Input;
