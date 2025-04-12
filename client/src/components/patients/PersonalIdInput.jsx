import React from 'react';

const PersonalIdInput = ({ value, onChange, isInvalid, error }) => {
    // Rozdělíme hodnotu na číslice a přidáme lomítko
    const formatValue = (val) => {
        // Odstraníme všechny nečíselné znaky
        const numbers = val.replace(/\D/g, '');
        if (numbers.length <= 6) {
            return numbers;
        }
        // Přidáme lomítko po šestém čísle
        return numbers.slice(0, 6) + '/' + numbers.slice(6);
    };

    const digits = value.replace(/\D/g, '').split('');

    const handleDigitChange = (index, newValue) => {
        if (newValue.length > 1) return; // Allow only one digit
        if (newValue && !/^\d$/.test(newValue)) return; // Allow only digits

        const newDigits = [...digits];
        newDigits[index] = newValue;
        // Spojíme číslice a přidáme lomítko
        onChange(formatValue(newDigits.join('')));

        // Move to next input if digit was entered
        if (newValue && index < 9) {
            const nextInput = document.getElementById(
                `personalId-${index + 1}`,
            );
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            const prevInput = document.getElementById(
                `personalId-${index - 1}`,
            );
            if (prevInput) prevInput.focus();
        }
    };

    const inputStyle = {
        width: '2.5rem',
        height: '2.5rem',
        fontSize: '1.25rem',
        padding: '0.25rem',
        borderRadius: '0.5rem',
        backgroundColor: '#fff',
        textAlign: 'center',
        border: isInvalid ? '1px solid #dc3545' : '1px solid #dee2e6',
        color: '#000',
    };

    return (
        <>
            <div className="d-flex align-items-center">
                {[...Array(6)].map((_, i) => (
                    <input
                        key={`before-${i}`}
                        id={`personalId-${i}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digits[i] || ''}
                        onChange={(e) => handleDigitChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        className="mx-1"
                        style={inputStyle}
                    />
                ))}
                <span
                    className="mx-2"
                    style={{ color: '#666', fontSize: '1.25rem' }}
                >
                    /
                </span>
                {[...Array(4)].map((_, i) => (
                    <input
                        key={`after-${i}`}
                        id={`personalId-${i + 6}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digits[i + 6] || ''}
                        onChange={(e) =>
                            handleDigitChange(i + 6, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(e, i + 6)}
                        className="mx-1"
                        style={inputStyle}
                    />
                ))}
            </div>
            {isInvalid && error && (
                <div
                    className="text-danger"
                    style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}
                >
                    {error}
                </div>
            )}
        </>
    );
};

export default PersonalIdInput;
