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
}

function InputForm<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    type = "text",
}: InputFormProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Form.Item
                    label={label}
                    validateStatus={error ? "error" : undefined}
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
                        />
                    )}
                </Form.Item>
            )}
        />
    );
}

export default InputForm;
