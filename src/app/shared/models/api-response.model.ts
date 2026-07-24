export interface ApiResponse<T> {
    estatus: boolean;
    mensaje: string;
    error: string;
    data: T | null;
}