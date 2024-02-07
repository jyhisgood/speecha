export type onSuccessReturn = {
  title: string;
  content: string;
  fullPath: string;
  path: string;
};
export interface UploadProps {
  onSuccess: (data: onSuccessReturn[], uploadType: 'folders' | 'files') => void;
  onError?: (error: unknown) => void;
}
