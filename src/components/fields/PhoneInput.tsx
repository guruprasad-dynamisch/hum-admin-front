import React, { forwardRef, useState } from 'react';
import { useController } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js/core';
import 'react-phone-number-input/style.css';
import "@styles/fields/PhoneInput.css"

const noop = () => {};
interface PhoneInputProps {
    name?: string;
    label?: string;
    placeholder?: string;
    defaultCountry?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    value?: string | E164Number;
    onChange?: (value?: E164Number) => void;
    onBlur?: () => void;
    mode?: 'standalone' | 'react-hook-form';
    control?: any;
    rules?: any;
    required?: boolean;
    international?: boolean;
    initialValueFormat?: 'national';
}

const CustomPhoneInput = forwardRef<any, PhoneInputProps>(
    (
        {
            mode = 'standalone',
            name = '',
            label,
            placeholder,
            defaultCountry = 'US',
            disabled = false,
            className = '',
            style,
            value,
            onChange,
            onBlur,
            control,
            rules,
            required = false,
            international = true,
            initialValueFormat,
            ...props
        },
        ref
    ) => {
        const [countryPlaceholder, setCountryPlaceholder] = useState('');

        // Handle react-hook-form mode
        const isReactHookForm = mode === 'react-hook-form' && control;
        let fieldProps: any = {};
        let error = null;

        if (isReactHookForm) {
            const {
                field: { onChange: fieldOnChange, onBlur: fieldOnBlur, value: fieldValue, ref: fieldRef },
                fieldState: { error: fieldError },
            } = useController({
                name,
                control,
                defaultValue: value || '',
            });

            fieldProps = {
                ref: fieldRef,
                value: fieldValue,
                onChange: fieldOnChange,
                onBlur: fieldOnBlur,
            };
            error = fieldError;
        }

        const defaultStyle: React.CSSProperties = {
            width: '100%',
            padding: '16.5px 14px',
            border: error ? '2px solid var(--error-red)' : '1px solid var(--border-default)',
            borderRadius: '8px',
            fontSize: '16px',
            fontFamily: 'inherit',
            backgroundColor: 'var(--bg-input)',
            color: 'var(--text-white)',
            ...style,
        };

        // Compute phone input props based on mode
        const phoneInputProps = {
            ...props,
            id: name,
            placeholder: placeholder || countryPlaceholder,
            defaultCountry: defaultCountry as any,
            disabled: disabled,
            style: defaultStyle,
            international: international,
            initialValueFormat: initialValueFormat,
            className: `phone-input-field ${error ? 'phone-input-error' : ''}`,
            ...(isReactHookForm ? fieldProps : {
                ref: ref,
                value: value,
                onChange: onChange || noop,
                onBlur: onBlur,
            }),
        };

        return (
            <div className={`phone-input-wrapper ${className}`}>
                {label && (
                    <label htmlFor={name} className="phone-input-label">
                        {label}{required ? <span className='required'>*</span> : ""}
                    </label>
                )}
                <PhoneInput {...phoneInputProps} data-testid={`phone-input-${name}`} />
                {error && (
                    <span className="error-text">{error.message}</span>
                )}
            </div>
        );
    }
);

CustomPhoneInput.displayName = 'CustomPhoneInput';

export default CustomPhoneInput;
