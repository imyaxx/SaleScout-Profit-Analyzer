/**
 * ErrorBoundary — перехватывает ошибки рендера дочерних компонентов.
 * Показывает ErrorState с кнопкой «Попробовать снова».
 */
import React from 'react';
import i18next from 'i18next';
import { ErrorState } from './States';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onRetry: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      message: error?.message || i18next.t('errors.analysisRender')
    };
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught error', error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorState message={this.state.message} onRetry={this.props.onRetry} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
