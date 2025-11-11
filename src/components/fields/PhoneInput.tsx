import React, { forwardRef, useState } from 'react';
import { useController, Control, FieldValues, RegisterOptions } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js/core';
import 'react-phone-number-input/style.css';
import "@styles/fields/phone-input.scss"

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
    control?: Control<any>;
    rules?: RegisterOptions;
    required?: boolean;
    international?: boolean;
    initialValueFormat?: 'national';
}

const CustomPhoneInput = (
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
    }: PhoneInputProps
) => {
        const [countryPlaceholder, setCountryPlaceholder] = useState('');

        // Handle react-hook-form mode
        const isReactHookForm = mode === 'react-hook-form' && control;
        let fieldProps: {
            ref?: React.Ref<any>
            value?: E164Number | string
            onChange: (value?: E164Number) => void
            onBlur: () => void
        } = {
            onChange: noop,
            onBlur: noop
        };
        let error = null;

        if (isReactHookForm) {
            const {
                field: { onChange: fieldOnChange, onBlur: fieldOnBlur, value: fieldValue, ref: fieldRef },
                fieldState: { error: fieldError },
            } = useController({
                name: name as any,
                control,
                defaultValue: (value || '') as any,
            });

            fieldProps = {
                ref: fieldRef,
                value: fieldValue,
                onChange: fieldOnChange,
                onBlur: fieldOnBlur,
            };
            error = fieldError;
        }

        // Compute phone input props based on mode
        const phoneInputProps = {
            ...props,
            id: name,
            placeholder: placeholder || countryPlaceholder,
            defaultCountry: defaultCountry as any,
            disabled: disabled,
            international: international,
            initialValueFormat: initialValueFormat,
            className: `phone-input-field ${error ? 'phone-input-error' : ''}`,
            ...(isReactHookForm ? fieldProps : {
                // ref: ref, // removed ref since we're not using forwardRef
                value: value,
                onChange: onChange ?? noop,
                onBlur: onBlur ?? noop,
            }),
        };

        return (
            <div className={`phone-input-wrapper ${className || ''}`}>
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
};

CustomPhoneInput.displayName = 'CustomPhoneInput';

export default CustomPhoneInput;
