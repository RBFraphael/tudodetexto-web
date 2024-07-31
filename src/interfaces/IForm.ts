export interface IForm<T> {
    model?: T;
    onSubmit: (data: any) => void;
    onCancel?: () => void;
    loading?: boolean;
    submitting?: boolean;
}