// React Hook Form and zod
import { Controller } from "react-hook-form";
import type {
    Control,
    FieldPath,
    FieldValues,
} from "react-hook-form";


// Ant Desing
import { Form, Input } from "antd";


interface InputFormProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
    type?: "text" | "email" | "password";
    error?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    formText?: string;
    success?: string;
    disabled?: boolean
}


//Main InputForm component
function InputForm<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    type = "text",
    onBlur,
    formText,
    success,
    disabled
}: InputFormProps<T>) {

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(e);
        }
    }
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Form.Item
                    label={label}
                    validateStatus={error ? "error" : success ? "success" : ""}
                    help={error?.message}

                >
                    {type === "password" ? (
                        <Input.Password
                            {...field}
                            placeholder={placeholder}
                        />
                    ) : (
                        <Input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            onBlur={handleBlur}
                            disabled={disabled}
                        />
                    )}
                    {formText && <p>{formText}</p>}
                    {success && <p>{success}</p>}
                </Form.Item>
            )}
        />
    );
}

export default InputForm;
