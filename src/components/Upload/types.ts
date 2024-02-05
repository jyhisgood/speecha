export interface UploadProps {
  onSuccess: (title: string, content: string) => void;
  onError?: (error: unknown) => void;
}
