function Field({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  error,
  children
}) {
  const showError = !!error;

  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>

      {children || (
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={showError}
          aria-describedby={
            showError ? `${id}-error` : undefined
          }
        />
      )}

      {showError && (
        <p id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default Field;